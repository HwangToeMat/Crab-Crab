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

    @PostMapping("/classify")
    public ExpenseAnalysisResponse classifyExpense(@RequestBody Map<String, String> request) {
        String text = request.getOrDefault("text", "");
        
        String systemPrompt = "너는 금융 분석 전문가 '꽃게 금융'이다. 사용자의 지출 항목을 보고 [카테고리]와 [조언]을 JSON 형식으로 답변하라. " +
                "카테고리는 '식비', '교통', '취미', '주거', '의료', '생활', '기타' 중 하나여야 한다. " +
                "예: {\"category\": \"식비\", \"advice\": \"피자는 맛있지만 건강을 위해 빈도를 줄여보세요!\"}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, text);
        
        // AI 응답 파싱 (간이 구현)
        String category = "기타";
        String advice = aiResponse;
        
        if (aiResponse.contains("식비")) category = "식비";
        else if (aiResponse.contains("교통")) category = "교통";
        else if (aiResponse.contains("취미")) category = "취미";
        else if (aiResponse.contains("주거")) category = "주거";
        else if (aiResponse.contains("의료")) category = "의료";
        else if (aiResponse.contains("생활")) category = "생활";

        return ExpenseAnalysisResponse.builder()
                .category(category)
                .rawText(text)
                .aiAdvice(advice)
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
