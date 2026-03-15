package com.crabteam.nexus.mood.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.List;
import java.util.Map;

@Getter
@Builder
public class MoodStatusResponse {
    private int points;
    private int burnoutScore;
    private int streak;
    private int cheers;
    private List<Map<String, String>> ambassadors;
}
