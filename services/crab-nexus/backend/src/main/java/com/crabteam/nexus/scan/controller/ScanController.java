package com.crabteam.nexus.scan.controller;

import com.crabteam.nexus.scan.dto.ScanAnalysisRequest;
import com.crabteam.nexus.scan.dto.ScanStatusResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/scan")
public class ScanController {

    private int savingScore = 85;
    private long totalSpent = 450000;
    private int streak = 12;
    private final List<Map<String, Object>> expenses = new ArrayList<>(List.of(
        new HashMap<>(Map.of("id", 1, "itemName", "교통비", "price", 1500, "category", "Transport", "essential", true)),
        new HashMap<>(Map.of("id", 2, "itemName", "커피", "price", 4500, "category", "Dining", "essential", false))
    ));

    @GetMapping("/status")
    public ScanStatusResponse getStatus() {
        return ScanStatusResponse.builder()
                .savingScore(savingScore)
                .totalSpent(totalSpent)
                .streak(streak)
                .quests(List.of(
                    Map.of("id", 1, "title", "무지출 챌린지", "completed", false, "reward", 100),
                    Map.of("id", 2, "title", "배달 음식 안 먹기", "completed", true, "reward", 50)
                ))
                .rankings(List.of(
                    Map.of("name", "왕게절약왕", "score", 98),
                    Map.of("name", "나 (크래비)", "score", savingScore),
                    Map.of("name", "쇼핑왕대게", "score", 45)
                ))
                .build();
    }

    @PostMapping("/analyze")
    public Map<String, Object> analyzeSpending(@RequestBody ScanAnalysisRequest request) {
        String advice = String.format("%s 지출을 분석했습니다. 당신의 갓생 절약 점수는 현재 %d점입니다!", request.getItemName(), savingScore);
        String status = "Neutral";

        if (request.getPrice() > 30000 && request.getItemName().contains("음식")) {
            advice = String.format("우와, %d원짜리 %s이라니요! 꽃게가 보기엔 조금 무거운 한 끼네요. 다음엔 껍질을 조금 더 단단히 조여보는 건 어떨까요?", request.getPrice(), request.getItemName());
            status = "Caution";
        } else if (request.getPrice() < 5000 && (request.getItemName().contains("커피") || request.getItemName().contains("카페"))) {
            advice = String.format("오, %s! 커피 한 잔의 여유는 좋지만, 일주일이면 치킨 한 마리 값이에요! 🍗", request.getItemName());
            status = "Frugal";
        }

        totalSpent += request.getPrice();
        if (!request.isEssential()) savingScore -= 2;

        return Map.of("advice", advice, "status", status, "updatedScore", savingScore);
    }

    @GetMapping("/expenses")
    public List<Map<String, Object>> getExpenses() {
        return expenses;
    }
}
