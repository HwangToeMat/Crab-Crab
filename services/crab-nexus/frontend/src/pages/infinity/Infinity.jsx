import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Brain, ShieldCheck, Activity } from 'lucide-react';
import './Infinity.css';

const InfinityPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/infinity/analysis')
            .then(res => setData(res.data))
            .catch(err => console.error("Infinity fetch error", err));
    }, []);

    if (!data) return <div className="page">지능형 생태계 분석 중... 🦀</div>;

    return (
        <div className="page infinity-page">
            <header className="page-header">
                <h2>♾️ Crab-Infinity Nexus</h2>
                <p>생태계 통합 지능 및 분석 엔진</p>
            </header>

            <div className="metrics-grid">
                <div className="metric-card">
                    <Activity size={24} color="#7F00FF" />
                    <div className="label">Integration</div>
                    <div className="value">{data.metrics.integration_rate}%</div>
                </div>
                <div className="metric-card">
                    <Brain size={24} color="#7F00FF" />
                    <div className="label">Intelligence</div>
                    <div className="value">{data.metrics.ai_intelligence_index}</div>
                </div>
                <div className="metric-card">
                    <ShieldCheck size={24} color="#7F00FF" />
                    <div className="label">Security Score</div>
                    <div className="value">{data.metrics.security_trust_score}</div>
                </div>
            </div>

            <section className="analysis-box">
                <h3>AI Ecosystem Analysis</h3>
                <p>{data.analysis}</p>
            </section>

            <section className="recommendations">
                <h3>Infinite Strategy Recommendations</h3>
                <ul>
                    {data.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default InfinityPage;
