package com.crabteam.nexus.finance.controller;

import com.crabteam.nexus.finance.dto.ExpenseAnalysisResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/finance")
public class FinanceController {

    private final Map<String, String> categoryMap = Map.of(
        "점심", "식비", "커피", "식비", "마트", "식비",
        "버스", "교통", "택시", "교통", "주유", "교통",
        "넷플릭스", "취미", "구독", "취미", "영화", "취미",
        "월세", "주거", "전기", "주거"
    );

    @PostMapping("/classify")
    public ExpenseAnalysisResponse classifyExpense(@RequestBody Map<String, String> request) {
        String text = request.getOrDefault("text", "");
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
