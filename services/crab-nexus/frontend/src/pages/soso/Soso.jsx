import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, MessageCircle, Send, Sparkles, Smile } from 'lucide-react';
import './Soso.css';

const SosoPage = () => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [mood, setMood] = useState('happy');

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/soso/posts');
        setPosts(res.data);
    };

    const handlePost = async () => {
        if (!content) return;
        await axios.post('http://localhost:8080/api/v1/soso/posts', { content, mood });
        setContent('');
        fetchPosts();
    };

    useEffect(() => { fetchPosts(); }, []);

    return (
        <div className="page soso-page">
            <header className="page-header">
                <h2>🍀 Soso-Haeng Feed</h2>
                <p>작지만 확실한 행복, 꽃게팀 메이트들과 함께 나누어요.</p>
            </header>

            <section className="write-section">
                <textarea 
                    placeholder="당신을 미소 짓게 한 오늘의 소소행은 무엇인가요?" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="write-footer">
                    <select value={mood} onChange={(e) => setMood(e.target.value)}>
                        <option value="happy">😊 기쁨</option>
                        <option value="calm">🌊 평온</option>
                        <option value="grateful">💚 감사</option>
                        <option value="excited">✨ 설렘</option>
                    </select>
                    <button onClick={handlePost} className="post-btn"><Send size={18} /> 공유하기</button>
                </div>
            </section>

            <div className="feed-list">
                {posts.map(p => (
                    <div key={p.id} className="soso-card" style={{ borderLeftColor: p.analysis.color }}>
                        <div className="card-header">
                            <strong>{p.nickname}</strong>
                            <span className="time">{new Date(p.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <p className="post-content">{p.content}</p>
                        <div className="card-footer">
                            <div className="analysis-tag">
                                <Sparkles size={14} /> {p.analysis.message}
                            </div>
                            <button className="like-btn"><Heart size={16} /> {p.likes}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SosoPage;
