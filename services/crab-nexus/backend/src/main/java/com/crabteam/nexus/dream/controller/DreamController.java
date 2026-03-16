package com.crabteam.nexus.dream.controller;

import com.crabteam.nexus.common.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/dream")
@RequiredArgsConstructor
public class DreamController {

    private final GeminiService geminiService;

    @PostMapping("/log")
    public Map<String, Object> logSleep(@RequestBody Map<String, Object> request) {
        String note = (String) request.getOrDefault("note", "");
        String systemPrompt = "너는 전문 수면 코치이자 꿈 해석가이다. 사용자의 수면 데이터와 메모를 분석하여 수면의 질을 평가하고, 숙면을 위한 맞춤형 팁을 제공하라. " +
                "결과는 반드시 JSON 형식으로 하라: {\"aiAnalysis\": \"분석 내용\", \"soundTip\": \"추천 사운드\"}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, note);
        
        return Map.of(
            "aiAnalysis", aiResponse,
            "soundTip", "잔잔한 파도 소리",
            "qualityScore", 85
        );
    }

    @GetMapping("/history")
    public Map<String, Object> getHistory() {
        return Map.of("history", List.of(
            Map.of("duration", 7.5, "quality", 8, "analysis", "매우 규칙적인 수면입니다.")
        ));
    }
}
