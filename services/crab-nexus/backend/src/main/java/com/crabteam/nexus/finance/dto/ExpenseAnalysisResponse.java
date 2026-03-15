package com.crabteam.nexus.finance.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ExpenseAnalysisResponse {
    private String category;
    private String rawText;
    private String aiAdvice;
}
