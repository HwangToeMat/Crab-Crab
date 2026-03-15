package com.crabteam.nexus.link.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LinkRecommendationResponse {
    private int id;
    private String title;
    private String reason;
    private String category;
}
