const translations = {
    ko: {
        logo: "🦀 꽃게링크",
        home: "홈",
        split: "꽃게 스플릿",
        library: "꽃게 라이브러리",
        tips: "꽃게 꿀팁",
        login: "로그인",
        heroTitle: "나누면 커지는 이득,<br>꽃게링크로 연결하세요.",
        heroSub: "동네 이웃과 함께 사고, 빌리고, 정보를 나눠보세요.",
        startBtn: "시작하기",
        verifyBanner: "📍 내 동네를 인증해주세요.",
        verifyBtn: "인증하기",
        recentPosts: "최근 게시글",
        writeBtn: "글쓰기",
        categoryAll: "전체",
        categoryFood: "식재료",
        categoryGood: "생필품",
        categoryTool: "도구/공유",
        verified: "인증됨",
        temperature: "매너 온도",
        joinBtn: "참여하기",
        verifyModalTitle: "동네 인증하기 🏠",
        verifyModalBody: "꽃게링크는 신뢰할 수 있는 이웃 간의 거래를 위해 동네 인증이 필요합니다.",
        locationLoading: "현재 위치를 가져오는 중...",
        confirmVerify: "이 동네로 인증 완료",
        footer: "© 2026 CrabTeam. All rights reserved.",
        retry: "다시 시도",
        errorMsg: "데이터를 불러오는 중 오류가 발생했습니다.",
        locationPrefix: "현재 위치: ",
        verifiedPrefix: "📍 인증됨: ",
        verifiedSuccess: "인증 완료"
    },
    en: {
        logo: "🦀 CrabLink",
        home: "Home",
        split: "Crab Split",
        library: "Crab Library",
        tips: "Crab Tips",
        login: "Login",
        heroTitle: "Shared Joy, Double Benefit,<br>Connect with CrabLink.",
        heroSub: "Buy together, borrow, and share info with neighbors.",
        startBtn: "Get Started",
        verifyBanner: "📍 Please verify your neighborhood.",
        verifyBtn: "Verify",
        recentPosts: "Recent Posts",
        writeBtn: "Write",
        categoryAll: "All",
        categoryFood: "Food",
        categoryGood: "Necessities",
        categoryTool: "Tools/Sharing",
        verified: "Verified",
        temperature: "Manner Temp",
        joinBtn: "Join",
        verifyModalTitle: "Verify Neighborhood 🏠",
        verifyModalBody: "CrabLink requires neighborhood verification for trusted transactions.",
        locationLoading: "Getting current location...",
        confirmVerify: "Verify this location",
        footer: "© 2026 CrabTeam. All rights reserved.",
        retry: "Retry",
        errorMsg: "Error occurred while loading data.",
        locationPrefix: "Current Location: ",
        verifiedPrefix: "📍 Verified: ",
        verifiedSuccess: "Verified"
    },
    ja: {
        logo: "🦀 カニリンク",
        home: "ホーム",
        split: "カニスプリット",
        library: "カニライブラリ",
        tips: "カニチップス",
        login: "ログイン",
        heroTitle: "分かち合えば広がる利益、<br>カニリンクでつながりましょう。",
        heroSub: "近所の隣人と一緒に買い、借り、情報を共有しましょう。",
        startBtn: "始める",
        verifyBanner: "📍 近所を認証してください。",
        verifyBtn: "認証する",
        recentPosts: "最近の投稿",
        writeBtn: "投稿する",
        categoryAll: "すべて",
        categoryFood: "食材",
        categoryGood: "日用品",
        categoryTool: "道具/共有",
        verified: "認証済み",
        temperature: "マナー温度",
        joinBtn: "参加する",
        verifyModalTitle: "近所を認証する 🏠",
        verifyModalBody: "カニリンクは信頼できる隣人間の取引のために近所認証が必要です。",
        locationLoading: "現在地を取得中...",
        confirmVerify: "この場所で認証完了",
        footer: "© 2026 CrabTeam. All rights reserved.",
        retry: "再試行",
        errorMsg: "データの読み込み中にエラーが発生しました。",
        locationPrefix: "現在地: ",
        verifiedPrefix: "📍 認証済み: ",
        verifiedSuccess: "認証済み"
    }
};

let currentLang = localStorage.getItem('crabLinkLang') || (navigator.language.startsWith('ko') ? 'ko' : (navigator.language.startsWith('ja') ? 'ja' : 'en'));

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('crabLinkLang', lang);
    applyTranslations();
}

function applyTranslations() {
    const t = translations[currentLang];
    
    // UI elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                el.innerHTML = t[key];
            }
        }
    });

    // Update specific aria-labels if needed
    document.querySelector('.logo').innerText = t.logo;
    document.title = currentLang === 'ko' ? "꽃게링크 - 1인 가구의 현명한 동네 생활" : (currentLang === 'ja' ? "カニリンク - 1人暮らしの賢い近所生活" : "CrabLink - Smart Neighborhood Life for Singles");
}

window.i18n = {
    setLanguage,
    t: (key) => translations[currentLang][key] || key,
    getLang: () => currentLang
};

document.addEventListener('DOMContentLoaded', applyTranslations);
