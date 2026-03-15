import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Smile, Frown, MessageSquare, Award, Heart } from 'lucide-react';
import './Mood.css';

const MoodPage = () => {
    const [status, setStatus] = useState(null);
    const [note, setNote] = useState('');
    const [advice, setAdvice] = useState('');
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        fetchStatus();
        fetchChallenges();
    }, []);

    const fetchStatus = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/mood/status');
        setStatus(res.data);
    };

    const fetchChallenges = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/mood/challenges');
        setChallenges(res.data);
    };

    const handleAnalyze = async () => {
        const res = await axios.post('http://localhost:8080/api/v1/mood/analyze', { note });
        setAdvice(res.data.advice);
        fetchStatus();
    };

    const handleCheer = async () => {
        await axios.post('http://localhost:8080/api/v1/mood/cheer');
        fetchStatus();
    };

    if (!status) return <div className="page">감정 주파수 맞추는 중... 🦀</div>;

    return (
        <div className="page mood-page">
            <header className="page-header">
                <h2>😊 Mood-Ge Emotional Care</h2>
                <p>당신의 마음을 진화시키는 힐링 스테이션</p>
            </header>

            <div className="status-banner">
                <div className="stat"><span>Burnout</span> <strong>{status.burnoutScore}%</strong></div>
                <div className="stat"><span>Streak</span> <strong>🔥 {status.streak}</strong></div>
                <div className="stat"><span>Points</span> <strong>💰 {status.points}</strong></div>
                <button className="cheer-btn" onClick={handleCheer}>
                    <Heart size={18} fill="#ff4d4f" color="#ff4d4f" /> {status.cheers}
                </button>
            </div>

            <section className="mood-input-section">
                <h3>How are you feeling today?</h3>
                <textarea 
                    placeholder="오늘의 기분을 자유롭게 적어보세요..." 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <button onClick={handleAnalyze} className="analyze-btn">AI 감정 분석</button>
                {advice && <div className="ai-advice-bubble">{advice}</div>}
            </section>

            <div className="bottom-grid">
                <section className="challenges-section">
                    <h3>Healing Challenges</h3>
                    {challenges.map(c => (
                        <div key={c.id} className={`challenge-card ${c.completed ? 'done' : ''}`}>
                            <Award size={20} color={c.completed ? '#48bb78' : '#7F00FF'} />
                            <span>{c.title}</span>
                            {!c.completed && <span className="reward">+{c.reward} CP</span>}
                        </div>
                    ))}
                </section>

                <section className="ambassador-section">
                    <h3>Mindfulness Ambassadors</h3>
                    {status.ambassadors.map(a => (
                        <div key={a.id} className="ambassador-card">
                            <strong>{a.name}</strong>
                            <p>{a.motto}</p>
                            <span className="track-badge">{a.track}</span>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default MoodPage;
