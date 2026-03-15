package com.crabteam.nexus.common.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiService {

    private final RestClient restClient;

    @Value("${google.gemini.api-key:default_value}")
    private String apiKey;

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite-001:generateContent?key=";

    public String analyzeWithAi(String systemPrompt, String userMessage) {
        log.info("Requesting Gemini 2.0 Flash-Lite AI analysis with API key presence: {}", (apiKey != null && !apiKey.equals("default_value")));

        try {
            Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                    Map.of("parts", List.of(
                        Map.of("text", systemPrompt + "\n\nUser Input: " + userMessage)
                    ))
                )
            );

            Map<String, Object> response = restClient.post()
                    .uri(GEMINI_API_URL + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            if (response != null && response.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<String, Object> candidate = candidates.get(0);
                    Map<String, Object> content = (Map<String, Object>) candidate.get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    return (String) parts.get(0).get("text");
                }
            }
            return "현재 AI 엔진이 분석 내용을 정리하고 있습니다. 잠시 후 다시 확인해 주세요! 🦀";
        } catch (Exception e) {
            log.error("Gemini API call failed: {}", e.getMessage());
            return "현재 AI 엔진이 다음 진화를 위해 에너지를 충전 중입니다. 잠시 후 다시 시도해 주세요! ⚡";
        }
    }
}
