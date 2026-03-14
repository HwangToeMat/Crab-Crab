document.addEventListener('DOMContentLoaded', () => {
    console.log('꽃게링크 앱이 로드되었습니다.');
    
    let allPosts = [];
    const postList = document.getElementById('post-list');

    // 초기 데이터 페칭
    fetchPosts();

    // 필터링 기능
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 활성 버튼 스타일 변경
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
            // 실제 백엔드 연동 (실패 시 catch 블록으로 이동)
            const response = await fetch('http://localhost:8000/posts');
            if (!response.ok) throw new Error('서버 응답 오류');
            
            allPosts = await response.json();
            
            // 데이터가 없는 경우 더미 데이터로 대체 (데모용)
            if (allPosts.length === 0) {
                allPosts = getDummyData();
            }
            
            renderPosts(allPosts);
        } catch (error) {
            console.error('Fetch error:', error);
            showError('데이터를 불러오는 중 오류가 발생했습니다. 네트워크 상태를 확인해주세요.');
        }
    }

    function showLoading() {
        postList.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'post-card';
            skeleton.innerHTML = `
                <div class="post-header">
                    <div class="skeleton skeleton-text" style="width: 100px;"></div>
                    <div class="skeleton skeleton-text" style="width: 50px;"></div>
                </div>
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text" style="width: 70%;"></div>
            `;
            postList.appendChild(skeleton);
        }
    }

    function showError(message) {
        postList.innerHTML = `
            <div class="error-container">
                <span class="error-icon">🦀😭</span>
                <p class="error-message">${message}</p>
                <button class="btn-retry" id="retry-btn">다시 시도하기</button>
            </div>
        `;
        document.getElementById('retry-btn').addEventListener('click', fetchPosts);
    }

    function renderPosts(posts) {
        postList.innerHTML = '';

        if (posts.length === 0) {
            postList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px; color: #888;">게시글이 없습니다.</p>';
            return;
        }

        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'post-card';
            
            let tempColor = '#3498db';
            if (post.user_temperature >= 37.5) tempColor = '#f39c12';
            if (post.user_temperature >= 40) tempColor = '#e74c3c';

            card.innerHTML = `
                <div class="post-header">
                    <span class="user-name">${post.user_name || '익명게'}</span>
                    <div class="temp-wrapper">
                        <span class="temp-value" style="color: ${tempColor}">${post.user_temperature}℃</span>
                        <div class="temp-bar-bg">
                            <div class="temp-bar-fill" style="width: ${Math.min(post.user_temperature * 2, 100)}%; background-color: ${tempColor}"></div>
                        </div>
                    </div>
                </div>
                ${post.image_url ? `<img src="${post.image_url}" alt="${post.title}" class="post-image">` : '<div class="post-image" style="display: flex; align-items: center; justify-content: center; color: #ccc;">이미지 없음</div>'}
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div class="tags">
                    ${(post.tags || '').split(',').map(tag => tag ? `<span class="tag">${tag.trim()}</span>` : '').join('')}
                </div>
                <button class="btn-secondary" style="margin-top: 15px; width: 100%;">참여하기</button>
            `;
            postList.appendChild(card);
        });
    }

    function getDummyData() {
        return [
            {
                id: 1,
                title: '샤인머스캣 소분하실 분!',
                content: '대용량 1박스 샀는데 혼자 먹기 많아서 3송이 나눔합니다.',
                category: '식재료',
                tags: '식재료, 소분',
                user_name: '포도대장',
                user_temperature: 42.5,
                image_url: 'https://images.unsplash.com/photo-1596333522248-111f9902f465?w=400&h=300&fit=crop'
            },
            {
                id: 2,
                title: '전동 드릴 빌려주실 분 계신가요?',
                content: '서랍장 조립하려고 하는데 1시간만 빌려주실 분 찾습니다.',
                category: '도구/공유',
                tags: '도구, 공유',
                user_name: '뚝딱이',
                user_temperature: 36.5,
                image_url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop'
            },
            {
                id: 3,
                title: '화장지 30롤 너무 많아서 10롤 나눕니다',
                content: '쿠팡에서 잘못 시켰네요. 필요하신 분 가져가세요.',
                category: '생필품',
                tags: '생필품, 나눔',
                user_name: '깔끔이',
                user_temperature: 38.2,
                image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop'
            }
        ];
    }
});
