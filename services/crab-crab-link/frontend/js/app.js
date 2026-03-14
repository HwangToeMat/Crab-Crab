document.addEventListener('DOMContentLoaded', () => {
    console.log('꽃게링크 앱이 로드되었습니다.');
    
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

    // 언어 선택 이벤트
    langSelect.value = window.i18n.getLang();
    langSelect.addEventListener('change', (e) => {
        window.i18n.setLanguage(e.target.value);
        // 이미 렌더링된 요소들 업데이트
        if (isUserVerified) {
            locationBannerText.innerText = `${window.i18n.t('verifiedPrefix')}${userLocation}`;
            verifyBtn.innerText = window.i18n.t('verifiedSuccess');
        } else {
            locationBannerText.innerText = window.i18n.t('verifyBanner');
            verifyBtn.innerText = window.i18n.t('verifyBtn');
        }
        renderPosts(allPosts);
    });

    // 초기 데이터 페칭
    fetchPosts();

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
    // ESC 키로 모달 닫기
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && verifyModal.style.display === 'block') {
            verifyModal.style.display = 'none';
        }
    });

    // 인증 확인 버튼
    confirmVerifyBtn.addEventListener('click', () => {
        isUserVerified = true;
        userLocation = locationTextInModal.innerText.replace(window.i18n.t('locationPrefix'), '');
        locationBannerText.innerText = `${window.i18n.t('verifiedPrefix')}${userLocation}`;
        verifyBtn.innerText = window.i18n.t('verifiedSuccess');
        verifyBtn.disabled = true;
        verifyBtn.style.backgroundColor = '#ccc';
        verifyModal.style.display = 'none';
        
        // 인증 후 데이터 다시 렌더링 (배지 표시를 위해)
        renderPosts(allPosts);
    });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // 실제 서비스라면 여기서 역지오코딩 API를 호출하겠지만, 여기선 모의 데이터 사용
                    const mockNeighborhoods = {
                        ko: ["서울시 강남구 역삼동", "서울시 서초구 서초동", "서울시 송파구 잠실동"],
                        en: ["Yeoksam-dong, Gangnam-gu, Seoul", "Seocho-dong, Seocho-gu, Seoul", "Jamsil-dong, Songpa-gu, Seoul"],
                        ja: ["ソウル市江南区駅三洞", "ソウル市瑞草区瑞草洞", "ソウル市松坡区蚕室洞"]
                    };
                    const lang = window.i18n.getLang();
                    const list = mockNeighborhoods[lang] || mockNeighborhoods.en;
                    const randomLoc = list[Math.floor(Math.random() * list.length)];
                    locationTextInModal.innerText = `${window.i18n.t('locationPrefix')}${randomLoc}`;
                },
                () => {
                    locationTextInModal.innerText = window.i18n.getLang() === 'ko' ? "위치 정보를 가져올 수 없습니다. (역삼동으로 자동 설정)" : "Unable to get location. (Auto-set to Yeoksam-dong)";
                    setTimeout(() => {
                        const defaultLoc = { ko: "서울시 강남구 역삼동", en: "Yeoksam-dong, Gangnam-gu, Seoul", ja: "ソウル市江南区駅三洞" };
                        locationTextInModal.innerText = `${window.i18n.t('locationPrefix')}${defaultLoc[window.i18n.getLang()] || defaultLoc.en}`;
                    }, 1000);
                }
            );
        } else {
            locationTextInModal.innerText = "Error: Geolocation not supported.";
        }
    }

    // 필터링 기능
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            if (category === 'ALL') {
                renderPosts(allPosts);
            } else {
                const filtered = allPosts.filter(post => post.category === category);
                renderPosts(filtered);
            }
        });
    });

    async function fetchPosts() {
        showLoading();
        try {
            const response = await fetch('http://localhost:8000/posts');
            if (!response.ok) throw new Error('서버 응답 오류');
            allPosts = await response.json();
            if (allPosts.length === 0) allPosts = getDummyData();
            renderPosts(allPosts);
        } catch (error) {
            showError('데이터를 불러오는 중 오류가 발생했습니다.');
        }
    }

    function showLoading() {
        postList.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'post-card';
            skeleton.innerHTML = `
                <div class="post-header"><div class="skeleton skeleton-text" style="width: 100px;"></div></div>
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
            `;
            postList.appendChild(skeleton);
        }
    }

    function showError(message) {
        postList.innerHTML = `<div class="error-container"><p class="error-message">${message}</p><button class="btn-retry" id="retry-btn">다시 시도</button></div>`;
        document.getElementById('retry-btn').addEventListener('click', fetchPosts);
    }

    function renderPosts(posts) {
        postList.innerHTML = '';
        posts.forEach(post => {
            const card = document.createElement('article');
            card.className = 'post-card';
            card.setAttribute('role', 'listitem');
            let tempColor = '#3498db';
            if (post.user_temperature >= 37.5) tempColor = '#f39c12';
            if (post.user_temperature >= 40) tempColor = '#e74c3c';

            const isVerifiedPost = true;

            card.innerHTML = `
                <header class="post-header">
                    <div>
                        <span class="user-name">${post.user_name || (window.i18n.getLang() === 'ko' ? '익명게' : 'Anonymous')}</span>
                        ${isVerifiedPost ? `<span class="verified-badge" aria-label="${window.i18n.t('verified')}">${window.i18n.t('verified')}</span>` : ''}
                    </div>
                    <div class="temp-wrapper" aria-label="${window.i18n.t('temperature')} ${post.user_temperature}도">
                        <span class="temp-value" style="color: ${tempColor}" aria-hidden="true">${post.user_temperature}℃</span>
                        <div class="temp-bar-bg" aria-hidden="true">
                            <div class="temp-bar-fill" style="width: ${Math.min(post.user_temperature * 2, 100)}%; background-color: ${tempColor}"></div>
                        </div>
                    </div>
                </header>
                ${post.image_url ? `<img src="${post.image_url}" alt="${post.title}" class="post-image" loading="lazy" decoding="async">` : '<div class="post-image" aria-hidden="true">No Image</div>'}
                <div style="font-size: 0.8rem; color: #555; margin-bottom: 5px;" aria-label="Location">📍 ${window.i18n.getLang() === 'ko' ? '역삼동' : 'Yeoksam'}</div>
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div class="tags" aria-label="Tags">${(post.tags || '').split(',').map(tag => tag ? `<span class="tag">${tag.trim()}</span>` : '').join('')}</div>
                <button class="btn-secondary" style="margin-top: 15px; width: 100%;" aria-label="${window.i18n.t('joinBtn')}">${window.i18n.t('joinBtn')}</button>
            `;
            postList.appendChild(card);
        });
    }

    function getDummyData() {
        const lang = window.i18n.getLang();
        const data = {
            ko: [
                { id: 1, title: '샤인머스캣 소분하실 분!', content: '대용량 1박스 샀는데 혼자 먹기 많아서 3송이 나눔합니다.', category: '식재료', tags: '식재료, 소분', user_name: '포도대장', user_temperature: 42.5, image_url: 'https://images.unsplash.com/photo-1596333522248-111f9902f465?w=400&h=300&fit=crop' },
                { id: 2, title: '전동 드릴 빌려주실 분 계신가요?', content: '서랍장 조립하려고 하는데 1시간만 빌려주실 분 찾습니다.', category: '도구/공유', tags: '도구, 공유', user_name: '뚝딱이', user_temperature: 36.5, image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop' },
                { id: 3, title: '화장지 30롤 너무 많아서 10롤 나눕니다', content: '쿠팡에서 잘못 시켰네요. 필요하신 분 가져가세요.', category: '생필품', tags: '생필품, 나눔', user_name: '깔끔이', user_temperature: 38.2, image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop' }
            ],
            en: [
                { id: 1, title: 'Anyone want to split Shine Muscat?', content: 'Bought a large box, too much for one. Sharing 3 bunches.', category: '식재료', tags: 'food, split', user_name: 'GrapeMaster', user_temperature: 42.5, image_url: 'https://images.unsplash.com/photo-1596333522248-111f9902f465?w=400&h=300&fit=crop' },
                { id: 2, title: 'Can I borrow a power drill?', content: 'Assembling a drawer, need it for just 1 hour.', category: '도구/공유', tags: 'tools, sharing', user_name: 'HandyMan', user_temperature: 36.5, image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop' },
                { id: 3, title: '30 rolls of TP is too many, sharing 10', content: 'Ordered too many online. Please take some.', category: '생필품', tags: 'necessities, free', user_name: 'CleanGuy', user_temperature: 38.2, image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop' }
            ],
            ja: [
                { id: 1, title: 'シャインマスカットを分け合いたい方！', content: '大容量1箱買いましたが一人では多いので3房お分けします。', category: '식재료', tags: '食材, 分け合い', user_name: 'ブドウ大将', user_temperature: 42.5, image_url: 'https://images.unsplash.com/photo-1596333522248-111f9902f465?w=400&h=300&fit=crop' },
                { id: 2, title: '電動ドリルを貸していただける方いますか？', content: '引き出しを組み立てるのに1時間だけ借りたいです。', category: '도구/공유', tags: '道具, 共有', user_name: 'トントン', user_temperature: 36.5, image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop' },
                { id: 3, title: 'トイレットペーパー30ロールは多すぎて10ロール分けます', content: '通販で買いすぎました。必要な方どうぞ。', category: '생필품', tags: '日用品, お裾分け', user_name: 'きれい好き', user_temperature: 38.2, image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop' }
            ]
        };
        return data[lang] || data.en;
    }
});
