package com.crabteam.nexus.health.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class HealthRoutineResponse {
    private String goal;
    private List<String> recommendedRoutine;
    private String crabAdvice;
}
