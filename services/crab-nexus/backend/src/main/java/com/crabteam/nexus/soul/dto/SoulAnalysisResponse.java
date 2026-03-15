package com.crabteam.nexus.soul.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.Map;

@Getter
@Builder
public class SoulAnalysisResponse {
    private String emotion;
    private double confidence;
    private Map<String, Object> recommendation;
    private String aiCoachMsg;
}
