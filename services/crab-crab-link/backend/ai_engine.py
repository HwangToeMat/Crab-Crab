"""
[Evolution 2.0] AI Engine Module
Gemini API를 연동하여 사용자의 활동 이력을 기반으로 맞춤형 게시글 및 팁을 추천합니다.
실제 API 연동은 Mock 처리되어 있으나, 확장 가능한 구조로 설계되었습니다.
"""
import random
from typing import List
from . import schemas

class GeminiAIProcessor:
    def __init__(self, api_key: str = "MOCK_KEY"):
        self.api_key = api_key

    async def get_recommendations(self, user_id: int, context: dict) -> List[schemas.AIRecommendation]:
        # 실제 구현에서는 여기서 Gemini API (google-generativeai)를 호출합니다.
        # 프롬프트 예시: "사용자 {user_id}의 최근 검색어는 {context['recent_searches']}입니다. 
        # 현재 {context['location']} 지역의 {context['weather']} 날씨에 어울리는 나눔 아이템을 추천하세요."
        
        mock_recommendations = [
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
            ),
            schemas.AIRecommendation(
                id="rec_03",
                title="꽃게 앰배서더 웰컴 이벤트",
                reason="활동 지수가 높으시네요! 마포구 앰배서더에 도전해 보시는 건 어떨까요?",
                item_type="EVENT",
                image_url="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=300",
                action_url="/events/ambassador-recruitment"
            )
        ]
        
        # 실제 로직에서는 Gemini의 응답을 파싱하여 반환합니다.
        return random.sample(mock_recommendations, k=min(len(mock_recommendations), 3))

    async def chat_with_assistant(self, message: str, user_history: List[dict]) -> str:
        # Gemini 기반 1:1 대화형 나눔 도우미 Mock 응답
        return f"꽃게 AI 어시스턴트입니다: '{message}'에 대해 말씀하신 내용은 잘 이해했습니다. 이웃과의 따뜻한 연결을 도와드릴게요!"

ai_processor = GeminiAIProcessor()
