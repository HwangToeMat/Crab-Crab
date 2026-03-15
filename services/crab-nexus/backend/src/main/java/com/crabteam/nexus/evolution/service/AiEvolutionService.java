package com.crabteam.nexus.evolution.service;

import com.crabteam.nexus.common.service.GeminiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiEvolutionService {

    private final GeminiService geminiService;

    private static final Map<String, String> SERVICE_MAP = Map.ofEntries(
        Map.entry("crab-infinity", "infinity"),
        Map.entry("work-crab", "workcrab"),
        Map.entry("god-crab", "godcrab"),
        Map.entry("crab-shield", "shield"),
        Map.entry("mood-ge", "mood"),
        Map.entry("crab-mate", "mate"),
        Map.entry("crab-finance", "finance"),
        Map.entry("crab-health", "health"),
        Map.entry("eco-charge-optimizer", "eco"),
        Map.entry("senticrypto-analyzer", "crypto"),
        Map.entry("crab-crab-care", "care"),
        Map.entry("crab-crab-link", "link"),
        Map.entry("crab-deep-dream", "dream"),
        Map.entry("crab-mind", "mind"),
        Map.entry("crab-scan", "scan"),
        Map.entry("crab-sentinel", "sentinel"),
        Map.entry("crab-soul-care", "soul"),
        Map.entry("nuri-bom", "nuri"),
        Map.entry("soso-haeng", "soso")
    );

    public String generateApiDocs(String serviceId) {
        String packageSuffix = SERVICE_MAP.getOrDefault(serviceId, serviceId.replace("-", ""));
        
        // 실제 운영 시에는 리소스 폴더나 특정 경로에서 파일을 읽어오거나 
        // Reflection을 사용하나, 여기서는 AI-Native 진화를 위해 소스 코드를 분석 대상으로 삼습니다.
        String controllerDirPath = String.format("services/crab-nexus/backend/src/main/java/com/crabteam/nexus/%s/controller", packageSuffix);
        
        try {
            Path dirPath = Paths.get(controllerDirPath);
            if (!Files.exists(dirPath)) {
                return "[Error] 컨트롤러 디렉토리를 찾을 수 없습니다: " + controllerDirPath;
            }
            
            Path sourceFile = Files.list(dirPath)
                    .filter(p -> p.toString().endsWith("Controller.java"))
                    .findFirst()
                    .orElse(null);
            
            if (sourceFile != null) {
                String sourceCode = Files.readString(sourceFile);
                String systemPrompt = "너는 CrabTeam의 'Evolution Director'이자 'Architecture Standardizer'이다. " +
                        "제공된 Spring Boot 컨트롤러 소스 코드를 분석하여, 외부 개발자가 읽기 편한 상세한 API 설명서(Markdown 형식)를 작성하라. " +
                        "각 엔드포인트의 목적, 요청 파라미터, 응답 예시, 그리고 이 서비스의 '꽃게팀 세계관' 내에서의 역할을 포함하라.";
                return geminiService.analyzeWithAi(systemPrompt, sourceCode);
            } else {
                return "[Error] 소스 코드를 찾을 수 없습니다: " + controllerDirPath;
            }
        } catch (IOException e) {
            log.error("Failed to read source code for AI documentation: {}", e.getMessage());
            return "[Error] 문서 생성 중 오류 발생: " + e.getMessage();
        }
    }
}
