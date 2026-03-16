import React, { useState } from 'react';
import axios from 'axios';
import { Dumbbell, Utensils, Heart, CheckCircle, Activity } from 'lucide-react';
import './Health.css';

const HealthPage = () => {
    const [goal, setGoal] = useState('체력 증진');
    const [routine, setRoutine] = useState(null);
    const [mealText, setMealText] = useState('');
    const [mealAnalysis, setMealAnalysis] = useState(null);
    const [loading, setLoading] = useState({ routine: false, meal: false });

    const fetchRoutine = async () => {
        setLoading({ ...loading, routine: true });
        setRoutine(null);
        try {
            const res = await axios.post('http://localhost:8080/api/v1/health/recommend-routine', { user_goal: goal });
            setRoutine(res.data);
        } finally {
            setLoading({ ...loading, routine: false });
        }
    };

    const analyzeMeal = async () => {
        if (!mealText) return;
        setLoading({ ...loading, meal: true });
        setMealAnalysis(null);
        try {
            const res = await axios.post('http://localhost:8080/api/v1/health/analyze-meal', { meal_text: mealText });
            setMealAnalysis(res.data);
        } finally {
            setLoading({ ...loading, meal: false });
        }
    };

    return (
        <div className="page health-page">
            <header className="page-header">
                <h2>🥗 Crab-Health Coach</h2>
                <p>당신의 신체 진화를 돕는 AI 퍼스널 트레이너</p>
            </header>

            <div className="health-grid">
                <section className="routine-section">
                    <h3><Dumbbell size={20} /> Personal Routine</h3>
                    <div className="input-row">
                        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                            <option>체중 감량</option>
                            <option>근력 향상</option>
                            <option>체력 증진</option>
                        </select>
                        <button onClick={fetchRoutine} disabled={loading.routine}>
                            {loading.routine ? "Planning..." : "Get Routine"}
                        </button>
                    </div>

                    {loading.routine && (
                        <div className="ai-loading-container">
                            <div className="ai-pulse-dot"></div>
                            <span className="ai-loading-text">트레이너가 루틴을 짜고 있습니다...</span>
                        </div>
                    )}

                    {routine && (
                        <div className="routine-result fade-in">
                            <ul>
                                {routine.recommendedRoutine.map((r, i) => (
                                    <li key={i}><CheckCircle size={16} color="var(--primary)" /> {r}</li>
                                ))}
                            </ul>
                            <div className="crab-advice">
                                <strong>Coach's Message:</strong>
                                <p>{routine.crabAdvice}</p>
                            </div>
                        </div>
                    )}
                </section>

                <section className="meal-section">
                    <h3><Utensils size={20} /> Smart Meal Analysis</h3>
                    <textarea 
                        placeholder="오늘 드신 식단을 입력하세요 (예: 닭가슴살 샐러드와 고구마)" 
                        value={mealText}
                        onChange={(e) => setMealText(e.target.value)}
                        disabled={loading.meal}
                    ></textarea>
                    <button onClick={analyzeMeal} disabled={loading.meal || !mealText}>
                        {loading.meal ? "Analyzing..." : "Analyze Meal"}
                    </button>

                    {loading.meal && (
                        <div className="ai-loading-container">
                            <div className="ai-pulse-dot"></div>
                            <span className="ai-loading-text">영양사가 식단을 분석 중입니다...</span>
                        </div>
                    )}

                    {mealAnalysis && (
                        <div className="meal-result fade-in">
                            <div className="score-row">
                                <span>Nutrition Score:</span>
                                <strong>{mealAnalysis.healthScore} / 100</strong>
                            </div>
                            <div className="feedback-box">
                                <p>{mealAnalysis.feedback}</p>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default HealthPage;
