package com.crabteam.nexus.mind.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MindJournalResponse {
    private String advice;
    private int empathyScore;
}
