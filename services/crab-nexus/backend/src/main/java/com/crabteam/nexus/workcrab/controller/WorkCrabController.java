package com.crabteam.nexus.workcrab.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/workcrab")
public class WorkCrabController {

    @GetMapping("/tasks")
    public List<Map<String, Object>> getTasks() {
        return List.of(
            Map.of("id", 1, "title", "통합 아키텍처 설계", "status", "IN_PROGRESS"),
            Map.of("id", 2, "title", "Spring Boot 마이그레이션", "status", "DONE")
        );
    }

    @PostMapping("/tasks")
    public Map<String, Object> createTask(@RequestBody Map<String, Object> task) {
        return task;
    }
}
