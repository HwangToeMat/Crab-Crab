document.addEventListener('DOMContentLoaded', () => {
    console.log('꽃게링크 앱 2.0 (Evolution) 로드되었습니다. 🦀✨');
    
    let allPosts = [];
    let isUserVerified = false;
    let userLocation = "인증 전";
    
    const postList = document.getElementById('post-list');
    const verifyModal = document.getElementById('verify-modal');
    const verifyBtn = document.getElementById('verify-location-btn');
    const confirmVerifyBtn = document.getElementById('confirm-verify-btn');
    const closeBtn = document.querySelector('.close-btn');
    const locationBannerText = document.getElementById('current-location');
    const locationTextInModal = document.getElementById('location-text');
    const langSelect = document.getElementById('lang-select');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const sortSelect = document.getElementById('sort-select');
    const aiAssistantTab = document.getElementById('ai-assistant-tab');

    // [Evolution 2.0] 검색 및 정렬 상태 관리
    let currentSearch = '';
    let currentSort = 'latest';

    // 언어 선택 이벤트
    langSelect.value = window.i18n.getLang();
    langSelect.addEventListener('change', (e) => {
        window.i18n.setLanguage(e.target.value);
        updateI18nUI();
        renderPosts(allPosts);
        fetchAIRecommendations(); // 언어 변경 시 AI 추천도 새로고침
    });

    function updateI18nUI() {
        if (isUserVerified) {
            locationBannerText.innerText = `${window.i18n.t('verifiedPrefix')}${userLocation}`;
            verifyBtn.innerText = window.i18n.t('verifiedSuccess');
        } else {
            locationBannerText.innerText = window.i18n.t('verifyBanner');
            verifyBtn.innerText = window.i18n.t('verifyBtn');
        }
    }

    // 검색 이벤트
    searchBtn.addEventListener('click', () => {
        currentSearch = searchInput.value;
        fetchPosts();
    });
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentSearch = searchInput.value;
            fetchPosts();
        }
    });

    // 정렬 이벤트
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        fetchPosts();
    });

    // 초기 데이터 페칭
    fetchPosts();
    fetchAIRecommendations();

    // [Evolution 2.0] AI 추천 데이터 페칭
    async function fetchAIRecommendations() {
        const aiList = document.getElementById('ai-scroll-list');
        if (!aiList) return;
        
        try {
            const response = await fetch('http://localhost:8000/api/v2/ai/recommendations');
            if (!response.ok) throw new Error('AI 추천 오류');
            const recommendations = await response.json();
            renderAIRecommendations(recommendations);
        } catch (error) {
            console.error('AI Recommendations failed', error);
            // 에러 시 더미 데이터 사용 (Mock)
            renderAIRecommendations(getAIMockData());
        }
    }

    function renderAIRecommendations(recs) {
        const aiList = document.getElementById('ai-scroll-list');
        aiList.innerHTML = '';
        recs.forEach(rec => {
            const item = document.createElement('div');
            item.className = 'ai-card-v2';
            item.innerHTML = `
                <div class="ai-card-image" style="background-image: url('${rec.image_url || 'https://via.placeholder.com/150'}')"></div>
                <div class="ai-card-content">
                    <span class="ai-tag">AI Pick</span>
                    <h4>${rec.title}</h4>
                    <p>${rec.reason}</p>
                </div>
            `;
            aiList.appendChild(item);
        });
    }

    function getAIMockData() {
        const lang = window.i18n.getLang();
        const data = {
            ko: [
                { id: 101, title: '비 오는 날엔 따뜻한 차 한잔', reason: '최근 "차 세트" 검색 기반 추천', image_url: 'https://images.unsplash.com/photo-1544787210-22bb1e3efd11?w=300&h=200&fit=crop' },
                { id: 102, title: '동네 캠핑족을 위한 의자 나눔', reason: '이웃들이 가장 많이 찾는 아이템', image_url: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=300&h=200&fit=crop' }
            ],
            en: [
                { id: 101, title: 'Warm Tea for Rainy Days', reason: 'Based on your recent "Tea" search', image_url: 'https://images.unsplash.com/photo-1544787210-22bb1e3efd11?w=300&h=200&fit=crop' },
                { id: 102, title: 'Chair Sharing for Campers', reason: 'Trending item in your neighborhood', image_url: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=300&h=200&fit=crop' }
            ]
        };
        return data[lang] || data.en;
    }

    // [Evolution 2.0] AI 어시스턴트 탭 이벤트
    if (aiAssistantTab) {
        aiAssistantTab.addEventListener('click', (e) => {
            e.preventDefault();
            alert(window.i18n.getLang() === 'ko' ? 
                '✨ 꽃게 AI 어시스턴트가 당신의 동네 생활을 분석 중입니다! 곧 대화형 서비스로 만나요.' : 
                '✨ Crab AI Assistant is analyzing your neighborhood life! Interactive service coming soon.');
        });
    }

    // 동네 인증 모달 열기
    verifyBtn.addEventListener('click', () => {
        verifyModal.style.display = 'block';
        getLocation();
    });

    // 모달 닫기
    closeBtn.addEventListener('click', () => verifyModal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === verifyModal) verifyModal.style.display = 'none';
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && verifyModal.style.display === 'block') {
            verifyModal.style.display = 'none';
        }
    });

    confirmVerifyBtn.addEventListener('click', () => {
        isUserVerified = true;
        userLocation = locationTextInModal.innerText.replace(window.i18n.t('locationPrefix'), '');
        locationBannerText.innerText = `${window.i18n.t('verifiedPrefix')}${userLocation}`;
        verifyBtn.innerText = window.i18n.t('verifiedSuccess');
        verifyBtn.disabled = true;
        verifyBtn.style.backgroundColor = '#ccc';
        verifyModal.style.display = 'none';
        renderPosts(allPosts);
    });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const mockNeighborhoods = {
                        ko: ["서울시 강남구 역삼동", "서울시 서초구 서초동", "서울시 송파구 잠실동"],
                        en: ["Yeoksam-dong, Gangnam-gu, Seoul", "Seocho-dong, Seocho-gu, Seoul", "Jamsil-dong, Songpa-gu, Seoul"]
                    };
                    const lang = window.i18n.getLang();
                    const list = mockNeighborhoods[lang] || mockNeighborhoods.en;
                    const randomLoc = list[Math.floor(Math.random() * list.length)];
                    locationTextInModal.innerText = `${window.i18n.t('locationPrefix')}${randomLoc}`;
                },
                () => {
                    locationTextInModal.innerText = "Error: Use Default Location (Yeoksam)";
                    setTimeout(() => {
                        const defaultLoc = { ko: "서울시 강남구 역삼동", en: "Yeoksam-dong, Seoul" };
                        locationTextInModal.innerText = `${window.i18n.t('locationPrefix')}${defaultLoc[window.i18n.getLang()] || defaultLoc.en}`;
                    }, 1000);
                }
            );
        }
    }

    async function fetchPosts() {
        showLoading();
        try {
            const params = new URLSearchParams({ search: currentSearch, sort_by: currentSort });
            const response = await fetch(`http://localhost:8000/posts?${params.toString()}`);
            if (!response.ok) throw new Error('서버 응답 오류');
            allPosts = await response.json();
            if (allPosts.length === 0 && !currentSearch) allPosts = getDummyData();
            renderPosts(allPosts);
        } catch (error) {
            console.error(error);
            showError('Failed to fetch data');
        }
    }

    function showLoading() {
        postList.innerHTML = '<div class="skeleton-container">Loading posts...</div>';
    }

    function showError(message) {
        postList.innerHTML = `<div class="error-container">${message}</div>`;
    }

    function renderPosts(posts) {
        postList.innerHTML = '';
        posts.forEach(post => {
            const card = document.createElement('article');
            card.className = 'post-card';
            
            let tempColor = '#3498db';
            if (post.user_temperature >= 37.5) tempColor = '#f39c12';
            if (post.user_temperature >= 40) tempColor = '#e74c3c';

            // [Evolution 2.0] 앰배서더 및 보증 배지 정보 (Mock 기반 연동)
            const isAmbassador = post.user_temperature >= 40;
            const hasWarranty = post.category === '도구/공유'; // 도구 공유 게시글엔 보증 적용

            card.innerHTML = `
                <header class="post-header">
                    <div>
                        <span class="user-name">${post.user_name || 'Anonymous'}</span>
                        ${isAmbassador ? `<span class="ambassador-badge" title="동네 앰배서더">🌟</span>` : ''}
                        ${isUserVerified ? `<span class="verified-badge">인증</span>` : ''}
                    </div>
                    <div class="temp-wrapper">
                        <span class="temp-value" style="color: ${tempColor}">${post.user_temperature}℃</span>
                    </div>
                </header>
                ${post.image_url ? `<img src="${post.image_url}" alt="${post.title}" class="post-image">` : '<div class="post-image">No Image</div>'}
                <div class="post-body">
                    <div style="font-size: 0.8rem; color: #777;">📍 역삼동</div>
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    ${hasWarranty ? `<div class="warranty-info">🛡️ 꽃게 보증: 보증금 5,000원 + 안심 보험</div>` : ''}
                </div>
                <div class="post-footer">
                    <button class="btn-like" data-id="${post.id}">❤️ ${post.likes || 0}</button>
                    <button class="btn-secondary">${window.i18n.t('joinBtn')}</button>
                </div>
            `;
            postList.appendChild(card);
        });
    }

    function getDummyData() {
        return [
            { id: 1, title: '샤인머스캣 소분하실 분!', content: '대용량 1박스 샀는데 혼자 먹기 많아서 나눕니다.', category: '식재료', user_name: '포도대장', user_temperature: 42.5, image_url: 'https://images.unsplash.com/photo-1596333522248-111f9902f465?w=400&h=300&fit=crop', likes: 12 },
            { id: 2, title: '전동 드릴 빌려주실 분 계신가요?', content: '서랍장 조립하려고 하는데 1시간만 빌려주실 분 찾습니다.', category: '도구/공유', user_name: '뚝딱이', user_temperature: 36.5, image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop', likes: 5 }
        ];
    }
});
