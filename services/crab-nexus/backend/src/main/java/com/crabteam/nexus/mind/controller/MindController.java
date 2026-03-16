package com.crabteam.nexus.mind.controller;

import com.crabteam.nexus.common.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/mind")
@RequiredArgsConstructor
public class MindController {

    private final GeminiService geminiService;

    @PostMapping("/journal")
    public Map<String, Object> analyzeJournal(@RequestBody Map<String, String> request) {
        String content = request.getOrDefault("content", "");
        String mood = request.getOrDefault("mood", "Neutral");
        
        String systemPrompt = "너는 다정한 심리 상담사이다. 사용자의 기분(" + mood + ")과 일기 내용을 바탕으로 공감과 위로의 메시지를 작성하라. " +
                "또한 공감 점수(0~100)를 포함하여 JSON 형식으로 응답하라: {\"advice\": \"메시지\", \"empathyScore\": 85}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, content);
        
        return Map.of(
            "advice", aiResponse,
            "empathyScore", 95,
            "recordedAt", new Date()
        );
    }

    @GetMapping("/quotes")
    public Map<String, String> getDailyQuote() {
        return Map.of("quote", "가장 어두운 밤도 언젠가는 끝나고 해가 뜰 것입니다. - 빅토르 위고");
    }
}
