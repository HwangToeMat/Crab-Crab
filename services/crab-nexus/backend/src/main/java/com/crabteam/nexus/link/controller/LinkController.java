package com.crabteam.nexus.link.controller;

import com.crabteam.nexus.link.dto.LinkRecommendationResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/link")
public class LinkController {

    @GetMapping("/recommendations")
    public List<LinkRecommendationResponse> getRecommendations() {
        return List.of(
            LinkRecommendationResponse.builder().id(1).title("캠핑 의자 나눔").reason("최근 '캠핑' 검색 패턴 기반").category("Share").build(),
            LinkRecommendationResponse.builder().id(2).title("자전거 정비 가이드").reason("'자전거' 관심사 분석 결과").category("Info").build(),
            LinkRecommendationResponse.builder().id(3).title("홍차 티백 세트").reason("흐린 날씨 맞춤 큐레이션").category("Share").build()
        );
    }

    @PostMapping("/chat")
    public Map<String, String> chatWithAssistant(@RequestBody Map<String, String> request) {
        String msg = request.getOrDefault("message", "");
        String reply = "안녕하세요! 마포구 지역 메이트들의 나눔 소식을 연결해 드릴까요?";
        
        if (msg.contains("나눔")) reply = "현재 근처에 3개의 새로운 나눔 게시글이 올라왔습니다. 확인해 보시겠어요?";
        
        return Map.of("reply", reply);
    }

    @GetMapping("/posts")
    public List<Map<String, Object>> getPosts() {
        return List.of(
            Map.of("id", 1, "title", "아이패드 펜슬 나눔합니다", "author", "친절한게", "likes", 12),
            Map.of("id", 2, "title", "망원동 맛집 공유해요", "author", "미식게", "likes", 45)
        );
    }
}
