from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from sqlalchemy.orm import Session
from database import get_db
from scraper import scrape_wikipedia
from llm_client import generate_quiz_and_topics
from models import Article,Question
import json
from datetime import datetime
import models
print("LOADED MODELS FROM:", models.__file__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuizRequest(BaseModel):
    url: HttpUrl


@app.post("/generate_quiz")
def generate_quiz(req: QuizRequest, db: Session = Depends(get_db)):
    url = str(req.url)

    # ---------- 1️⃣ CHECK CACHE ----------
    existing = db.query(Article).filter(Article.url == url).first()
    if existing:
        return get_article_response(existing, db)

    # ---------- 2️⃣ SCRAPE ----------
    data = scrape_wikipedia(url)
    if not data:
        return {"error": "Failed to fetch URL"}

    article_text = data["text"][:15000]  # prevent LLM overload

    # ---------- 3️⃣ LLM QUIZ GENERATION ----------
    llm_output = generate_quiz_and_topics(article_text)
    if not llm_output:
        return {"error": "LLM failed"}

    # ---------- 4️⃣ SAVE ARTICLE ----------
    article = Article(
        url=url,
        title=data.get("title", "Untitled"),
        summary=data.get("summary", ""),
        key_entities_json=json.dumps(data.get("key_entities", [])),
        sections_json=json.dumps(data.get("sections", [])),
        related_topics_json=json.dumps(llm_output.get("related_topics", [])),
        created_at=datetime.now().isoformat()
    )

    db.add(article)
    db.commit()
    db.refresh(article)

    # ---------- 5️⃣ SAVE QUESTIONS ----------
    for q in llm_output["quiz"]:
        options = q["options"]

        question_row = Question(
            article_id=article.id,
            question=q["question"],
            option_a=options[0],
            option_b=options[1],
            option_c=options[2],
            option_d=options[3],
            answer=q["answer"],
            difficulty=q["difficulty"],
            explanation=q["explanation"]
        )

        db.add(question_row)

    db.commit()

    return get_article_response(article, db)


@app.get("/history")
def history(db: Session = Depends(get_db)):
    articles = db.query(Article).all()
    return [
        {
            "id": a.id,
            "url": a.url,
            "title": a.title,
            "created_at": a.created_at
        }
        for a in articles
    ]


@app.get("/quiz/{article_id}")
def quiz_details(article_id: int, db: Session = Depends(get_db)):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        return {"error": "Not found"}

    return get_article_response(article, db)


def get_article_response(article, db):
    questions = db.query(Question).filter(Question.article_id == article.id).all()

    return {
        "id": article.id,
        "url": article.url,
        "title": article.title,
        "summary": article.summary,
        "key_entities": json.loads(article.key_entities_json),
        "sections": json.loads(article.sections_json),
        "related_topics": json.loads(article.related_topics_json),
        "quiz": [
            {
                "question": q.question,
                "options": [q.option_a, q.option_b, q.option_c, q.option_d],
                "answer": q.answer,
                "difficulty": q.difficulty,
                "explanation": q.explanation
            }
            for q in questions
        ]
    }
