import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, TrendingDown, MessageCircle, BarChart2, Globe } from 'lucide-react';
import './Crypto.css';

const CryptoPage = () => {
    const [text, setText] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [pulse, setPulse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/crypto/market-pulse').then(res => setPulse(res.data));
    }, []);

    const handleAnalyze = async () => {
        if (!text) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/api/v1/crypto/analyze', { text });
            setAnalysis(res.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page crypto-page">
            <header className="page-header">
                <h2>📈 SentiCrypto Analyzer</h2>
                <p>AI 기반 암호화폐 시장 감성 분석 및 트렌드 추적</p>
            </header>

            {pulse && (
                <div className="pulse-banner">
                    <div className="pulse-item">
                        <span>Fear & Greed Index</span>
                        <strong>{pulse.fear_greed_index} / 100</strong>
                    </div>
                    <div className="pulse-item">
                        <span>Market Sentiment</span>
                        <strong className={pulse.overall_sentiment.toLowerCase()}>{pulse.overall_sentiment}</strong>
                    </div>
                    <div className="pulse-item">
                        <span>Trending</span>
                        <div className="coins">{pulse.trending_coins.map(c => <span key={c} className="coin-tag">{c}</span>)}</div>
                    </div>
                </div>
            )}

            <section className="analyze-card">
                <h3><MessageCircle size={20} /> Social Sentiment Scan</h3>
                <textarea 
                    placeholder="분석할 트윗이나 커뮤니티 글을 입력하세요 (영문 중심)..." 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button onClick={handleAnalyze} disabled={loading}>
                    {loading ? 'Analyzing...' : 'Analyze Sentiment'}
                </button>

                {analysis && (
                    <div className={`analysis-result ${analysis.status}`}>
                        <div className="score-row">
                            <div className="score-box">
                                <span>Polarity Score</span>
                                <strong>{analysis.score}</strong>
                            </div>
                            <div className="sentiment-icon">
                                {analysis.status === 'positive' ? <TrendingUp color="#48bb78" size={40} /> : 
                                 analysis.status === 'negative' ? <TrendingDown color="#f56565" size={40} /> : 
                                 <BarChart2 color="#a0aec0" size={40} />}
                            </div>
                        </div>
                        <p>Status: <strong>{analysis.status.toUpperCase()}</strong></p>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ 
                                width: `${(analysis.score + 1) * 50}%`,
                                background: analysis.status === 'positive' ? '#48bb78' : analysis.status === 'negative' ? '#f56565' : '#a0aec0'
                            }}></div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default CryptoPage;
