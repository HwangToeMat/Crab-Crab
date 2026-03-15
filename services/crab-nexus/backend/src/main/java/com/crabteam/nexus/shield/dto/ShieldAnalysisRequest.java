package com.crabteam.nexus.shield.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShieldAnalysisRequest {
    private String text;
    private String sender;
}
