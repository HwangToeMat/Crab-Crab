from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Crab-Mind API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JournalEntry(BaseModel):
    mood: str
    content: str

class JournalResponse(BaseModel):
    advice: str
    empathy_score: int

@app.get("/")
def read_root():
    return {"message": "Welcome to Crab-Mind API"}

@app.post("/api/journal", response_model=JournalResponse)
async def submit_journal(entry: JournalEntry):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "MOCK_KEY":
        return JournalResponse(
            advice=f"[{entry.mood}] 힘든 하루였군요. 꽃게가 당신의 이야기를 듣고 있어요. 내일은 더 나아질 거예요!",
            empathy_score=100
        )
    
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = f"""
        사용자의 오늘의 기분: {entry.mood}
        일기 내용: {entry.content}
        
        당신은 따뜻하고 공감 능력이 뛰어난 심리 상담사 '꽃게 마인드'입니다. 
        사용자의 감정을 분석하여 짧고 다정한 위로의 말(2-3문장)을 한국어로 건네주세요.
        """
        response = model.generate_content(prompt)
        return JournalResponse(advice=response.text, empathy_score=95)
    except Exception as e:
        return JournalResponse(advice="꽃게가 지금 잠시 쉬고 있어요. 다시 시도해주세요!", empathy_score=50)
