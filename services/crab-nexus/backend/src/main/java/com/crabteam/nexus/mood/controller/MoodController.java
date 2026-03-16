package com.crabteam.nexus.mood.controller;

import com.crabteam.nexus.common.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/mood")
@RequiredArgsConstructor
public class MoodController {

    private final GeminiService geminiService;

    @PostMapping("/analyze")
    public Map<String, Object> analyzeMood(@RequestBody Map<String, String> request) {
        String note = request.getOrDefault("note", "");
        String systemPrompt = "너는 세계 최고의 심리 분석가 '무드게'이다. 사용자의 메모를 분석하여 다음 항목을 포함한 상세 리포트를 JSON으로만 작성하라. " +
                "1. mood: 감정명, 2. score: 감정 점수(0-100), 3. analysis: 감정의 원인 분석, 4. advice: 따뜻한 조언, 5. challenge: 추천 1일 미션. " +
                "예: {\"mood\": \"Calm\", \"score\": 85, \"analysis\": \"현재 매우 평온한 상태입니다.\", \"advice\": \"이 평온함을 유지하세요.\", \"challenge\": \"오늘 저녁에 10분간 명상하기\"}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, note);
        
        return Map.of(
            "timestamp", new Date(),
            "note", note,
            "report", aiResponse, // AI가 생성한 상세 JSON 리포트
            "points_earned", 15
        );
    }

    @GetMapping("/status")
    public Map<String, Object> getMoodStatus() {
        return Map.of("currentMood", "Analyzing...", "weeklyAverage", 82);
    }

    @GetMapping("/challenges")
    public List<Map<String, String>> getChallenges() {
        return List.of(Map.of("id", "1", "title", "3일 연속 일기 쓰기", "reward", "50pt"));
    }

    @PostMapping("/cheer")
    public Map<String, String> sendCheer() {
        return Map.of("message", "꽃게팀이 당신을 응원합니다! 🦀");
    }
}
