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
        String systemPrompt = "너는 심리 분석가이자 감정 코치이다. 사용자의 메모를 분석하여 현재의 기분(Happy, Sad, Angry, Anxious, Calm 등)과 그에 맞는 따뜻한 조언을 제공하라. " +
                "응답은 반드시 JSON 형식으로만 하라: {\"mood\": \"기분\", \"advice\": \"조언\", \"score\": 0-100}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, note);
        
        return Map.of(
            "timestamp", new Date(),
            "note", note,
            "ai_analysis", aiResponse,
            "points_earned", 10
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
