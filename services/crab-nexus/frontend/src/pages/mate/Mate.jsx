import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Send, Coffee, Sun, CloudRain, Wind } from 'lucide-react';
import './Mate.css';

const MatePage = () => {
    const [stats, setStats] = useState({ active_users: 0 });
    const [moodText, setMoodText] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/mate/stats').then(res => setStats(res.data));
    }, []);

    const handleAnalyze = async () => {
        if (!moodText) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/api/v1/mate/mood/analyze', { mood_text: moodText });
            setAnalysis(res.data);
            fetchRecommendations(res.data.moodCategory);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecommendations = async (mood) => {
        const res = await axios.get(`http://localhost:8080/api/v1/mate/activities/recommend?mood=${mood}`);
        setRecommendations(res.data);
    };

    return (
        <div className="page mate-page">
            <header className="page-header">
                <h2>👥 Crab-Mate Social</h2>
                <p>현재 <strong>{stats.active_users}명</strong>의 메이트가 연결되어 있습니다.</p>
            </header>

            <section className="mood-share-box">
                <div className="input-row">
                    <input 
                        type="text" 
                        placeholder="지금 기분이 어떠신가요?" 
                        value={moodText}
                        onChange={(e) => setMoodText(e.target.value)}
                    />
                    <button onClick={handleAnalyze} disabled={loading}>
                        {loading ? '...' : <Send size={18} />}
                    </button>
                </div>
            </section>

            {analysis && (
                <div className="analysis-grid">
                    <div className="analysis-card">
                        <h3>Mood: {analysis.moodCategory}</h3>
                        <p>{analysis.message}</p>
                        <div className="mate-count">
                            <Users size={16} /> 당신과 같은 기분의 메이트 {analysis.same_mood_count}명
                        </div>
                    </div>

                    <div className="cheer-card">
                        <h3>Cheers for You</h3>
                        <ul>
                            {analysis.cheerMessages.map((msg, i) => <li key={i}>✨ {msg}</li>)}
                        </ul>
                    </div>
                </div>
            )}

            {recommendations.length > 0 && (
                <section className="recommendations-section">
                    <h3>Recommended Activities</h3>
                    <div className="rec-grid">
                        {recommendations.map(rec => (
                            <div key={rec.id} className="rec-card">
                                <strong>{rec.title}</strong>
                                <p>{rec.description}</p>
                                <span className="category-tag">{rec.category}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default MatePage;
