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

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";

    public String analyzeWithAi(String systemPrompt, String userMessage) {
        if ("default_value".equals(apiKey)) {
            log.warn("Gemini API Key is not set. Returning dummy analysis.");
            return "[AI 분석 결과] 꽃게팀의 지능형 엔진이 대기 중입니다. API 키를 설정해주세요.";
        }

        try {
            Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                    Map.of("parts", List.of(
                        Map.of("text", systemPrompt + "\n\n사용자 메시지: " + userMessage)
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
                    Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    return (String) parts.get(0).get("text");
                }
            }
        } catch (Exception e) {
            log.error("Gemini API call failed: {}", e.getMessage());
        }

        return "[AI 분석 오류] 요청 처리 중 문제가 발생했습니다. (Dummy)";
    }
}
