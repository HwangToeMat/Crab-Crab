import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Briefcase, Trophy, Shield, Users, Smile, Zap, Settings, LayoutDashboard, Infinity, Wallet, Activity, TrendingUp, Heart, Share2, Moon, Brain, Search, Eye, Sparkles, Sun, Smile as SosoIcon } from 'lucide-react';
import axios from 'axios';
import './App.css';

// 서비스 페이지 임포트
import InfinityPage from './pages/infinity/Infinity';
import ShieldPage from './pages/shield/Shield';
import MoodPage from './pages/mood/Mood';
import MatePage from './pages/mate/Mate';
import FinancePage from './pages/finance/Finance';
import HealthPage from './pages/health/Health';
import EcoPage from './pages/eco/Eco';
import CryptoPage from './pages/crypto/Crypto';
import CarePage from './pages/care/Care';
import LinkPage from './pages/link/Link';
import DreamPage from './pages/dream/Dream';
import MindPage from './pages/mind/Mind';
import ScanPage from './pages/scan/Scan';
import SentinelPage from './pages/sentinel/Sentinel';
import SoulPage from './pages/soul/Soul';
import NuriPage from './pages/nuri/Nuri';
import SosoPage from './pages/soso/Soso';

// Icon Map for dynamic icons
const IconMap = {
  Briefcase: Briefcase,
  Trophy: Trophy,
  Shield: Shield,
  Users: Users,
  Smile: Smile,
  Zap: Zap,
  Infinity: Infinity,
  Wallet: Wallet,
  Activity: Activity,
  TrendingUp: TrendingUp,
  Heart: Heart,
  Share2: Share2,
  Moon: Moon,
  Brain: Brain,
  Search: Search,
  Eye: Eye,
  Sparkles: Sparkles,
  Sun: Sun,
  Soso: SosoIcon
};

const Dashboard = ({ services }) => (
  <div className="page">
    <h2>🦀 Crab-Nexus Dashboard</h2>
    <p>꽃게팀의 모든 지능형 서비스가 통합된 중앙 관제소입니다.</p>
    <div className="grid">
      {services.map(s => (
        <Link to={`/${s.id}`} key={s.id} className="card-link">
          <div className="card">
            <div className="card-header">
              {IconMap[s.icon] && React.createElement(IconMap[s.icon], { size: 24, color: '#7F00FF' })}
              <h3>{s.name}</h3>
            </div>
            <p>{s.description}</p>
            <span className={`status-badge ${s.status.toLowerCase()}`}>{s.status}</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const PlaceholderService = ({ name }) => (
  <div className="page">
    <h2>{name} Service</h2>
    <div className="maintenance-box">
      <p>현재 <strong>Spring Boot + React</strong> 표준 아키텍처로 리팩터링 및 마이그레이션 중입니다.</p>
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: '45%' }}></div>
      </div>
    </div>
  </div>
);

function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/nexus/services')
      .then(res => setServices(res.data))
      .catch(err => console.error("Service fetch error", err));
  }, []);

  return (
    <Router>
      <div className="nexus-layout">
        <aside className="sidebar">
          <div className="logo">CRAB NEXUS ♾️</div>
          <nav>
            <Link to="/"><LayoutDashboard size={20} /> Dashboard</Link>
            <hr />
            {services.map(s => (
              <Link key={s.id} to={`/${s.id}`}>
                {IconMap[s.icon] && React.createElement(IconMap[s.icon], { size: 18 })}
                {s.name}
              </Link>
            ))}
          </nav>
          <div className="footer-nav">
            <Link to="/settings"><Settings size={20} /> Settings</Link>
          </div>
        </aside>

        <main className="content">
          <header className="nexus-header">
            <div className="header-left">CrabTeam Evolution v2.0</div>
            <div className="user-info">Welcome, <strong>Infinite Crab</strong> 🦀</div>
          </header>
          <Routes>
            <Route path="/" element={<Dashboard services={services} />} />
            <Route path="/crab-infinity" element={<InfinityPage />} />
            <Route path="/crab-shield" element={<ShieldPage />} />
            <Route path="/mood-ge" element={<MoodPage />} />
            <Route path="/crab-mate" element={<MatePage />} />
            <Route path="/crab-finance" element={<FinancePage />} />
            <Route path="/crab-health" element={<HealthPage />} />
            <Route path="/eco-charge-optimizer" element={<EcoPage />} />
            <Route path="/senticrypto-analyzer" element={<CryptoPage />} />
            <Route path="/crab-crab-care" element={<CarePage />} />
            <Route path="/crab-crab-link" element={<LinkPage />} />
            <Route path="/crab-deep-dream" element={<DreamPage />} />
            <Route path="/crab-mind" element={<MindPage />} />
            <Route path="/crab-scan" element={<ScanPage />} />
            <Route path="/crab-sentinel" element={<SentinelPage />} />
            <Route path="/crab-soul-care" element={<SoulPage />} />
            <Route path="/nuri-bom" element={<NuriPage />} />
            <Route path="/soso-haeng" element={<SosoPage />} />
            {services.filter(s => !['crab-infinity', 'crab-shield', 'mood-ge', 'crab-mate', 'crab-finance', 'crab-health', 'eco-charge-optimizer', 'senticrypto-analyzer', 'crab-crab-care', 'crab-crab-link', 'crab-deep-dream', 'crab-mind', 'crab-scan', 'crab-sentinel', 'crab-soul-care', 'nuri-bom', 'soso-haeng'].includes(s.id)).map(s => (
              <Route key={s.id} path={`/${s.id}`} element={<PlaceholderService name={s.name} />} />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
