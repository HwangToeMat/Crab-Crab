package com.crabteam.nexus.dream.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SleepAnalysisResponse {
    private String status;
    private String aiAnalysis;
    private String soundTip;
}
