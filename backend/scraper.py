import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(url: str):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code != 200:
            return None  # bad link or blocked
        
        soup = BeautifulSoup(response.text, "html.parser")

        # Title
        title = soup.find("h1", {"id": "firstHeading"})
        title = title.text.strip() if title else "No Title Found"

        # All text from main content
        content = soup.find("div", {"id": "bodyContent"})
        if not content:
            return None

        text = content.get_text(separator=" ", strip=True)

        # Summary (first paragraph)
        summary_tag = soup.select_one("#mw-content-text p")
        summary = summary_tag.get_text(" ", strip=True) if summary_tag else ""

        # Section names
        sections = [
            h2.get_text(" ", strip=True).replace("[edit]", "")
            for h2 in soup.select("#mw-content-text h2")
        ]

        return {
            "title": title,
            "summary": summary,
            "sections": sections,
            "key_entities": [],
            "text": text,
        }

    except Exception as e:
        print("Scraper error:", e)
        return None
