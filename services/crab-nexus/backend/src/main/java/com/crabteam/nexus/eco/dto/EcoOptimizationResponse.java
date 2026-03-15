package com.crabteam.nexus.eco.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EcoOptimizationResponse {
    private String bestStartTime;
    private String bestEndTime;
    private double avgEcoScore;
    private double avgLoad;
    private double avgSolar;
}
