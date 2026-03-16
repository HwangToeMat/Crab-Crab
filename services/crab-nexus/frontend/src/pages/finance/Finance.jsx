import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wallet, PieChart, Tag, CreditCard, ArrowUpRight } from 'lucide-react';
import './Finance.css';

const FinancePage = () => {
    const [stats, setStats] = useState([]);
    const [text, setText] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/finance/stats').then(res => setStats(res.data));
    }, []);

    const handleClassify = async () => {
        if (!text) return;
        setLoading(true);
        setAnalysis(null);
        try {
            const res = await axios.post('http://localhost:8080/api/v1/finance/classify', { text });
            setAnalysis(res.data);
        } finally {
            setLoading(false);
        }
    };

    const totalAmount = stats.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="page finance-page">
            <header className="page-header">
                <h2>💰 Crab-Finance Insights</h2>
                <p>AI 기반 스마트 지출 분석 및 자산 관리</p>
            </header>

            <div className="total-balance-card">
                <div className="balance-info">
                    <span>Total Monthly Spending</span>
                    <h3>₩{totalAmount.toLocaleString()}</h3>
                </div>
                <ArrowUpRight size={40} color="white" opacity={0.3} />
            </div>

            <div className="main-grid">
                <section className="classify-section">
                    <h3>Smart Classification</h3>
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="내역을 입력하세요 (예: 스타벅스 아메리카노)" 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button onClick={handleClassify} disabled={loading}>
                            {loading ? "Analyzing..." : "Classify"}
                        </button>
                    </div>

                    {loading && (
                        <div className="ai-loading-container">
                            <div className="ai-pulse-dot"></div>
                            <span className="ai-loading-text">꽃게 AI가 분석 중...</span>
                        </div>
                    )}

                    {analysis && (
                        <div className="analysis-result-container">
                            <div className="analysis-result">
                                <Tag size={18} /> Category: <strong>{analysis.category}</strong>
                            </div>
                            <div className="ai-advice-box">
                                <h4>Crab's Financial Advice</h4>
                                <p>{analysis.aiAdvice}</p>
                            </div>
                        </div>
                    )}
                </section>

                <section className="stats-section">
                    <h3>Category Breakdown</h3>
                    <div className="stats-list">
                        {stats.map((s, i) => (
                            <div key={i} className="stat-item">
                                <div className="stat-label">
                                    <span>{s.category}</span>
                                    <span>₩{s.amount.toLocaleString()}</span>
                                </div>
                                <div className="stat-bar-bg">
                                    <div className="stat-bar-fill" style={{ width: `${(s.amount/600000)*100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FinancePage;
