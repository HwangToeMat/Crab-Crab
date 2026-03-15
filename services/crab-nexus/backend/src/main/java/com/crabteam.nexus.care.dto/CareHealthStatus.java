package com.crabteam.nexus.care.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CareHealthStatus {
    private String userId;
    private int heartRate;
    private int steps;
    private double sleepHours;
    private String status;
    private String visionStatus;
}
