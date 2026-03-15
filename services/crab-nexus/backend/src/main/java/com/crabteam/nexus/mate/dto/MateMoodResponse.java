package com.crabteam.nexus.mate.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class MateMoodResponse {
    private double sentimentScore;
    private String moodCategory;
    private String message;
    private int sameMoodCount;
    private List<String> cheerMessages;
}
