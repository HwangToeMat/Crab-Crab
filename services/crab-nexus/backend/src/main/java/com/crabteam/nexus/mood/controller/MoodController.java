package com.crabteam.nexus.mood.controller;

import com.crabteam.nexus.mood.dto.MoodAnalysisRequest;
import com.crabteam.nexus.mood.dto.MoodStatusResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/mood")
public class MoodController {

    private int points = 1000;
    private int burnoutScore = 45;
    private int streak = 5;
    private int cheers = 120;

    @GetMapping("/status")
    public MoodStatusResponse getStatus() {
        return MoodStatusResponse.builder()
                .points(points)
                .burnoutScore(burnoutScore)
                .streak(streak)
                .cheers(cheers)
                .ambassadors(List.of(
                    Map.of("id", "zen-crab", "name", "명상하는 게", "motto", "파도처럼 마음을 다스려요.", "track", "Mindfulness"),
                    Map.of("id", "fit-crab", "name", "운동하는 게", "motto", "움직임이 기쁨을 만듭니다.", "track", "Vitality")
                ))
                .build();
    }

    @PostMapping("/analyze")
    public Map<String, String> analyzeEmotion(@RequestBody MoodAnalysisRequest request) {
        String note = request.getNote();
        List<String> keywords = List.of("힘들다", "지친다", "번아웃", "슬프다", "피곤");
        
        Optional<String> detected = keywords.stream().filter(note::contains).findFirst();
        
        if (detected.isPresent()) {
            points += 50;
            return Map.of(
                "advice", String.format("당신의 기록에서 '%s' 같은 감정이 느껴집니다. 무한진화 중인 무드게 AI는 지금 당신에게 '깊은 호흡 3회'와 '좋아하는 음악 듣기'를 강력 추천합니다. 당신의 번아웃 회복을 위해 50포인트를 선물로 드릴게요!", detected.get()),
                "type", "Supportive"
            );
        }
        
        return Map.of(
            "advice", "오늘 하루도 잘 보내셨네요! 당신의 갓생 진화를 응원합니다.",
            "type", "Positive"
        );
    }

    @GetMapping("/challenges")
    public List<Map<String, Object>> getChallenges() {
        return List.of(
            Map.of("id", 1, "title", "따뜻한 차 한 잔 마시기", "completed", false, "reward", 50),
            Map.of("id", 2, "title", "5분간 눈 감고 호흡하기", "completed", false, "reward", 80),
            Map.of("id", 3, "title", "오늘 나에게 고생했다 말하기", "completed", false, "reward", 100)
        );
    }

    @PostMapping("/cheer")
    public Map<String, Integer> sendCheer() {
        cheers += 1;
        points += 10;
        return Map.of("total_cheers", cheers, "new_points", points);
    }
}
