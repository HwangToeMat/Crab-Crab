import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Star, Zap, MessageCircle } from 'lucide-react';
import './God.css';

const God = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/godcrab/status')
      .then(res => setStatus(res.data))
      .catch(err => console.error("God fetch error", err));
  }, []);

  if(!status) return <div className="page">갓생 데이터를 불러오는 중... 🦀</div>;

  return (
    <div className="page god-page">
      <header className="page-header">
        <h2>✨ God-Crab Omniscience</h2>
        <p>당신의 갓생 지표와 AI '크래비'의 지능형 인사이트를 확인하세요.</p>
      </header>

      <div className="status-grid">
        <div className="stat-card">
          <Trophy size={32} color="#f6e05e" />
          <div className="label">Evolution Level</div>
          <div className="value">Lv.{status.level}</div>
        </div>
        <div className="stat-card">
          <Star size={32} color="#7F00FF" />
          <div className="label">Exp Point</div>
          <div className="value">{status.exp} / 100</div>
        </div>
        <div className="stat-card">
          <Zap size={32} color="#f56565" />
          <div className="label">Daily Streak</div>
          <div className="value">{status.streak} Days</div>
        </div>
      </div>

      <div className="ai-insight-box">
        <div className="ai-header">
          <MessageCircle size={24} color="#7F00FF" />
          <h3>Cravie's Divine Insight</h3>
        </div>
        <p className="insight-text">"{status.ai_insight}"</p>
      </div>
    </div>
  );
};

export default God;
