import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Share2, Link as LinkIcon, MessageSquare, Compass, Heart } from 'lucide-react';
import './Link.css';

const LinkPage = () => {
    const [recs, setRecs] = useState([]);
    const [posts, setPosts] = useState([]);
    const [chatMsg, setChatMsg] = useState('');
    const [reply, setReply] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/link/recommendations').then(res => setRecs(res.data));
        axios.get('http://localhost:8080/api/v1/link/posts').then(res => setPosts(res.data));
    }, []);

    const handleChat = async () => {
        const res = await axios.post('http://localhost:8080/api/v1/link/chat', { message: chatMsg });
        setReply(res.data.reply);
    };

    return (
        <div className="page link-page">
            <header className="page-header">
                <h2>🌐 Crab-Crab Link</h2>
                <p>서비스 간 데이터 연동 및 지역 공동체 지능형 네트워크</p>
            </header>

            <div className="link-grid">
                <section className="recommendation-section">
                    <h3><Compass size={20} /> AI Smart Matching</h3>
                    <div className="rec-list">
                        {recs.map(r => (
                            <div key={r.id} className="rec-item">
                                <strong>{r.title}</strong>
                                <p>{r.reason}</p>
                                <span className="badge">{r.category}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="link-chat-section">
                    <h3>Nexus Link Assistant</h3>
                    <div className="assistant-box">
                        <input 
                            placeholder="연결하고 싶은 정보를 물어보세요..." 
                            value={chatMsg}
                            onChange={(e) => setChatMsg(e.target.value)}
                        />
                        <button onClick={handleChat}><MessageSquare size={18} /></button>
                    </div>
                    {reply && <div className="reply-bubble">{reply}</div>}
                </section>
            </div>

            <section className="posts-section">
                <h3><Share2 size={20} /> Community Feed</h3>
                <div className="posts-list">
                    {posts.map(p => (
                        <div key={p.id} className="post-card">
                            <div className="post-header">
                                <strong>{p.title}</strong>
                                <span>by {p.author}</span>
                            </div>
                            <div className="post-footer">
                                <Heart size={16} /> {p.likes}
                                <LinkIcon size={16} /> Link Connected
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LinkPage;
