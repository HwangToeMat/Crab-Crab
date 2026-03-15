package com.crabteam.nexus.godcrab.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/godcrab")
public class GodCrabController {

    @GetMapping("/status")
    public Map<String, Object> getStatus() {
        return Map.of(
            "name", "크래비",
            "level", 5,
            "exp", 85,
            "streak", 12
        );
    }
}
