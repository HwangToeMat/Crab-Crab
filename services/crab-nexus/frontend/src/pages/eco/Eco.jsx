import React, { useState } from 'react';
import axios from 'axios';
import { Zap, Sun, Battery, Clock, Leaf } from 'lucide-react';
import './Eco.css';

const EcoPage = () => {
    const [hours, setHours] = useState(4);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOptimize = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/eco/optimize?hours=${hours}`);
            setResult(res.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page eco-page">
            <header className="page-header">
                <h2>⚡ Eco-Charge Optimizer</h2>
                <p>친환경 에너지 그리드 최적화 엔진</p>
            </header>

            <section className="input-card">
                <h3>Charging Requirement</h3>
                <div className="input-group">
                    <label>충전 필요 시간 (Hours):</label>
                    <input 
                        type="number" 
                        value={hours} 
                        onChange={(e) => setHours(e.target.value)} 
                        min="1" max="12"
                    />
                    <button onClick={handleOptimize} disabled={loading}>
                        {loading ? 'Optimizing...' : 'Find Best Slot'}
                    </button>
                </div>
            </section>

            {result && (
                <div className="result-container">
                    <div className="best-slot-card">
                        <div className="slot-header">
                            <Leaf color="#48bb78" fill="#48bb78" />
                            <h3>Best Charging Slot Found!</h3>
                        </div>
                        <div className="time-range">
                            <div className="time-box">
                                <span>Start</span>
                                <strong>{new Date(result.bestStartTime).toLocaleTimeString()}</strong>
                            </div>
                            <div className="time-divider">~</div>
                            <div className="time-box">
                                <span>End</span>
                                <strong>{new Date(result.bestEndTime).toLocaleTimeString()}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="metrics-row">
                        <div className="metric">
                            <Sun size={20} color="#f6e05e" />
                            <span>Avg Solar</span>
                            <strong>{result.avgSolar} kW</strong>
                        </div>
                        <div className="metric">
                            <Zap size={20} color="#7F00FF" />
                            <span>Avg Load</span>
                            <strong>{result.avgLoad} kW</strong>
                        </div>
                        <div className="metric">
                            <Battery size={20} color="#48bb78" />
                            <span>Eco Score</span>
                            <strong>{result.avgEcoScore}</strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EcoPage;
