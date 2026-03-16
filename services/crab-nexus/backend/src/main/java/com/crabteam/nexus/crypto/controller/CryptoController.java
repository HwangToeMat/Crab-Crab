package com.crabteam.nexus.crypto.controller;

import com.crabteam.nexus.common.service.GeminiService;
import com.crabteam.nexus.crypto.dto.CryptoSentimentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/crypto")
@RequiredArgsConstructor
public class CryptoController {

    private final GeminiService geminiService;

    @PostMapping("/analyze")
    public CryptoSentimentResponse analyzeSentiment(@RequestBody Map<String, String> request) {
        String text = request.getOrDefault("text", "");
        
        String systemPrompt = "너는 암호화폐 시장 감성 분석 전문가이다. 입력된 텍스트를 분석하여 감성 점수(-1.0에서 1.0 사이)와 상태(positive, negative, neutral 중 하나)를 JSON 형식으로만 답변하라. 예: {\"score\": 0.8, \"status\": \"positive\"}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, text);
        
        // AI 응답 파싱 (간이 구현)
        double score = 0.0;
        String status = "neutral";
        
        try {
            if (aiResponse.contains("positive")) status = "positive";
            else if (aiResponse.contains("negative")) status = "negative";
            
            // 숫자 추출 시도
            String cleaned = aiResponse.replaceAll("[^0-9.-]", " ").trim();
            if (!cleaned.isEmpty()) {
                score = Double.parseDouble(cleaned.split(" ")[0]);
            }
        } catch (Exception e) {
            // 파싱 실패 시 기본값 사용
        }

        return CryptoSentimentResponse.builder()
                .text(text)
                .score(score)
                .subjectivity(0.5) // 고정값 또는 AI 판단값
                .status(status)
                .build();
    }

    @GetMapping("/market-pulse")
    public Map<String, Object> getMarketPulse() {
        return Map.of(
            "fear_greed_index", 65,
            "overall_sentiment", "Greed",
            "trending_coins", List.of("BTC", "ETH", "CRAB")
        );
    }
}
