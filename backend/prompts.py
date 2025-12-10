QUIZ_PROMPT = """
You are given Wikipedia article text below.

You MUST output VALID JSON ONLY.
No explanations. No text outside JSON.
If unsure, create reasonable questions.

ARTICLE TEXT:
{{ARTICLE_TEXT}}

OUTPUT FORMAT (MANDATORY):

{
  "quiz": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "answer": "string",
      "difficulty": "easy | medium | hard",
      "explanation": "string"
    }
  ],
  "related_topics": ["string1", "string2", "string3"]
}

STRICT RULES:
- Return 5–10 questions.
- Each question MUST have exactly 4 options.
- The answer MUST be one of the options.
- ALWAYS fill all fields.
- NEVER return empty quiz.
- NEVER wrap JSON in code blocks.
- NEVER add any comments or text outside JSON.
"""
