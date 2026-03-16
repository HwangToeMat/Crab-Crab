import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Camera, Activity, AlertCircle, Send } from 'lucide-react';
import './Care.css';

const CarePage = () => {
    const [health, setHealth] = useState(null);
    const [msg, setMsg] = useState('');
    const [chat, setChat] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/care/health-status/user123').then(res => setHealth(res.data));
        axios.get('http://localhost:8080/api/v1/care/alerts').then(res => setAlerts(res.data));
    }, []);

    const handleSend = async () => {
        if (!msg) return;
        const newMsg = { role: 'user', text: msg };
        setChat([...chat, newMsg]);
        setMsg('');
        setIsTyping(true);

        try {
            const res = await axios.post('http://localhost:8080/api/v1/care/chat', { message: msg });
            setChat(prev => [...prev, { role: 'bot', text: res.data.response }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="page care-page">
            <header className="page-header">
                <h2>🏥 Crab-Crab Care</h2>
                <p>실시간 AI 비전 및 신체 데이터 케어 센터</p>
            </header>

            <div className="care-grid">
                <div className="left-panel">
                    <section className="status-card">
                        <h3><Activity size={20} /> Current Health</h3>
                        {health && (
                            <div className="health-stats">
                                <div className="stat"><span>Heart Rate</span> <strong>{health.heartRate} bpm</strong></div>
                                <div className="stat"><span>Daily Steps</span> <strong>{health.steps}</strong></div>
                                <div className="stat"><span>Vision AI</span> <strong className="safe">{health.visionStatus}</strong></div>
                            </div>
                        )}
                    </section>

                    <section className="alerts-section">
                        <h3><AlertCircle size={20} /> Active Alerts</h3>
                        {alerts.map((a, i) => (
                            <div key={i} className={`alert-item ${a.urgent ? 'urgent' : ''}`}>
                                {a.message}
                            </div>
                        ))}
                    </section>
                </div>

                <div className="right-panel">
                    <section className="chat-section">
                        <h3>AI Care Companion</h3>
                        <div className="chat-window">
                            {chat.map((c, i) => (
                                <div key={i} className={`chat-bubble ${c.role}`}>
                                    {c.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="typing-indicator">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                            )}
                        </div>
                        <div className="chat-input">
                            <input 
                                type="text" 
                                placeholder="무엇이든 물어보세요..." 
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                disabled={isTyping}
                            />
                            <button onClick={handleSend} disabled={isTyping}><Send size={18} /></button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CarePage;
