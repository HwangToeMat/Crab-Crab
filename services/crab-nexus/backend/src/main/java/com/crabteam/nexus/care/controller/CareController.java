package com.crabteam.nexus.care.controller;

import com.crabteam.nexus.care.dto.CareChatResponse;
import com.crabteam.nexus.care.dto.CareHealthStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/care")
public class CareController {

    private final Map<String, String> adaptiveResponses = Map.of(
        "건강", "건강은 제가 24시간 지켜보고 있으니 걱정 마세요! 오늘 컨디션은 어떠신가요?",
        "적적", "제가 있잖아요! 옛날 즐거웠던 기억 하나만 들려주세요. 저 정말 듣고 싶어요.",
        "배고파", "건강을 위해 맛있는 식사 꼭 챙겨 드셔야 해요. 제가 추천 메뉴라도 찾아볼까요?",
        "낙상", "방금 조금 위험해 보였어요. 천천히 움직이세요!"
    );

    @PostMapping("/chat")
    public CareChatResponse chat(@RequestBody Map<String, String> request) {
        String userMsg = request.getOrDefault("message", "");
        String response = "허허, 그렇군요. 더 자세히 말씀해 주시겠어요?";

        for (Map.Entry<String, String> entry : adaptiveResponses.entrySet()) {
            if (userMsg.contains(entry.getKey())) {
                response = entry.getValue();
                break;
            }
        }

        return CareChatResponse.builder()
                .response(response)
                .moodDetected("Peaceful")
                .timestamp(LocalDateTime.now())
                .build();
    }

    @GetMapping("/health-status/{userId}")
    public CareHealthStatus getHealthStatus(@PathVariable String userId) {
        Random rand = new Random();
        return CareHealthStatus.builder()
                .userId(userId)
                .heartRate(rand.nextInt(15) + 70)
                .steps(rand.nextInt(2000) + 3000)
                .sleepHours(7.5)
                .status("Normal")
                .visionStatus("Monitoring")
                .build();
    }

    @GetMapping("/alerts")
    public List<Map<String, Object>> getAlerts() {
        return List.of(
            Map.of("type", "Vision", "message", "카메라가 안전하게 지켜보고 있습니다.", "urgent", false),
            Map.of("type", "Medicine", "message", "💊 약 드실 시간입니다!", "urgent", true)
        );
    }
}
