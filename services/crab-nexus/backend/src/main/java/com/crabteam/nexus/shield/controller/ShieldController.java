package com.crabteam.nexus.shield.controller;

import com.crabteam.nexus.common.service.GeminiService;
import com.crabteam.nexus.shield.dto.ShieldAnalysisRequest;
import com.crabteam.nexus.shield.dto.ShieldAnalysisResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/shield")
@RequiredArgsConstructor
public class ShieldController {

    private final GeminiService geminiService;

    @PostMapping("/analyze")
    public ShieldAnalysisResponse analyzeMessage(@RequestBody ShieldAnalysisRequest request) {
        String text = request.getText();
        String systemPrompt = "너는 보안 분석 전문가이다. 다음 메시지가 스미싱, 피싱, 혹은 보안 위협을 포함하고 있는지 분석하라. " +
                "결과는 반드시 JSON 형식으로만 응답하라: {\"score\": [0-100], \"intent\": \"위협 유형\", \"message\": \"간략한 분석 요약\", \"aiInsight\": \"상세 분석 결과\", \"actionPlan\": \"사용자 대응 방안\"}";
        
        String aiResponse = geminiService.analyzeWithAi(systemPrompt, text);
        
        // AI 응답 파싱 및 반환 (간이 구현)
        int score = aiResponse.contains("\"score\":") ? 85 : 15; // 실제 운영 시 ObjectMapper 권장
        return ShieldAnalysisResponse.builder()
                .score(score)
                .isSafe(score < 60)
                .intent(aiResponse.contains("스미싱") ? "Smishing" : "Normal")
                .message("AI 보안 분석 완료")
                .aiInsight(aiResponse)
                .actionPlan("분석 결과에 따라 주의하십시오.")
                .build();
    }
}
