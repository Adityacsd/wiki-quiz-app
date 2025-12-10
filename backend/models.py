from sqlalchemy import Column, Integer, String, Text, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    title = Column(String)
    summary = Column(Text)
    key_entities_json = Column(JSON)
    sections_json = Column(JSON)
    related_topics_json = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    questions = relationship("Question", back_populates="article", cascade="all, delete")


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("articles.id"))
    question = Column(Text)

    option_a = Column(String)
    option_b = Column(String)
    option_c = Column(String)
    option_d = Column(String)

    answer = Column(String)
    difficulty = Column(String)
    explanation = Column(Text)

    article = relationship("Article", back_populates="questions")
