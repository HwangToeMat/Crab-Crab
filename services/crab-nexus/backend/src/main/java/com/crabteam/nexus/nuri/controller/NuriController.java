package com.crabteam.nexus.nuri.controller;

import com.crabteam.nexus.nuri.dto.MissionResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/nuri")
public class NuriController {

    private final List<MissionResponse> missions = new ArrayList<>(List.of(
        MissionResponse.builder().id("m1").authorNickname("행복한할머니").type("Care").content("스마트폰 앱 사용법이 궁금해요.").distance(0.3).status("open").build(),
        MissionResponse.builder().id("m2").authorNickname("정정하신할아버지").type("Activity").content("공원에서 같이 바둑 두실 분?").distance(0.8).status("open").build()
    ));

    @GetMapping("/missions")
    public List<MissionResponse> getMissions() {
        return missions;
    }

    @PostMapping("/missions")
    public Map<String, String> createMission(@RequestBody Map<String, String> request) {
        String id = "m-" + UUID.randomUUID().toString().substring(0, 6);
        missions.add(MissionResponse.builder()
                .id(id)
                .authorNickname(request.getOrDefault("nickname", "Anonymous"))
                .type(request.getOrDefault("type", "General"))
                .content(request.getOrDefault("content", ""))
                .distance(0.5)
                .status("open")
                .build());
        return Map.of("id", id, "status", "open");
    }

    @PostMapping("/missions/{id}/join")
    public Map<String, Object> joinMission(@PathVariable String id) {
        String reason = "이웃님의 따뜻한 마음과 관심사가 일치하여 매칭되었습니다.";
        return Map.of(
            "matched", true,
            "roomId", "room-" + UUID.randomUUID().toString().substring(0, 6),
            "matchingReason", reason
        );
    }
}
