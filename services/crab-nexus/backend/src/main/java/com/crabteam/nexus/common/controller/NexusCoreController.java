package com.crabteam.nexus.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequestMapping("/api/v1/nexus")
public class NexusCoreController {

    @GetMapping("/services")
    public List<Map<String, Object>> getAllServices() {
        // 실제 운영 시에는 DB나 파일 시스템 스캔을 통해 동적으로 가져올 수 있습니다.
        return List.of(
            Map.of("id", "crab-infinity", "name", "Crab-Infinity", "icon", "Infinity", "description", "모든 서비스 조율 및 AI 오케스트레이터", "status", "ACTIVE"),
            Map.of("id", "work-crab", "name", "Work-Crab", "icon", "Briefcase", "description", "생산성 및 번아웃 관리", "status", "ACTIVE"),
            Map.of("id", "god-crab", "name", "God-Crab", "icon", "Trophy", "description", "갓생 습관 형성 챌린지", "status", "ACTIVE"),
            Map.of("id", "crab-shield", "name", "Crab-Shield", "icon", "Shield", "description", "보안 및 신뢰 보증 시스템", "status", "ACTIVE"),
            Map.of("id", "mood-ge", "name", "Mood-Ge", "icon", "Smile", "description", "감정 분석 및 힐링 케어", "status", "ACTIVE"),
            Map.of("id", "crab-mate", "name", "Crab-Mate", "icon", "Users", "description", "꽃게팀 소셜 커뮤니티", "status", "ACTIVE"),
            Map.of("id", "crab-finance", "name", "Crab-Finance", "icon", "Wallet", "description", "무한 성장을 위한 핀테크 리워드", "status", "ACTIVE"),
            Map.of("id", "crab-health", "name", "Crab-Health", "icon", "Activity", "description", "신체 활동 분석 및 루틴 추천", "status", "ACTIVE"),
            Map.of("id", "eco-charge-optimizer", "name", "Eco-Charge", "icon", "Zap", "description", "에너지 최적화 엔진", "status", "ACTIVE"),
            Map.of("id", "senticrypto-analyzer", "name", "SentiCrypto", "icon", "TrendingUp", "description", "암호화폐 감성 분석 지능", "status", "ACTIVE"),
            Map.of("id", "crab-crab-care", "name", "Crab-Care", "icon", "Heart", "description", "건강 진단 및 환경 최적화", "status", "ACTIVE"),
            Map.of("id", "crab-crab-link", "name", "Crab-Link", "icon", "Share2", "description", "서비스 간 데이터 연동 및 네트워크", "status", "ACTIVE"),
            Map.of("id", "crab-deep-dream", "name", "Deep-Dream", "icon", "Moon", "description", "AI 수면 분석 및 드림 코칭", "status", "ACTIVE"),
            Map.of("id", "crab-mind", "name", "Crab-Mind", "icon", "Brain", "description", "심리 상담 및 멘탈 웰니스", "status", "ACTIVE"),
            Map.of("id", "crab-scan", "name", "Crab-Scan", "icon", "Search", "description", "지출 패턴 스캔 및 절약 코칭", "status", "ACTIVE"),
            Map.of("id", "crab-sentinel", "name", "Crab-Sentinel", "icon", "Eye", "description", "이상 징후 감지 및 비상 프로토콜", "status", "ACTIVE"),
            Map.of("id", "crab-soul-care", "name", "Crab-Soul", "icon", "Sparkles", "description", "고차원적 가치 및 자아 성찰", "status", "ACTIVE"),
            Map.of("id", "nuri-bom", "name", "Nuri-Bom", "icon", "Sun", "description", "시니어 케어 및 세대 연결", "status", "ACTIVE"),
            Map.of("id", "soso-haeng", "name", "Soso-Haeng", "icon", "Soso", "description", "소소하지만 확실한 행복 리스트", "status", "ACTIVE")
        );
    }
}
