const axios = require('axios');

async function runTest() {
  const baseUrl = 'http://localhost:4000/api';
  console.log('--- Starting QA Test for Soso-Haeng ---');

  try {
    // 1. Test Post Creation
    console.log('Testing Post Creation...');
    const postRes = await axios.post(`${baseUrl}/posts`, {
      content: '오늘 날씨가 너무 좋아서 산책했어요! #소소행',
      authorId: 'test-user-1'
    });
    const postId = postRes.data.id;
    console.log('Post Created:', postId);

    // 2. Test Home Feed
    console.log('Testing Home Feed...');
    const feedRes = await axios.get(`${baseUrl}/posts`);
    const found = feedRes.data.find(p => p.id === postId);
    if (found) {
      console.log('✅ Post found in feed.');
    } else {
      console.error('❌ Post NOT found in feed.');
    }

    // 3. Test Chat Matching
    console.log('Testing Chat Matching...');
    // User 1 requests match
    const match1 = await axios.post(`${baseUrl}/chat/match`, { postId, userId: 'test-user-1' });
    console.log('User 1 match status:', match1.data.message || 'Matched!');

    // User 2 requests match
    const match2 = await axios.post(`${baseUrl}/chat/match`, { postId, userId: 'test-user-2' });
    if (match2.data.matched) {
      console.log('✅ Match successful! SessionId:', match2.data.sessionId);
    } else {
      console.error('❌ Match failed.');
    }

    console.log('--- QA Test Completed Successfully ---');
  } catch (err) {
    console.error('QA Test Failed:', err.message);
    console.log('Note: Ensure the backend server and Redis are running.');
  }
}

runTest();
