package com.crabteam.nexus.health.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MealAnalysisResponse {
    private String meal;
    private int healthScore;
    private String feedback;
}
