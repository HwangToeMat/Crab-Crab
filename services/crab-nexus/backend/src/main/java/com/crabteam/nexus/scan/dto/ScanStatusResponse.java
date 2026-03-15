package com.crabteam.nexus.scan.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.List;
import java.util.Map;

@Getter
@Builder
public class ScanStatusResponse {
    private int savingScore;
    private long totalSpent;
    private int streak;
    private List<Map<String, Object>> quests;
    private List<Map<String, Object>> rankings;
}
