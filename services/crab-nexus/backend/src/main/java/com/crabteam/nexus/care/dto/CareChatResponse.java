package com.crabteam.nexus.care.dto;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class CareChatResponse {
    private String response;
    private String moodDetected;
    private LocalDateTime timestamp;
}
