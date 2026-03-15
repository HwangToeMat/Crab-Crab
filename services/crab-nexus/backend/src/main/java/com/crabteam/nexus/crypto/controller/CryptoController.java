package com.crabteam.nexus.crypto.controller;

import com.crabteam.nexus.crypto.dto.CryptoSentimentResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/crypto")
public class CryptoController {

    @PostMapping("/analyze")
    public CryptoSentimentResponse analyzeSentiment(@RequestBody Map<String, String> request) {
        String text = request.getOrDefault("text", "").toLowerCase();
        
        // 감성 분석 엔진 시뮬레이션 (Spring Boot 버전)
        double polarity = 0.0;
        double subjectivity = new Random().nextDouble();
        
        List<String> positiveWords = List.of("bull", "moon", "buy", "good", "up", "pump", "rich");
        List<String> negativeWords = List.of("bear", "dump", "sell", "bad", "down", "crash", "scam");
        
        for (String word : positiveWords) if (text.contains(word)) polarity += 0.2;
        for (String word : negativeWords) if (text.contains(word)) polarity -= 0.2;
        
        polarity = Math.max(-1.0, Math.min(1.0, polarity));
        
        String status = "neutral";
        if (polarity > 0.1) status = "positive";
        else if (polarity < -0.1) status = "negative";

        return CryptoSentimentResponse.builder()
                .text(text)
                .score(Math.round(polarity * 100.0) / 100.0)
                .subjectivity(Math.round(subjectivity * 100.0) / 100.0)
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
