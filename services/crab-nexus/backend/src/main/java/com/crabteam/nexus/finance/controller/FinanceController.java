package com.crabteam.nexus.finance.controller;

import com.crabteam.nexus.common.service.GeminiService;
import com.crabteam.nexus.finance.dto.ExpenseAnalysisResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/finance")
@RequiredArgsConstructor
public class FinanceController {

    private final GeminiService geminiService;

    private final Map<String, String> categoryMap = Map.ofEntries(
        Map.entry("점심", "식비"), Map.entry("커피", "식비"), Map.entry("마트", "식비"),
        Map.entry("버스", "교통"), Map.entry("택시", "교통"), Map.entry("주유", "교통"),
        Map.entry("넷플릭스", "취미"), Map.entry("구독", "취미"), Map.entry("영화", "취미"),
        Map.entry("월세", "주거"), Map.entry("전기", "주거")
    );

    @PostMapping("/classify")
    public ExpenseAnalysisResponse classifyExpense(@RequestBody Map<String, String> request) {
        String text = request.getOrDefault("text", "");
        
        String aiAdvice = geminiService.analyzeWithAi(
            "너는 사용자의 지출 내역을 분석하는 금융 가이드 '꽃게 금융'이야. 지출 내역을 보고 절약 방법이나 칭찬을 한 문장으로 해줘.",
            text
        );

        String foundCategory = "기타";
        for (Map.Entry<String, String> entry : categoryMap.entrySet()) {
            if (text.contains(entry.getKey())) {
                foundCategory = entry.getValue();
                break;
            }
        }

        return ExpenseAnalysisResponse.builder()
                .category(foundCategory)
                .rawText(text)
                .aiAdvice(aiAdvice)
                .build();
    }

    @GetMapping("/stats")
    public List<Map<String, Object>> getStats() {
        return List.of(
            Map.of("category", "식비", "amount", 450000),
            Map.of("category", "교통", "amount", 120000),
            Map.of("category", "취미", "amount", 85000),
            Map.of("category", "주거", "amount", 600000),
            Map.of("category", "기타", "amount", 50000)
        );
    }
}
