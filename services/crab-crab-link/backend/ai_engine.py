"""
[Evolution 2.0] AI Engine Module - Gemini Integration
Gemini API를 실제 연동하여 사용자의 활동 이력을 기반으로 맞춤형 게시글 및 팁을 추천합니다.
"""
import os
import json
import logging
from typing import List
import google.generativeai as genai
from . import schemas
from dotenv import load_dotenv

load_dotenv()

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GeminiAIProcessor:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            self.has_key = True
            logger.info("Gemini API configured successfully.")
        else:
            self.has_key = False
            logger.warning("GEMINI_API_KEY not found. Operating in MOCK mode.")

    async def get_recommendations(self, user_id: int, context: dict) -> List[schemas.AIRecommendation]:
        if not self.has_key:
            return self._get_mock_recommendations(context)

        prompt = f"""
        You are 'Crab-Link AI Assistant', a helpful neighborhood guide for 1-person households in Korea.
        User (ID: {user_id}) is currently in {context.get('location', 'Seoul')}. 
        Weather: {context.get('weather', 'Clear')}.
        Recent Interests: {", ".join(context.get('recent_searches', []))}.

        Based on this, suggest 3 personalized recommendations.
        Each recommendation must include:
        - title: Catchy title in Korean.
        - reason: Short explanation in Korean why this is recommended.
        - item_type: One of "POST", "TIP", "EVENT".
        - image_url: A relevant Unsplash URL.
        - action_url: A path like "/posts/123" or "/tips/abc".

        Return the result ONLY as a JSON list.
        """
        
        try:
            response = self.model.generate_content(prompt)
            # JSON 응답 정제 (Markdown block 제거 등)
            content = response.text.strip()
            if content.startswith("```json"):
                content = content[7:-3].strip()
            elif content.startswith("```"):
                content = content[3:-3].strip()
            
            recommendations_data = json.loads(content)
            return [schemas.AIRecommendation(**rec) for rec in recommendations_data]
        except Exception as e:
            logger.error(f"Error calling Gemini API: {e}")
            return self._get_mock_recommendations(context)

    async def chat_with_assistant(self, message: str, user_history: List[dict]) -> str:
        if not self.has_key:
            return f"꽃게 AI 어시스턴트(MOCK)입니다: '{message}'에 대해 말씀하신 내용은 잘 이해했습니다. 이웃과의 따뜻한 연결을 도와드릴게요!"

        try:
            chat = self.model.start_chat(history=[]) # 심플하게 구현
            response = chat.send_message(f"사용자 질문: {message}\n\n당신은 한국의 1인 가구를 돕는 다정한 꽃게 AI입니다. 한국어로 답변해 주세요.")
            return response.text
        except Exception as e:
            logger.error(f"Error in Gemini chat: {e}")
            return "죄송합니다, 잠시 꽃게가 집게발을 다쳐서 응답이 어렵네요. 나중에 다시 시도해 주세요!"

    def _get_mock_recommendations(self, context: dict) -> List[schemas.AIRecommendation]:
        return [
            schemas.AIRecommendation(
                id="rec_01",
                title="비 오는 날, 따뜻한 차 한 잔 어때요?",
                reason="최근 검색하신 '차 세트'와 오늘 마포구의 비 소식을 고려해 추천드려요.",
                item_type="TIP",
                image_url="https://images.unsplash.com/photo-1544787210-2211d7c928c7?q=80&w=300",
                action_url="/tips/rainy-day-tea"
            ),
            schemas.AIRecommendation(
                id="rec_02",
                title="[추천] 캠핑용 의자 나눔",
                reason="캠핑 카테고리에 자주 머무르셨네요! 이웃 '게딱지'님이 올린 새 게시글입니다.",
                item_type="POST",
                image_url="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=300",
                action_url="/posts/102"
            )
        ]

ai_processor = GeminiAIProcessor()
