document.addEventListener('DOMContentLoaded', () => {
    console.log('꽃게링크 앱이 로드되었습니다.');
    
    // 초기 더미 데이터 렌더링 (백엔드 연동 전까지)
    const posts = [
        {
            id: 1,
            title: '샤인머스캣 소분하실 분!',
            content: '대용량 1박스 샀는데 혼자 먹기 많아서 3송이 나눔합니다.',
            type: 'REQUEST',
            tags: '식재료, 소분',
            user_name: '포도대장',
            user_temperature: 42.5
        },
        {
            id: 2,
            title: '전동 드릴 빌려주실 분 계신가요?',
            content: '서랍장 조립하려고 하는데 1시간만 빌려주실 분 찾습니다.',
            type: 'REQUEST',
            tags: '도구, 공유',
            user_name: '뚝딱이',
            user_temperature: 36.5
        }
    ];

    renderPosts(posts);
});

function renderPosts(posts) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-card';
        
        // 온도에 따른 색상 결정
        let tempColor = '#3498db'; // 기본 파란색 (낮은 온도)
        if (post.user_temperature >= 37.5) tempColor = '#f39c12'; // 주황색 (중간)
        if (post.user_temperature >= 40) tempColor = '#e74c3c'; // 빨간색 (높음)

        card.innerHTML = `
            <div class="post-header">
                <span class="user-name">${post.user_name}</span>
                <div class="temp-wrapper">
                    <span class="temp-value" style="color: ${tempColor}">${post.user_temperature}℃</span>
                    <div class="temp-bar-bg">
                        <div class="temp-bar-fill" style="width: ${Math.min(post.user_temperature * 2, 100)}%; background-color: ${tempColor}"></div>
                    </div>
                </div>
            </div>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="tags">
                ${post.tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}
            </div>
            <button class="btn-secondary" style="margin-top: 15px; width: 100%;">참여하기</button>
        `;
        postList.appendChild(card);
    });
}
