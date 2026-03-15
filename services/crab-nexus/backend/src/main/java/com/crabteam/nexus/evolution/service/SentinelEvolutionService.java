package com.crabteam.nexus.evolution.service;

import com.crabteam.nexus.common.service.GeminiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SentinelEvolutionService {

    private final GeminiService geminiService;

    public String analyzeThreatsWithAi() {
        // 실제 운영 시에는 ELK나 모니터링 시스템의 로그를 취합하나, 
        // 여기서는 AI의 분석 능력을 보여주기 위해 정교한 시뮬레이션 로그를 생성합니다.
        String simulatedLogs = """
            [2026-03-15 14:00:05] INFO - /api/v1/nexus/services call from IP 192.168.1.10
            [2026-03-15 14:01:22] WARN - Multiple failed login attempts for user 'admin' from IP 45.33.22.11
            [2026-03-15 14:02:45] INFO - SQL Injection patterns detected in /api/v1/scan/search query: "'; DROP TABLE users;--"
            [2026-03-15 14:03:10] ALERT - Abnormal traffic surge (1000% higher than average) detected from IP 45.33.22.11
            [2026-03-15 14:04:01] INFO - Successful bypass attempt on Rate Limiter from Proxy IP 10.0.0.5
            """;

        String systemPrompt = "너는 CrabTeam의 'Sentinel Evolution Engine'이다. " +
                "제공된 시스템 로그를 분석하여, 현재 발생한 보안 위협을 카테고리별로 분류하고 " +
                "각 위협의 위험도(Low/Medium/High/Critical)와 즉각적인 대응 권고안을 Markdown 형식으로 작성하라. " +
                "꽃게팀의 'Crab-Shield'와 연계하여 어떤 방어 프로토콜을 가동해야 하는지도 언급하라.";

        return geminiService.analyzeWithAi(systemPrompt, simulatedLogs);
    }
}
