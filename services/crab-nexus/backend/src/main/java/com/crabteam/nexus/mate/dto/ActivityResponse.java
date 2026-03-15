package com.crabteam.nexus.mate.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ActivityResponse {
    private int id;
    private String title;
    private String description;
    private String category;
}
