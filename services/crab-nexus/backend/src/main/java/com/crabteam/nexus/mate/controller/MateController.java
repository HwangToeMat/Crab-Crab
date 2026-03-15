package com.crabteam.nexus.mate.controller;

import com.crabteam.nexus.mate.dto.ActivityResponse;
import com.crabteam.nexus.mate.dto.MateMoodResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/mate")
public class MateController {

    private final List<ActivityResponse> activities = List.of(
        ActivityResponse.builder().id(1).title("한강 공원 산책").description("맑은 공기를 마시며 기분을 리프레시하세요.").category("Happy").build(),
        ActivityResponse.builder().id(2).title("따뜻한 차 한잔과 독서").description("조용한 공간에서 마음의 평온을 찾으세요.").category("Neutral").build(),
        ActivityResponse.builder().id(3).title("슬픈 영화 정주행").description("감정을 솔직하게 표현하고 털어내는 시간.").category("Sad").build(),
        ActivityResponse.builder().id(4).title("액티브한 조깅").description("땀을 흘리며 스트레스를 날려버리세요.").category("Angry").build(),
        ActivityResponse.builder().id(5).title("로컬 북카페 탐방").description("새로운 영감을 얻고 느슨한 연대를 경험하세요.").category("Happy").build()
    );

    private final Map<String, List<String>> cheerMessages = Map.of(
        "Happy", List.of("당신의 기쁨이 모두에게 전달되길!", "그 행복 꼭 붙잡으세요 🦀"),
        "Sad", List.of("울어도 괜찮아요. 내일은 조금 더 나을 거예요.", "꽃게가 옆에 있어요."),
        "Angry", List.of("심호흡 한 번! 시원한 물 한 잔 어때요?", "다 지나갈 일이에요."),
        "Neutral", List.of("평화로운 오늘을 즐기세요.", "안정적인 마음이 가장 큰 자산입니다.")
    );

    @GetMapping("/stats")
    public Map<String, Integer> getStats() {
        return Map.of("active_users", new Random().nextInt(400) + 100);
    }

    @PostMapping("/mood/analyze")
    public MateMoodResponse analyzeMood(@RequestBody Map<String, String> request) {
        String text = request.getOrDefault("mood_text", "").toLowerCase();
        String category = "Neutral";
        double score = 0.0;
        String message = "평온한 하루군요.";

        if (text.contains("기뻐") || text.contains("행복")) {
            category = "Happy";
            score = 0.8;
            message = "정말 기쁜 소식이네요!";
        } else if (text.contains("슬퍼") || text.contains("우울")) {
            category = "Sad";
            score = -0.7;
            message = "토닥토닥, 마음이 많이 힘드시군요.";
        } else if (text.contains("화나") || text.contains("짜증")) {
            category = "Angry";
            score = -0.5;
            message = "스트레스를 풀 시간이 필요해 보여요.";
        }

        return MateMoodResponse.builder()
                .sentimentScore(score)
                .moodCategory(category)
                .message(message)
                .sameMoodCount(new Random().nextInt(50) + 1)
                .cheerMessages(cheerMessages.getOrDefault(category, List.of("힘내세요!")))
                .build();
    }

    @GetMapping("/activities/recommend")
    public List<ActivityResponse> recommendActivities(@RequestParam String mood) {
        return activities.stream()
                .filter(a -> a.getCategory().equalsIgnoreCase(mood))
                .collect(Collectors.toList());
    }
}
