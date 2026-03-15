package com.crabteam.nexus.shield.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShieldAnalysisResponse {
    private int score;
    private boolean isSafe;
    private String intent;
    private String message;
    private String aiInsight;
    private String actionPlan;
}
