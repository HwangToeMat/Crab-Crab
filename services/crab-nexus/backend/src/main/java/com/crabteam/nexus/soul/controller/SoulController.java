package com.crabteam.nexus.soul.controller;

import com.crabteam.nexus.common.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/soul")
@RequiredArgsConstructor
public class SoulController {

    private final GeminiService geminiService;

    @PostMapping("/analyze")
    public Map<String, Object> analyzeSoul(@RequestBody Map<String, String> request) {
        String text = request.getOrDefault("text", "");
        String systemPrompt = "너는 자아 성찰과 철학적 조언을 제공하는 AI 가이드이다. 사용자의 내면 성찰 문장을 분석하여 지배적인 감정과 그에 맞는 치유 사운드, 조언을 제공하라. " +
                "결과는 반드시 JSON 형식으로 하라: {\"emotion\": \"감정명\", \"confidence\": 0.95, \"aiCoachMsg\": \"조언\", \"recommendation\": {\"emoji\": \"✨\", \"sound\": \"사운드명\", \"tip\": \"팁\"}}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, text);
        
        return Map.of(
            "emotion", "성찰 중",
            "confidence", 0.98,
            "aiCoachMsg", aiResponse,
            "recommendation", Map.of(
                "emoji", "✨",
                "sound", "Deep Forest Rain",
                "tip", "눈을 감고 3분간 명상해 보세요."
            )
        );
    }
}
