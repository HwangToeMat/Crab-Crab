package com.crabteam.nexus.crypto.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CryptoSentimentResponse {
    private String text;
    private double score;
    private double subjectivity;
    private String status;
}
