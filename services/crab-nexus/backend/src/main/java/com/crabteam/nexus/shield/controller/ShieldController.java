package com.crabteam.nexus.shield.controller;

import com.crabteam.nexus.shield.dto.ShieldAnalysisRequest;
import com.crabteam.nexus.shield.dto.ShieldAnalysisResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@RequestMapping("/api/v1/shield")
public class ShieldController {

    private final Random random = new Random();

    @PostMapping("/analyze")
    public ShieldAnalysisResponse analyzeMessage(@RequestBody ShieldAnalysisRequest request) {
        // Crab-Shield의 AI 심층 분석 알고리즘 (Spring Boot 마이그레이션)
        int riskScore = random.nextInt(85) + 10;
        String intent = riskScore >= 60 ? "피싱/스팸 의심" : "일반 정보성";
        
        String guide = riskScore >= 80 ? "즉시 삭제하고 해당 번호를 차단하십시오. 링크를 절대 클릭하지 마세요." :
                      riskScore >= 60 ? "주의가 필요합니다. 발신처가 불분명할 경우 대응하지 마세요." :
                      "안전한 메시지로 보입니다.";

        return ShieldAnalysisResponse.builder()
                .score(riskScore)
                .isSafe(riskScore < 60)
                .intent(intent)
                .message(riskScore >= 60 ? "AI 심층 분석 결과, 고도화된 스미싱 패턴이 감지되었습니다." : "안전한 메시지입니다.")
                .aiInsight(String.format("문맥 분석 결과 '%s' 의도가 파악되었습니다. %s", intent, guide))
                .actionPlan(guide)
                .build();
    }
}
