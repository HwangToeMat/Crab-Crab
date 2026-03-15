import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, Wind, Waves, Sun, CloudRain } from 'lucide-react';
import './Soul.css';

const SoulPage = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!text) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/api/v1/soul/analyze', { text });
            setResult(res.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page soul-page">
            <header className="page-header">
                <h2>✨ Crab-Soul Care</h2>
                <p>영혼의 평온을 위한 AI 자아 성찰 및 테라피 추천</p>
            </header>

            <section className="input-card">
                <h3>Inner Reflection</h3>
                <p>지금 당신의 마음속 깊은 곳에 있는 문장들을 적어보세요.</p>
                <textarea 
                    placeholder="예: 오늘 하루는 참 평온하고 감사한 일들이 많았어..." 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={handleAnalyze} disabled={loading} className="analyze-btn">
                    {loading ? 'Reflecting...' : 'Analyze My Soul'}
                </button>
            </section>

            {result && (
                <div className="soul-result-grid">
                    <div className="emotion-card">
                        <div className="emotion-header">
                            <span className="emoji">{result.recommendation.emoji}</span>
                            <h3>Detected: {result.emotion}</h3>
                        </div>
                        <div className="confidence">Confidence: {(result.confidence * 100).toFixed(1)}%</div>
                        <p className="coach-msg">{result.aiCoachMsg}</p>
                    </div>

                    <div className="therapy-card">
                        <h3>Recommended Therapy</h3>
                        <div className="therapy-item">
                            <Waves size={20} color="var(--primary)" />
                            <span>Sound: <strong>{result.recommendation.sound}</strong></span>
                        </div>
                        <div className="therapy-item">
                            <Sparkles size={20} color="var(--primary)" />
                            <span>Tip: {result.recommendation.tip}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SoulPage;
