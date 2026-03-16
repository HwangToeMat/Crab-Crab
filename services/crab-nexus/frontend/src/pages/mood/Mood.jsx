import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Smile, Frown, MessageSquare, Award, Heart, Activity } from 'lucide-react';
import './Mood.css';

const MoodPage = () => {
    const [status, setStatus] = useState(null);
    const [note, setNote] = useState('');
    const [report, setReport] = useState(null);
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStatus();
        fetchChallenges();
    }, []);

    const fetchStatus = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/mood/status');
            setStatus(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchChallenges = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/mood/challenges');
            setChallenges(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleAnalyze = async () => {
        if (!note) return;
        setLoading(true);
        setReport(null);
        try {
            const res = await axios.post('http://localhost:8080/api/v1/mood/analyze', { note });
            // AI 응답이 JSON 형식이면 파싱, 아니면 통째로 advice에 저장
            try {
                const text = res.data.report;
                const jsonStart = text.indexOf('{');
                const jsonEnd = text.lastIndexOf('}') + 1;
                if (jsonStart !== -1 && jsonEnd > jsonStart) {
                    const parsed = JSON.parse(text.substring(jsonStart, jsonEnd));
                    setReport(parsed);
                } else {
                    setReport({ mood: "Analyzing", score: 85, advice: text });
                }
            } catch (e) {
                setReport({ mood: "Analyzed", score: 80, advice: res.data.report });
            }
            fetchStatus();
        } finally {
            setLoading(false);
        }
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
                <div className="stat"><span>Weekly Avg</span> <strong>{status.weeklyAverage || 82}%</strong></div>
                <div className="stat"><span>Streak</span> <strong>🔥 3 Days</strong></div>
                <div className="stat"><span>Points</span> <strong>💰 120 CP</strong></div>
                <button className="cheer-btn" onClick={handleCheer}>
                    <Heart size={18} fill="#ff4d4f" color="#ff4d4f" /> Cheer Up!
                </button>
            </div>

            <section className="mood-input-section">
                <h3>How are you feeling today?</h3>
                <textarea 
                    placeholder="오늘의 기분이나 고민을 자유롭게 적어보세요. 무드게 AI가 정밀 분석 리포트를 작성해 드립니다." 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    disabled={loading}
                ></textarea>
                <button onClick={handleAnalyze} className="analyze-btn" disabled={loading || !note}>
                    {loading ? "AI 분석 중..." : "심층 감정 분석 시작"}
                </button>

                {loading && (
                    <div className="ai-loading-container">
                        <div className="ai-pulse-dot"></div>
                        <span className="ai-loading-text">무드게 AI가 당신의 마음을 읽고 있습니다...</span>
                    </div>
                )}

                {report && (
                    <div className="ai-report-container fade-in">
                        <div className="report-header">
                            <div className="mood-badge">{report.mood}</div>
                            <div className="mood-score">마음 건강 지수: <strong>{report.score}%</strong></div>
                        </div>
                        <div className="report-body">
                            <div className="analysis-box">
                                <h4><Activity size={18} /> AI 심층 분석</h4>
                                <p>{report.analysis || "감정의 근원적인 원인을 분석했습니다."}</p>
                            </div>
                            <div className="advice-box">
                                <h4><Heart size={18} /> 맞춤형 힐링 솔루션</h4>
                                <p>{report.advice}</p>
                            </div>
                            {report.challenge && (
                                <div className="special-challenge">
                                    <h4><Award size={18} /> 무드게 추천 미션</h4>
                                    <p>"{report.challenge}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>

            <div className="bottom-grid">
                <section className="challenges-section">
                    <h3>Ongoing Challenges</h3>
                    {challenges.map(c => (
                        <div key={c.id} className={`challenge-card ${c.completed ? 'done' : ''}`}>
                            <Award size={20} color={c.completed ? '#48bb78' : '#7F00FF'} />
                            <span>{c.title}</span>
                            {!c.completed && <span className="reward">+{c.reward}</span>}
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default MoodPage;
