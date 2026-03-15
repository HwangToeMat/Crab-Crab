package com.crabteam.nexus.dream.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SleepLogRequest {
    private String user;
    private double duration;
    private int quality;
    private String note;
}
