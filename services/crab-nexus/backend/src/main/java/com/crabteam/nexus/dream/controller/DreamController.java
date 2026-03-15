package com.crabteam.nexus.dream.controller;

import com.crabteam.nexus.dream.dto.SleepAnalysisResponse;
import com.crabteam.nexus.dream.dto.SleepLogRequest;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/dream")
public class DreamController {

    private final List<Map<String, Object>> sleepLogs = new ArrayList<>();
    private final List<String> sounds = List.of("심해의 파도 소리", "빗소리와 숲의 노래", "부드러운 피아노 선율", "화이트 노이즈");

    @PostMapping("/log")
    public SleepAnalysisResponse logSleep(@RequestBody SleepLogRequest log) {
        String analysis = "수면 시간은 적절하지만 수면의 질이 낮습니다. 자기 전 30분 동안 블루라이트를 차단해보세요.";
        if (log.getDuration() < 6) {
            analysis = "심각한 수면 부족입니다. 낮잠 20분을 추천하며, 카페인 섭취를 줄이십시오.";
        } else if (log.getQuality() > 8) {
            analysis = "훌륭한 수면입니다! 현재 루틴을 유지하면 '킹크랩 급 수면' 단계에 도달할 수 있습니다.";
        }

        String recommendedSound = sounds.get(new Random().nextInt(sounds.size()));

        Map<String, Object> logData = new HashMap<>();
        logData.put("duration", log.getDuration());
        logData.put("quality", log.getQuality());
        logData.put("note", log.getNote());
        logData.put("analysis", analysis);
        logData.put("recommendation", recommendedSound);
        sleepLogs.add(logData);

        return SleepAnalysisResponse.builder()
                .status("success")
                .aiAnalysis(analysis)
                .soundTip(recommendedSound)
                .build();
    }

    @GetMapping("/history")
    public Map<String, List<Map<String, Object>>> getHistory() {
        int start = Math.max(0, sleepLogs.size() - 10);
        return Map.of("history", sleepLogs.subList(start, sleepLogs.size()));
    }
}
