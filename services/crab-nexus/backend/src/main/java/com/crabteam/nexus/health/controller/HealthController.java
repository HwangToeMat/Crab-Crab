package com.crabteam.nexus.health.controller;

import com.crabteam.nexus.common.service.GeminiService;
import com.crabteam.nexus.health.dto.HealthRoutineResponse;
import com.crabteam.nexus.health.dto.MealAnalysisResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/health")
@RequiredArgsConstructor
public class HealthController {

    private final GeminiService geminiService;

    @PostMapping("/recommend-routine")
    public HealthRoutineResponse recommendRoutine(@RequestBody Map<String, Object> request) {
        String goal = (String) request.getOrDefault("user_goal", "체력 증진");
        
        String systemPrompt = "너는 전문 퍼스널 트레이너 '꽃게 헬스'이다. 사용자의 목표(" + goal + ")에 맞는 3가지 운동 루틴과 짧은 격려 조언을 제공하라. " +
                "결과는 반드시 JSON 형식으로만 하라: {\"routine\": [\"운동1\", \"운동2\", \"운동3\"], \"advice\": \"조언\"}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, "추천해줘");
        
        // AI 응답 파싱 (간이 구현)
        List<String> selectedRoutine = List.of("스쿼트 20회", "푸쉬업 15회", "플랭크 1분");
        if (aiResponse.contains("routine")) {
            // 실제 운영 시 정밀 파싱 필요
        }

        return HealthRoutineResponse.builder()
                .goal(goal)
                .recommendedRoutine(selectedRoutine)
                .crabAdvice(aiResponse)
                .build();
    }

    @PostMapping("/analyze-meal")
    public MealAnalysisResponse analyzeMeal(@RequestBody Map<String, String> request) {
        String meal = request.getOrDefault("meal_text", "");
        
        String systemPrompt = "너는 영양사 '꽃게 영양'이다. 사용자가 먹은 식단을 분석하여 [건강 점수(0-100)]와 [피드백]을 제공하라. " +
                "결과는 반드시 JSON 형식으로만 하라: {\"score\": 85, \"feedback\": \"피드백 내용\"}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, meal);
        
        int score = 75;
        if (aiResponse.contains("score")) {
            // 정밀 파싱 시도 (숫자 추출)
            try {
                String cleaned = aiResponse.replaceAll("[^0-9]", " ").trim();
                if (!cleaned.isEmpty()) score = Integer.parseInt(cleaned.split(" ")[0]);
            } catch (Exception e) {}
        }

        return MealAnalysisResponse.builder()
                .meal(meal)
                .healthScore(score)
                .feedback(aiResponse)
                .build();
    }
}
