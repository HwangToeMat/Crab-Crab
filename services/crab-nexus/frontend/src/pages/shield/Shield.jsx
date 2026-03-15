import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, ShieldAlert, Search, AlertTriangle } from 'lucide-react';
import './Shield.css';

const ShieldPage = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!text) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/api/v1/shield/analyze', { text });
            setResult(res.data);
        } catch (err) {
            console.error("Shield analysis error", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page shield-page">
            <header className="page-header">
                <h2>🛡️ Crab-Shield Security</h2>
                <p>AI 기반 메시지 및 취약점 분석 센터</p>
            </header>

            <div className="search-box">
                <textarea 
                    placeholder="분석할 메시지나 URL을 입력하세요..." 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button onClick={handleAnalyze} disabled={loading}>
                    {loading ? 'Analyzing...' : <><Search size={18} /> Deep Scan</>}
                </button>
            </div>

            {result && (
                <div className={`result-box ${result.safe ? 'safe' : 'danger'}`}>
                    <div className="result-header">
                        {result.safe ? <ShieldCheck size={32} color="#48bb78" /> : <ShieldAlert size={32} color="#f56565" />}
                        <h3>{result.message}</h3>
                    </div>
                    
                    <div className="risk-score">
                        <span>Risk Score:</span>
                        <strong>{result.score}/100</strong>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${result.score}%`, background: result.safe ? '#48bb78' : '#f56565' }}></div>
                        </div>
                    </div>

                    <div className="insight-section">
                        <p><strong>Intent:</strong> {result.intent}</p>
                        <p><strong>AI Insight:</strong> {result.aiInsight}</p>
                        <div className="action-guide">
                            <AlertTriangle size={18} /> <strong>Action:</strong> {result.actionPlan}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShieldPage;
