package com.crabteam.nexus.mind.controller;

import com.crabteam.nexus.mind.dto.MindJournalResponse;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/mind")
public class MindController {

    @PostMapping("/journal")
    public MindJournalResponse submitJournal(@RequestBody Map<String, String> request) {
        String mood = request.getOrDefault("mood", "Neutral");
        String content = request.getOrDefault("content", "");

        // Crab-Mind AI 상담사 시뮬레이션
        String advice = String.format("[%s] 오늘 하루 정말 고생 많으셨어요. 당신의 진심 어린 이야기가 저에게도 전해지네요. 꽃게가 당신의 마음을 항상 따뜻하게 안아드릴게요. 내일은 오늘보다 조금 더 평온한 하루가 될 거예요!", mood);
        
        if (content.contains("힘들어") || content.contains("지쳐")) {
            advice = "마음이 많이 지치셨군요. 그럴 땐 잠시 모든 걸 내려놓고 깊게 숨을 들이마셔 보세요. 꽃게가 당신 곁에서 묵묵히 응원하고 있을게요.";
        }

        return MindJournalResponse.builder()
                .advice(advice)
                .empathyScore(100)
                .build();
    }

    @GetMapping("/quotes")
    public Map<String, String> getRandomQuote() {
        List<String> quotes = List.of(
            "가장 어두운 밤도 언젠가는 끝나고 해가 뜰 거예요.",
            "당신은 생각보다 훨씬 강한 사람입니다.",
            "완벽하지 않아도 괜찮아요. 존재하는 것만으로도 가치 있습니다.",
            "오늘의 쉼표가 내일의 느낌표가 될 거예요."
        );
        return Map.of("quote", quotes.get(new Random().nextInt(quotes.size())));
    }
}
