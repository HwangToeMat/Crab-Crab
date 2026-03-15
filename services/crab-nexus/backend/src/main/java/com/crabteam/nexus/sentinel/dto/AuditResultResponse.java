package com.crabteam.nexus.sentinel.dto;

import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class AuditResultResponse {
    private String serviceName;
    private int securityScore;
    private List<String> vulnerabilities;
    private String status;
}
