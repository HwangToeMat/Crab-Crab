package com.crabteam.nexus.godcrab.controller;

import com.crabteam.nexus.common.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/godcrab")
@RequiredArgsConstructor
public class GodCrabController {

    private final GeminiService geminiService;

    @GetMapping("/status")
    public Map<String, Object> getStatus() {
        String aiMessage = geminiService.analyzeWithAi(
            "너는 '꽃게팀'의 마스코트이자 갓생 가이드인 '크래비'야. 사용자의 현재 레벨과 점수를 바탕으로 격려와 조언을 한 문장으로 해줘.",
            "Level: 5, Exp: 85, Streak: 12"
        );

        return Map.of(
            "name", "크래비",
            "level", 5,
            "exp", 85,
            "streak", 12,
            "ai_insight", aiMessage
        );
    }
}
