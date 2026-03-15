document.addEventListener('DOMContentLoaded', () => {
    console.log('꽃게링크 앱 2.0 (Infinite Evolution) 가동 중... 🦀✨');
    
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
    
    // [Evolution 2.0] AI Chat Elements
    const aiAssistantTab = document.getElementById('ai-assistant-tab');
    const aiChatModal = document.getElementById('ai-chat-modal');
    const closeAiChat = document.getElementById('close-ai-chat');
    const aiChatForm = document.getElementById('ai-chat-form');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatMessages = document.getElementById('ai-chat-messages');

    // [Evolution 2.0] 검색 및 정렬 상태 관리
    let currentSearch = '';
    let currentSort = 'latest';

    // 언어 선택 이벤트
    langSelect.value = window.i18n.getLang();
    langSelect.addEventListener('change', (e) => {
        window.i18n.setLanguage(e.target.value);
        updateI18nUI();
        renderPosts(allPosts);
        fetchAIRecommendations();
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

    // [Evolution 2.0] AI Chat Logic
    if (aiAssistantTab) {
        aiAssistantTab.addEventListener('click', (e) => {
            e.preventDefault();
            aiChatModal.style.display = 'flex';
        });
    }

    if (closeAiChat) {
        closeAiChat.addEventListener('click', () => {
            aiChatModal.style.display = 'none';
        });
    }

    if (aiChatForm) {
        aiChatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = aiChatInput.value.trim();
            if (!message) return;

            addChatMessage('user', message);
            aiChatInput.value = '';

            try {
                const response = await fetch(`http://localhost:8000/api/v2/ai/chat?message=${encodeURIComponent(message)}`, {
                    method: 'POST'
                });
                const data = await response.json();
                addChatMessage('bot', data.reply);
            } catch (error) {
                console.error('AI Chat failed', error);
                addChatMessage('bot', '죄송합니다. 현재 꽃게 통신망에 장애가 발생했습니다. 🦀');
            }
        });
    }

    function addChatMessage(role, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}`;
        msgDiv.innerText = text;
        aiChatMessages.appendChild(msgDiv);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

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
            renderAIRecommendations(getAIMockData());
        }
    }

    function renderAIRecommendations(recs) {
        const aiList = document.getElementById('ai-scroll-list');
        aiList.innerHTML = '';
        recs.forEach(rec => {
            const item = document.createElement('div');
            item.className = 'ai-card';
            item.onclick = () => window.location.href = rec.action_url;
            item.innerHTML = `
                <span class="ai-card-type">${rec.item_type}</span>
                <h4 class="ai-card-title">${rec.title}</h4>
                <p class="ai-card-reason">${rec.reason}</p>
                <div class="ai-card-footer">
                    <span style="font-size: 0.8rem; color: var(--color-ai-electric-purple); font-weight: 700;">자세히 보기 &rarr;</span>
                </div>
            `;
            aiList.appendChild(item);
        });
    }

    function getAIMockData() {
        return [
            { title: '비 오는 날엔 따뜻한 차 한잔', reason: '최근 "차 세트" 검색 기반 추천', item_type: 'TIP', action_url: '#' },
            { title: '동네 캠핑족을 위한 의자 나눔', reason: '이웃들이 가장 많이 찾는 아이템', item_type: 'POST', action_url: '#' }
        ];
    }

    // [Evolution 2.0] Ambassador Logic
    async function fetchAmbassadors() {
        const ambassadorList = document.getElementById('ambassador-list');
        if (!ambassadorList) return;

        // Mock 데이터로 우선 구현 (백엔드 연동 가능 구조)
        const ambassadors = [
            { name: '행복한 게딱지', area: '역삼1동', temp: 45.2, msg: '나눔은 사랑입니다!' },
            { name: '집게발 박사', area: '서초2동', temp: 41.8, msg: '무엇이든 물어보세요.' },
            { name: '황금꽃게', area: '잠실본동', temp: 43.5, msg: '함께 만드는 살기 좋은 동네' }
        ];

        ambassadorList.innerHTML = '';
        ambassadors.forEach(amb => {
            const card = document.createElement('div');
            card.className = 'post-card';
            card.style.minWidth = '200px';
            card.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 2rem;">🦀</div>
                    <div class="user-name">${amb.name}</div>
                    <div style="font-size: 0.75rem; color: #666;">${amb.area}</div>
                    <div class="temp-value" style="color: #e74c3c;">${amb.temp}℃</div>
                    <p style="font-size: 0.8rem; margin-top: 5px;">"${amb.msg}"</p>
                </div>
            `;
            ambassadorList.appendChild(card);
        });
    }

    // 초기 실행
    fetchPosts();
    fetchAIRecommendations();
    fetchAmbassadors();

    // 동네 인증 모달 열기
    verifyBtn.addEventListener('click', () => {
        verifyModal.style.display = 'block';
        getLocation();
    });

    closeBtn.addEventListener('click', () => verifyModal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === verifyModal) verifyModal.style.display = 'none';
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
                    const randomLoc = "서울시 강남구 역삼동";
                    locationTextInModal.innerText = `${window.i18n.t('locationPrefix')}${randomLoc}`;
                },
                () => {
                    locationTextInModal.innerText = `${window.i18n.t('locationPrefix')}서울시 강남구 역삼동`;
                }
            );
        }
    }

    async function fetchPosts() {
        try {
            const params = new URLSearchParams({ search: currentSearch, sort_by: currentSort });
            const response = await fetch(`http://localhost:8000/posts?${params.toString()}`);
            if (!response.ok) throw new Error('서버 응답 오류');
            allPosts = await response.json();
            renderPosts(allPosts);
        } catch (error) {
            console.error(error);
            renderPosts(getDummyData());
        }
    }

    function renderPosts(posts) {
        postList.innerHTML = '';
        posts.forEach(post => {
            const card = document.createElement('article');
            card.className = 'post-card';
            
            const isAmbassador = post.user_temperature >= 40;
            const hasWarranty = post.category === '도구/공유';

            card.innerHTML = `
                <header class="post-header">
                    <div>
                        <span class="user-name">${post.user_name || 'Anonymous'}</span>
                        ${isAmbassador ? `<span class="ambassador-badge" title="동네 앰배서더">🌟</span>` : ''}
                        ${isUserVerified ? `<span class="verified-badge">인증</span>` : ''}
                    </div>
                    <span class="temp-value" style="color: #e67e22">${post.user_temperature}℃</span>
                </header>
                <div class="post-body" style="padding: 10px 0;">
                    <h3 style="margin-top: 0;">${post.title}</h3>
                    <p>${post.content}</p>
                    ${hasWarranty ? `<div class="warranty-badge">🛡️ 꽃게 보증 안심 물품</div>` : ''}
                </div>
                <div class="post-footer">
                    <button class="btn-like">❤️ ${post.likes || 0}</button>
                    <button class="btn-secondary" style="background-color: var(--color-accent);">${window.i18n.t('joinBtn')}</button>
                </div>
            `;
            postList.appendChild(card);
        });
    }

    function getDummyData() {
        return [
            { id: 1, title: '샤인머스캣 소분하실 분!', content: '대용량 1박스 샀는데 혼자 먹기 많아서 나눕니다.', category: '식재료', user_name: '포도대장', user_temperature: 42.5, likes: 12 },
            { id: 2, title: '전동 드릴 빌려주실 분 계신가요?', content: '서랍장 조립하려고 하는데 1시간만 빌려주실 분 찾습니다.', category: '도구/공유', user_name: '뚝딱이', user_temperature: 36.5, likes: 5 }
        ];
    }
});
