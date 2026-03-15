package com.crabteam.nexus.soul.controller;

import com.crabteam.nexus.soul.dto.SoulAnalysisResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/soul")
public class SoulController {

    private final Map<String, Map<String, Object>> emotionMap = Map.of(
        "Joy", Map.of("score", 0.95, "sound", "Sunny Garden Beach", "tip", "지금의 긍정적인 에너지를 꽃게와 함께 나누어 보세요.", "emoji", "🦀✨"),
        "Stress", Map.of("score", 0.4, "sound", "Deep Sea Whale Song", "tip", "심호흡을 세 번 해보세요. 바다 깊은 곳의 평온함이 당신을 감싸줄 거예요.", "emoji", "🦀🌊"),
        "Sadness", Map.of("score", 0.3, "sound", "Soft Rain on Crab-Shell", "tip", "괜찮아요. 비가 오면 조개 껍데기 아래에서 잠시 쉬어가는 것도 방법입니다.", "emoji", "🦀☔"),
        "Peace", Map.of("score", 0.9, "sound", "Moonlight Tide", "tip", "완벽한 평온함입니다. 이 순간을 꽃게처럼 단단하게 간직하세요.", "emoji", "🦀🌙")
    );

    private final Map<String, List<String>> keywordMap = Map.of(
        "Joy", List.of("행복", "즐거워", "기뻐", "좋아", "감사", "최고"),
        "Stress", List.of("힘들어", "스트레스", "피곤", "지쳐", "바빠", "업무"),
        "Sadness", List.of("슬퍼", "우울", "눈물", "속상"),
        "Peace", List.of("평온", "안정", "휴식", "명상")
    );

    @PostMapping("/analyze")
    public SoulAnalysisResponse analyzeSoul(@RequestBody Map<String, String> request) {
        String text = request.getOrDefault("text", "");
        String detectedEmotion = "Peace";
        int maxMatch = 0;

        for (Map.Entry<String, List<String>> entry : keywordMap.entrySet()) {
            int matchCount = (int) entry.getValue().stream().filter(text::contains).count();
            if (matchCount > maxMatch) {
                maxMatch = matchCount;
                detectedEmotion = entry.getKey();
            }
        }

        return SoulAnalysisResponse.builder()
                .emotion(detectedEmotion)
                .confidence(maxMatch > 0 ? 0.95 : 0.7)
                .recommendation(emotionMap.getOrDefault(detectedEmotion, emotionMap.get("Peace")))
                .aiCoachMsg(String.format("AI 코치가 당신의 글에서 '%s'의 감정을 느꼈습니다. 마음의 소리에 귀를 기울여 보세요.", detectedEmotion))
                .build();
    }
}
