package com.crabteam.nexus.scan.controller;

import com.crabteam.nexus.common.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/scan")
@RequiredArgsConstructor
public class ScanController {

    private final GeminiService geminiService;

    @PostMapping("/analyze")
    public Map<String, Object> analyzeExpense(@RequestBody Map<String, Object> request) {
        String itemName = (String) request.getOrDefault("itemName", "");
        Integer price = (Integer) request.getOrDefault("price", 0);
        
        String systemPrompt = "너는 합리적인 소비를 돕는 자산 관리 전문가이다. 사용자의 지출 항목과 가격을 분석하여, 이것이 꼭 필요한 지출이었는지 평가하고 따끔하지만 유용한 절약 조언을 제공하라. " +
                "결과는 반드시 JSON 형식으로 하라: {\"status\": \"BAD/GOOD\", \"advice\": \"조언\"}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, itemName + " (" + price + "원)");
        
        return Map.of(
            "status", "ANALYZED",
            "advice", aiResponse
        );
    }

    @GetMapping("/status")
    public Map<String, Object> getScanStatus() {
        return Map.of(
            "savingScore", 72,
            "totalSpent", 450000,
            "streak", 5,
            "rankings", List.of(Map.of("name", "나", "score", 720))
        );
    }
}
