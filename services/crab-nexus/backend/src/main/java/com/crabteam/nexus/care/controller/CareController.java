package com.crabteam.nexus.care.controller;

import com.crabteam.nexus.care.dto.CareChatResponse;
import com.crabteam.nexus.care.dto.CareHealthStatus;
import com.crabteam.nexus.common.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/v1/care")
@RequiredArgsConstructor
public class CareController {

    private final GeminiService geminiService;

    @PostMapping("/chat")
    public CareChatResponse chat(@RequestBody Map<String, String> request) {
        String userMsg = request.getOrDefault("message", "");
        
        String aiResponse = geminiService.analyzeWithAi(
            "너는 독거노인이나 돌봄이 필요한 분들을 위한 다정하고 따뜻한 돌봄 가이드 '꽃게 케어'야. 사용자의 말에 공감해주고 필요한 위로를 해줘. 너는 건강, 적적함, 배고픔, 낙상 등의 상황에 특히 잘 대응해야 해.",
            userMsg
        );

        return CareChatResponse.builder()
                .response(aiResponse)
                .moodDetected("AI_Analyzed")
                .timestamp(LocalDateTime.now())
                .build();
    }

    @GetMapping("/health-status/{userId}")
    public CareHealthStatus getHealthStatus(@PathVariable String userId) {
        Random rand = new Random();
        int heartRate = rand.nextInt(15) + 70;
        int steps = rand.nextInt(2000) + 3000;
        double sleepHours = 7.5;

        String healthInsight = geminiService.analyzeWithAi(
            "너는 어르신의 건강 데이터를 분석하여 보호자에게 리포트를 제공하는 '꽃게 케어'야. 심박수, 걸음 수, 수면 시간을 분석하여 현재 상태를 한 문장으로 알려줘.",
            String.format("심박수: %d, 걸음수: %d, 수면시간: %.1f", heartRate, steps, sleepHours)
        );

        return CareHealthStatus.builder()
                .userId(userId)
                .heartRate(heartRate)
                .steps(steps)
                .sleepHours(sleepHours)
                .status("Normal")
                .visionStatus(healthInsight)
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
