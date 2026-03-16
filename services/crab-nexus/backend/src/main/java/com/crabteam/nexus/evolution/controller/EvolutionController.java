package com.crabteam.nexus.evolution.controller;

import com.crabteam.nexus.evolution.service.AiEvolutionService;
import com.crabteam.nexus.evolution.service.SentinelEvolutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/evolution")
@RequiredArgsConstructor
public class EvolutionController {

    private final AiEvolutionService aiEvolutionService;
    private final SentinelEvolutionService sentinelEvolutionService;

    @GetMapping("/docs/{serviceId}")
    public Map<String, Object> getAiGeneratedDocs(@PathVariable String serviceId) {
        String docs = aiEvolutionService.generateApiDocs(serviceId);
        return Map.of(
            "serviceId", serviceId,
            "generatedAt", new Date(),
            "aiDocs", docs,
            "status", "EVOLVED"
        );
    }

    @GetMapping("/threats/analyze")
    public Map<String, Object> analyzeSystemThreats() {
        return Map.of(
            "analysisTime", new Date(),
            "threatReports", sentinelEvolutionService.analyzeThreatsWithAi(),
            "overallSecurityStatus", "AI_MONITORED"
        );
    }

    @GetMapping("/status")
    public Map<String, Object> getEvolutionStatus() {
        return Map.of(
            "phase", "Phase 5: Infinite Scaling",
            "activeEngines", List.of("Gemini-2.5-Flash", "Sentinel-v2"),
            "connectedServices", 20,
            "evolutionLevel", "98.7%"
        );
    }
}
