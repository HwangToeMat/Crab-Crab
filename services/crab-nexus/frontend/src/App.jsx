import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Briefcase, Trophy, Shield, Settings } from 'lucide-react';
import './App.css';

// 임시 컴포넌트들
const Dashboard = () => (
  <div className="page">
    <h2>🦀 Crab-Nexus Dashboard</h2>
    <div className="grid">
      <div className="card"><h3>Work-Crab</h3><p>생산성 관리</p></div>
      <div className="card"><h3>God-Crab</h3><p>갓생 챌린지</p></div>
      <div className="card"><h3>Crab-Shield</h3><p>보안 센터</p></div>
    </div>
  </div>
);

const WorkCrab = () => <div className="page"><h2>💼 Work-Crab Service</h2><p>준비 중...</p></div>;
const GodCrab = () => <div className="page"><h2>🏆 God-Crab Service</h2><p>준비 중...</p></div>;

function App() {
  return (
    <Router>
      <div className="nexus-layout">
        <aside className="sidebar">
          <div className="logo">CRAB TEAM ♾️</div>
          <nav>
            <Link to="/"><Home size={20} /> Dashboard</Link>
            <Link to="/work-crab"><Briefcase size={20} /> Work-Crab</Link>
            <Link to="/god-crab"><Trophy size={20} /> God-Crab</Link>
            <Link to="/shield"><Shield size={20} /> Shield</Link>
          </nav>
          <div className="footer-nav">
            <Link to="/settings"><Settings size={20} /> Settings</Link>
          </div>
        </aside>

        <main className="content">
          <header className="nexus-header">
            <div className="user-info">Welcome, <strong>Infinite Crab</strong> 🦀</div>
          </header>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/work-crab" element={<WorkCrab />} />
            <Route path="/god-crab" element={<GodCrab />} />
            <Route path="/shield" element={<div>Shield Service</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
