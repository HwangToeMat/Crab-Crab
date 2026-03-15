import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, Receipt, TrendingDown, Target, List } from 'lucide-react';
import './Scan.css';

const ScanPage = () => {
    const [status, setStatus] = useState(null);
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [essential, setEssential] = useState(true);
    const [advice, setAdvice] = useState(null);

    const fetchStatus = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/scan/status');
        setStatus(res.data);
    };

    const handleAnalyze = async () => {
        if (!itemName || !price) return;
        const res = await axios.post('http://localhost:8080/api/v1/scan/analyze', { 
            itemName, 
            price: parseInt(price), 
            essential 
        });
        setAdvice(res.data);
        fetchStatus();
    };

    useEffect(() => { fetchStatus(); }, []);

    if (!status) return <div className="page">지갑 스캔 중... 🦀</div>;

    return (
        <div className="page scan-page">
            <header className="page-header">
                <h2>🔍 Crab-Scan Financials</h2>
                <p>AI 기반 지출 패턴 스캔 및 절약 코칭</p>
            </header>

            <div className="status-grid">
                <div className="status-card">
                    <TrendingDown size={24} color="#7F00FF" />
                    <span>Saving Score</span>
                    <strong>{status.savingScore}</strong>
                </div>
                <div className="status-card">
                    <Receipt size={24} color="#7F00FF" />
                    <span>Total Spent</span>
                    <strong>₩{status.totalSpent.toLocaleString()}</strong>
                </div>
                <div className="status-card">
                    <Target size={24} color="#7F00FF" />
                    <span>Streak</span>
                    <strong>🔥 {status.streak}</strong>
                </div>
            </div>

            <div className="main-container">
                <section className="input-section">
                    <h3>Scan New Expense</h3>
                    <div className="form-group">
                        <input placeholder="항목 (예: 스타벅스)" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        <input type="number" placeholder="금액" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <label className="toggle">
                            <input type="checkbox" checked={essential} onChange={(e) => setEssential(e.target.checked)} />
                            <span>필수 지출 여부</span>
                        </label>
                        <button onClick={handleAnalyze} className="scan-btn"><Camera size={18} /> Deep Scan</button>
                    </div>
                    {advice && (
                        <div className={`advice-box ${advice.status.toLowerCase()}`}>
                            {advice.advice}
                        </div>
                    )}
                </section>

                <section className="ranking-section">
                    <h3><List size={20} /> Saving Ranking</h3>
                    <div className="ranking-list">
                        {status.rankings.map((r, i) => (
                            <div key={i} className={`ranking-item ${r.name.includes('나') ? 'me' : ''}`}>
                                <span className="rank">#{i+1}</span>
                                <span className="name">{r.name}</span>
                                <span className="score">{r.score}pt</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ScanPage;
