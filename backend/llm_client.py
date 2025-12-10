import google.generativeai as genai
import json
import os
from dotenv import load_dotenv
from prompts import QUIZ_PROMPT   

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise Exception("GEMINI_API_KEY missing in .env")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("models/gemini-flash-latest")


def generate_quiz_and_topics(article_text: str):
    prompt = QUIZ_PROMPT.replace("{{ARTICLE_TEXT}}", article_text)

    # IMPORTANT: use list, prevents truncation
    response = model.generate_content(prompt)
    text = response.text

    print("\n\n===== RAW GEMINI OUTPUT =====\n", text, "\n============================\n\n")


    # Detect JSON
    try:
        start = text.index("{")
        end = text.rindex("}") + 1
        json_str = text[start:end]

        data = json.loads(json_str)

        # Ensure quiz exists
        if "quiz" not in data or len(data["quiz"]) == 0:
            print("\n⚠️ LLM returned EMPTY QUIZ:\n", text)
            return None

        return data

    except Exception as e:
        print("\n❌ JSON PARSE ERROR:", e)
        print("RAW OUTPUT:\n", text)
        return None
