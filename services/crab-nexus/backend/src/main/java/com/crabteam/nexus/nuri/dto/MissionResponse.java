package com.crabteam.nexus.nuri.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MissionResponse {
    private String id;
    private String authorNickname;
    private String type;
    private String content;
    private double distance;
    private String status;
}
