# Wiki Quiz Generator

A full-stack application focused primarily on backend engineering.  
It processes Wikipedia article URLs, scrapes their content, generates quizzes using the Gemini API, and stores everything in PostgreSQL.  
The frontend (Next.js) provides a minimal, clean interface for generating and viewing quizzes.

---

## Overview

Wiki Quiz Generator allows users to:

- Input any valid Wikipedia article URL
- Automatically scrape the article
- Generate a quiz using Google Gemini
- Store quizzes in PostgreSQL for future access
- View past quizzes from history

The primary focus is backend design, API development, and persistent storage.  
The UI is intentionally minimal as required:  
"Clear, minimal, and visually organized layout; both tabs functional."

---

## Features

### Backend

- FastAPI server
- Endpoints:
  - POST /generate_quiz
  - GET /quiz/{id}
  - GET /history
- BeautifulSoup-based scraper
- Gemini AI integration
- PostgreSQL storage
- Caching mechanism: article is not processed twice
- SQLAlchemy ORM models
- Clean separation of logic into files:
  - main.py
  - scraper.py
  - llm_client.py
  - prompts.py
  - models.py
  - database.py

### Frontend

- Next.js app
- Tabs:
  - Generate Quiz
  - Past Quizzes
- Quiz viewer page
- Minimal CSS layout

---

## Project Structure

```
wiki-quiz-app/
|
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── scraper.py
│   ├── llm_client.py
│   ├── prompts.py
│   ├── test_models.py
│   ├── .env.example
│   └── requirements.txt
|
└── frontend/
    └── wiki_quiz_app/
        ├── pages/
        │   ├── index.js
        │   ├── history.js
        │   ├── quiz/[id].js
        │   ├── _app.js
        │   └── _document.js
        ├── components/NavBar.js
        ├── styles/globals.css
        └── package.json
```

---

## Backend Setup

### 1. Install dependencies

Navigate to the backend folder:

```
cd backend
pip install -r requirements.txt
```

### 2. Create the PostgreSQL database

```
CREATE DATABASE wiki_quiz_db;
```

### 3. Create .env file

Inside backend folder:

```
GEMINI_API_KEY=YOUR_API_KEY
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/wiki_quiz_db
```

### 4. Run the backend server

```
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

### 1. Navigate to frontend directory

```
cd frontend/wiki_quiz_app
```

### 2. Install Node modules

```
npm install
```

### 3. Start the development server

```
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## Usage Guide

### 1. Generate Quiz (Tab 1)
- Open the app
- Paste a Wikipedia URL
- Click "Generate Quiz"
- You will be redirected to the quiz page

### 2. Past Quizzes (Tab 2)
- Shows all previously generated quizzes stored in PostgreSQL
- Click "View Quiz" to open any past quiz

---

## Python Requirements

(Automatically installed from `requirements.txt`)

```
fastapi
uvicorn
sqlalchemy
psycopg2
requests
beautifulsoup4
python-dotenv
google-generativeai
```

---

## Notes

The project focuses mainly on:

- Backend architecture
- Data modeling
- API development
- LLM output handling
- Persistent database storage

The frontend is intentionally simple as per assignment instructions.

---

## License

This project is for assignment and evaluation purposes only.

