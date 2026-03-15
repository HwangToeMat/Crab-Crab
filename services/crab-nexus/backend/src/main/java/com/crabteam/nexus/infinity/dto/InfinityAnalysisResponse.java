package com.crabteam.nexus.infinity.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@Builder
public class InfinityAnalysisResponse {
    private String analysis;
    private List<String> recommendations;
    private Map<String, Double> metrics;
}
