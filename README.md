```md
# 📘 Wiki Quiz Generator  
**A full-stack application focused primarily on backend engineering**, using FastAPI, PostgreSQL, and Gemini to automatically generate quizzes from Wikipedia URLs. The project includes a lightweight Next.js frontend to visualize quizzes and past history.

---

## 🧩 Overview

Wiki Quiz Generator processes any valid **Wikipedia article URL**, scrapes the content, and uses **Google Gemini AI** to generate:

- Article summary  
- Related topics  
- Multiple-choice questions  
- Difficulty levels  
- Explanations  

All processed articles and quizzes are **stored in PostgreSQL**, enabling users to revisit **Past Quizzes** (History tab).  
While the project includes a UI, **the core emphasis is on backend architecture, data modelling, LLM integration, and persistent storage**, as expected from a backend engineering assignment.

---

## ⚙️ Features

### **Backend**
- FastAPI server with clean routes:
  - `POST /generate_quiz`
  - `GET /quiz/{id}`
  - `GET /history`
- Robust scraper using BeautifulSoup
- Gemini LLM integration for quiz generation
- PostgreSQL database for caching & persistent history
- Data models using SQLAlchemy ORM
- Prevents duplicate processing of the same URL (cache-first logic)
- Clean separation of concerns:
  - `main.py`
  - `scraper.py`
  - `models.py`
  - `llm_client.py`
  - `database.py`
  - `prompts.py`

---

### **Frontend**
- Next.js app with:
  - **Generate Quiz** tab  
  - **Past Quizzes** tab  
  - Quiz flashcards with simple UI  
- Uses clean, minimal HTML/CSS (no Tailwind)

---

## 🛠️ Tech Stack

### **Backend**
- Python 3.10+
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- Pydantic
- Google Gemini API
- BeautifulSoup4
- Requests

### **Frontend**
- Next.js
- React
- CSS

---

## 📁 Project Structure

```

wiki-quiz-app/
│
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
│
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

## 🛠️ Backend Setup

### **1. Install Python packages**
Inside `/backend`:

```

pip install -r requirements.txt

```

### **2. Setup PostgreSQL**

Create the database:

```

CREATE DATABASE wiki_quiz_db;

```

### **3. Create `.env` file**
Inside `/backend`:

```

GEMINI_API_KEY=YOUR_KEY
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/wiki_quiz_db

```

### **4. Start Backend**

```

uvicorn main:app --reload

```

Backend runs at:

```

[http://127.0.0.1:8000](http://127.0.0.1:8000)

```

---

## 🖥️ Frontend Setup

### **1. Go to frontend folder**

```

cd frontend/wiki_quiz_app

```

### **2. Install Node packages**

```

npm install

```

### **3. Run Frontend**

```

npm run dev

```

Frontend runs at:

```

[http://localhost:3000](http://localhost:3000)

```

---

## ▶️ How to Use

### **1. Go to frontend in browser**
```

[http://localhost:3000](http://localhost:3000)

```

### **2. Tab 1 – Generate Quiz**
- Paste a Wikipedia URL  
- Click **Generate Quiz**  
- Auto-redirects to quiz page  

### **3. Tab 2 – Past Quizzes**
- View all previously processed URLs  
- Click **View Quiz** to reopen  

---

## 🧪 Testing

To validate SQLAlchemy models:

```

pytest test_models.py

```

---

## 📦 Requirements (Python)

```

fastapi
uvicorn
sqlalchemy
psycopg2
beautifulsoup4
requests
python-dotenv
google-generativeai

```

(Already included in `requirements.txt`.)

---

## 🚀 Deployment Notes

- Backend & frontend can be deployed separately.  
- Ensure environment variables for Gemini + PostgreSQL are set.  
- CORS enabled for development.

---

## 📚 Notes

This project’s emphasis was on:
- Clean backend architecture  
- Stable database integration  
- LLM output handling  
- JSON parsing  
- Persistent cache system  

The frontend is intentionally minimal as per assignment guidelines:  
**“Clear, minimal, and visually organized UI; both tabs functional.”**

---

 
```
