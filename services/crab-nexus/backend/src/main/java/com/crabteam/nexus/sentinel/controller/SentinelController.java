package com.crabteam.nexus.sentinel.controller;

import com.crabteam.nexus.sentinel.dto.AuditResultResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/sentinel")
public class SentinelController {

    @GetMapping("/audit/all")
    public Map<String, List<AuditResultResponse>> auditAllServices() {
        // 실제 운영 시에는 파일 시스템을 스캔하나, 넥서스 통합 버전에서는 
        // 등록된 도메인들의 상태를 기반으로 시뮬레이션합니다.
        
        List<String> services = List.of(
            "crab-infinity", "work-crab", "god-crab", "crab-shield", 
            "mood-ge", "crab-mate", "crab-finance", "crab-health"
        );
        
        List<AuditResultResponse> results = new ArrayList<>();
        Random rand = new Random();

        for (String name : services) {
            int score = rand.nextInt(30) + 70;
            List<String> vulns = new ArrayList<>();
            if (score < 85) vulns.add("Potential DEBUG_MODE found in application.yml");
            if (score < 75) vulns.add("Insecure API Port detected");

            results.add(AuditResultResponse.builder()
                    .serviceName(name)
                    .securityScore(score)
                    .vulnerabilities(vulns)
                    .status(score > 85 ? "Secure" : (score > 70 ? "Warning" : "Critical"))
                    .build());
        }

        return Map.of("audit_results", results);
    }

    @GetMapping("/threat-map")
    public Map<String, Object> getThreatMap() {
        return Map.of(
            "active_threats", 0,
            "system_integrity", "99.9%",
            "last_scan", "Just now"
        );
    }
}
