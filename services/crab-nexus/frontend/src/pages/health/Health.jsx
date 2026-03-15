import React, { useState } from 'react';
import axios from 'axios';
import { Dumbbell, Utensils, Heart, CheckCircle, Activity } from 'lucide-react';
import './Health.css';

const HealthPage = () => {
    const [goal, setGoal] = useState('체력 증진');
    const [routine, setRoutine] = useState(null);
    const [mealText, setMealText] = useState('');
    const [mealAnalysis, setMealAnalysis] = useState(null);

    const fetchRoutine = async () => {
        const res = await axios.post('http://localhost:8080/api/v1/health/recommend-routine', { user_goal: goal });
        setRoutine(res.data);
    };

    const analyzeMeal = async () => {
        if (!mealText) return;
        const res = await axios.post('http://localhost:8080/api/v1/health/analyze-meal', { meal_text: mealText });
        setMealAnalysis(res.data);
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
                        <button onClick={fetchRoutine}>Get Routine</button>
                    </div>
                    {routine && (
                        <div className="routine-result">
                            <ul>
                                {routine.recommendedRoutine.map((r, i) => (
                                    <li key={i}><CheckCircle size={16} color="#48bb78" /> {r}</li>
                                ))}
                            </ul>
                            <div className="crab-advice">
                                <strong>Crab's Advice:</strong> {routine.crabAdvice}
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
                    ></textarea>
                    <button onClick={analyzeMeal}>Analyze Meal</button>
                    {mealAnalysis && (
                        <div className="meal-result">
                            <div className="score-row">
                                <span>Health Score:</span>
                                <strong>{mealAnalysis.healthScore} / 100</strong>
                            </div>
                            <p>{mealAnalysis.feedback}</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default HealthPage;
