import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Moon, Sun, Music, History, Sparkles } from 'lucide-react';
import './Dream.css';

const DreamPage = () => {
    const [duration, setDuration] = useState(7);
    const [quality, setQuality] = useState(5);
    const [note, setNote] = useState('');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/dream/history');
        setHistory(res.data.history);
    };

    const handleLog = async () => {
        const res = await axios.post('http://localhost:8080/api/v1/dream/log', { duration, quality, note });
        setResult(res.data);
        fetchHistory();
    };

    useEffect(() => { fetchHistory(); }, []);

    return (
        <div className="page dream-page">
            <header className="page-header">
                <h2>💤 Crab-Deep Dream</h2>
                <p>AI 기반 수면 분석 및 드림 코칭 시스템</p>
            </header>

            <div className="dream-grid">
                <section className="log-section">
                    <h3>Record Sleep</h3>
                    <div className="input-group">
                        <label>Sleep Duration (Hours): {duration}h</label>
                        <input type="range" min="1" max="12" step="0.5" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Sleep Quality (1-10): {quality}</label>
                        <input type="range" min="1" max="10" value={quality} onChange={(e) => setQuality(e.target.value)} />
                    </div>
                    <textarea placeholder="꿈의 내용이나 수면 전 상태를 적어주세요..." value={note} onChange={(e) => setNote(e.target.value)} />
                    <button onClick={handleLog}>Log Sleep & Analyze</button>

                    {result && (
                        <div className="analysis-result">
                            <div className="analysis-item">
                                <Sparkles size={18} color="#7F00FF" />
                                <strong>AI Analysis:</strong> {result.aiAnalysis}
                            </div>
                            <div className="analysis-item">
                                <Music size={18} color="#7F00FF" />
                                <strong>Recommended Sound:</strong> {result.soundTip}
                            </div>
                        </div>
                    )}
                </section>

                <section className="history-section">
                    <h3><History size={20} /> Recent Sleep History</h3>
                    <div className="history-list">
                        {history.map((h, i) => (
                            <div key={i} className="history-card">
                                <div className="hist-header">
                                    <span>{h.duration}h Sleep</span>
                                    <span className="q-badge">Quality: {h.quality}</span>
                                </div>
                                <p>{h.analysis}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DreamPage;
