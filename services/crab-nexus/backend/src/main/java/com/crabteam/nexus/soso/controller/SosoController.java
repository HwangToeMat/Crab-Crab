package com.crabteam.nexus.soso.controller;

import com.crabteam.nexus.soso.dto.SosoPostResponse;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/v1/soso")
public class SosoController {

    private final List<SosoPostResponse> posts = new ArrayList<>(List.of(
        SosoPostResponse.builder()
            .id("p1").content("아침 산책길에 만난 길고양이가 너무 귀여웠어요!").nickname("따뜻한 햇살")
            .mood("happy").likes(5).createdAt(LocalDateTime.now().minusHours(2).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
            .analysis(Map.of("color", "#FACC15", "message", "찬란한 햇살 같은 기쁨이네요!"))
            .build(),
        SosoPostResponse.builder()
            .id("p2").content("읽고 싶었던 책을 드디어 다 읽었습니다.").nickname("빛나는 별빛")
            .mood("calm").likes(12).createdAt(LocalDateTime.now().minusHours(5).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
            .analysis(Map.of("color", "#60A5FA", "message", "고요한 바다 같은 평온함이 느껴져요."))
            .build()
    ));

    @GetMapping("/posts")
    public List<SosoPostResponse> getPosts() {
        return posts;
    }

    @PostMapping("/posts")
    public SosoPostResponse createPost(@RequestBody Map<String, String> request) {
        String id = UUID.randomUUID().toString().substring(0, 8);
        SosoPostResponse newPost = SosoPostResponse.builder()
                .id(id)
                .content(request.getOrDefault("content", ""))
                .nickname(request.getOrDefault("nickname", "행복한 고래"))
                .mood(request.getOrDefault("mood", "happy"))
                .likes(0)
                .createdAt(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                .analysis(Map.of("color", "#FACC15", "message", "따뜻한 기쁨이 피어오르네요."))
                .build();
        posts.add(0, newPost);
        return newPost;
    }

    @PostMapping("/posts/{id}/like")
    public Map<String, Integer> likePost(@PathVariable String id) {
        return Map.of("newLikes", 15); // Mock like update
    }
}
