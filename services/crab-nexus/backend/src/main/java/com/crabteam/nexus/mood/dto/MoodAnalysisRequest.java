package com.crabteam.nexus.mood.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoodAnalysisRequest {
    private String mood;
    private String note;
}
