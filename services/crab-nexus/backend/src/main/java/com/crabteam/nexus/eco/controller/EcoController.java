package com.crabteam.nexus.eco.controller;

import com.crabteam.nexus.eco.dto.EcoOptimizationResponse;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/v1/eco")
public class EcoController {

    @GetMapping("/optimize")
    public EcoOptimizationResponse getOptimalSlot(@RequestParam(defaultValue = "4") int hours) {
        // 에너지 최적화 엔진 시뮬레이션 (Spring Boot 버전)
        // 실제 데이터 대신 가상 그리드 데이터를 생성하여 최적 슬롯 계산
        
        Random rand = new Random();
        LocalDateTime now = LocalDateTime.now().withMinute(0).withSecond(0).withNano(0);
        
        double maxEcoScore = -1000;
        int bestStartOffset = 0;
        
        // 24시간 예측 데이터 시뮬레이션
        for (int i = 0; i < 24 - hours; i++) {
            double windowEcoScore = 0;
            for (int j = 0; j < hours; j++) {
                double solar = rand.nextDouble() * 100;
                double load = rand.nextDouble() * 100;
                windowEcoScore += (solar * 1.5) - (load * 0.5);
            }
            windowEcoScore /= hours;
            
            if (windowEcoScore > maxEcoScore) {
                maxEcoScore = windowEcoScore;
                bestStartOffset = i;
            }
        }

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        
        return EcoOptimizationResponse.builder()
                .bestStartTime(now.plusHours(bestStartOffset).format(formatter))
                .bestEndTime(now.plusHours(bestStartOffset + hours).format(formatter))
                .avgEcoScore(Math.round(maxEcoScore * 100.0) / 100.0)
                .avgLoad(Math.round((rand.nextDouble() * 50 + 20) * 100.0) / 100.0)
                .avgSolar(Math.round((rand.nextDouble() * 60 + 30) * 100.0) / 100.0)
                .build();
    }
}
