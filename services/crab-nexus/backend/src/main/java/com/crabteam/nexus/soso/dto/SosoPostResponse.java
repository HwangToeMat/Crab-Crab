package com.crabteam.nexus.soso.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.Map;

@Getter
@Builder
public class SosoPostResponse {
    private String id;
    private String content;
    private String nickname;
    private String mood;
    private Map<String, Object> analysis;
    private String createdAt;
    private int likes;
}
