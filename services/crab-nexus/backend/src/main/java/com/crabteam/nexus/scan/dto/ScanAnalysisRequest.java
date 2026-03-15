package com.crabteam.nexus.scan.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScanAnalysisRequest {
    private String itemName;
    private int price;
    private String category;
    private boolean essential;
}
