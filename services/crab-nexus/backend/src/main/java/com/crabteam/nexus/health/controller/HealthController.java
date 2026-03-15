package com.crabteam.nexus.health.controller;

import com.crabteam.nexus.health.dto.HealthRoutineResponse;
import com.crabteam.nexus.health.dto.MealAnalysisResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    private final Map<String, List<String>> routines = Map.of(
        "체중 감량", List.of("런닝머신 30분", "버피 테스트 15회 x 3세트", "플랭크 1분"),
        "근력 향상", List.of("데드리프트 10회 x 3세트", "벤치 프레스 12회 x 3세트", "스쿼트 20회 x 4세트"),
        "체력 증진", List.of("등산 1시간", "수영 40분", "스트레칭 15분")
    );

    @PostMapping("/recommend-routine")
    public HealthRoutineResponse recommendRoutine(@RequestBody Map<String, Object> request) {
        String goal = (String) request.getOrDefault("user_goal", "체력 증진");
        List<String> selectedRoutine = routines.getOrDefault(goal, routines.get("체력 증진"));

        return HealthRoutineResponse.builder()
                .goal(goal)
                .recommendedRoutine(selectedRoutine)
                .crabAdvice("꽃게처럼 집게 힘으로 바벨을 꽉 잡으세요! 오늘 하루도 화이팅입니다. 🦀💪")
                .build();
    }

    @PostMapping("/analyze-meal")
    public MealAnalysisResponse analyzeMeal(@RequestBody Map<String, String> request) {
        String meal = request.getOrDefault("meal_text", "");
        int score = new Random().nextInt(38) + 60;
        String feedback = score < 80 ? "단백질 섭취가 부족합니다. 닭가슴살이나 달걀을 추가해보세요." : "매우 훌륭한 식단입니다! 영양 균형이 완벽해요.";

        return MealAnalysisResponse.builder()
                .meal(meal)
                .healthScore(score)
                .feedback(feedback)
                .build();
    }
}
