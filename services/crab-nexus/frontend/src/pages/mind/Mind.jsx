import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Coffee, BookOpen, Quote, Cloud } from 'lucide-react';
import './Mind.css';

const MindPage = () => {
    const [mood, setMood] = useState('Neutral');
    const [content, setContent] = useState('');
    const [advice, setAdvice] = useState(null);
    const [quote, setQuote] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/mind/quotes').then(res => setQuote(res.data.quote));
    }, []);

    const handleSubmit = async () => {
        if (!content) return;
        const res = await axios.post('http://localhost:8080/api/v1/mind/journal', { mood, content });
        setAdvice(res.data);
    };

    return (
        <div className="page mind-page">
            <header className="page-header">
                <h2>🧠 Crab-Mind Wellness</h2>
                <p>당신의 마음을 진단하고 위로하는 지능형 멘탈 케어</p>
            </header>

            <div className="quote-card">
                <Quote size={24} color="var(--primary)" />
                <p>{quote}</p>
            </div>

            <div className="mind-container">
                <section className="journal-section">
                    <h3>Mindful Journal</h3>
                    <div className="mood-selector">
                        {['Happy', 'Neutral', 'Sad', 'Anxious', 'Angry'].map(m => (
                            <button key={m} className={mood === m ? 'active' : ''} onClick={() => setMood(m)}>{m}</button>
                        ))}
                    </div>
                    <textarea 
                        placeholder="지금 마음속에 있는 생각들을 자유롭게 털어놓으세요..." 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button className="submit-btn" onClick={handleSubmit}>Share with Crab</button>
                </section>

                {advice && (
                    <section className="advice-section">
                        <div className="advice-header">
                            <Heart size={20} fill="#ff4d4f" color="#ff4d4f" />
                            <h3>Message from Crab-Mind</h3>
                        </div>
                        <p>{advice.advice}</p>
                        <div className="empathy-score">
                            <span>Empathy Match:</span>
                            <strong>{advice.empathyScore}%</strong>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default MindPage;
