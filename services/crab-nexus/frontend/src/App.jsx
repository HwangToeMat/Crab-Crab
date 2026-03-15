import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Home, Briefcase, Trophy, Shield, Users, Smile, Zap, Settings, LayoutDashboard, 
  Infinity, Wallet, Activity, TrendingUp, Heart, Share2, Moon, Brain, Search, 
  Eye, Sparkles, Sun, Smile as SosoIcon, AlertTriangle, ShieldCheck, ZapOff,
  Coins, MessageSquare, Send, Plus, MapPin, ThumbsUp, Quote, PenTool, 
  Scan, BarChart3, Lock, Thermometer, UserCheck, Stethoscope
} from 'lucide-react';
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
import EvolutionPage from './pages/evolution/Evolution';
import WorkPage from './pages/work/Work';
import GodPage from './pages/god/God';

const IconMap = {
  'infinity': Infinity,
  'shield': Shield,
  'mood': Smile,
  'mate': Users,
  'finance': Wallet,
  'health': Activity,
  'eco': Zap,
  'crypto': TrendingUp,
  'care': Heart,
  'link': Share2,
  'dream': Moon,
  'mind': Brain,
  'scan': Search,
  'sentinel': Eye,
  'soul': Sparkles,
  'nuri': Sun,
  'soso': SosoIcon,
  'work': Briefcase,
  'god': Trophy
};

const Dashboard = ({ services }) => (
  <div className="dashboard">
    <header className="dashboard-header">
      <h1>Crab Nexus Dashboard 🦀</h1>
      <p>CrabTeam Evolution v2.0 - Hyper-Product Ecosystem</p>
    </header>
    
    <div className="stats-row">
      <div className="stat-card">
        <h3>Total Services</h3>
        <div className="value">{services.length}</div>
      </div>
      <div className="stat-card">
        <h3>AI Evolution</h3>
        <div className="value">Phase 5</div>
      </div>
      <div className="stat-card">
        <h3>System Health</h3>
        <div className="value">Optimal</div>
      </div>
    </div>

    <div className="service-grid">
      {services.map(s => (
        <Link key={s.id} to={`/${s.id}`} className="service-card">
          <div className="service-icon">
            {IconMap[s.icon] && React.createElement(IconMap[s.icon], { size: 32 })}
          </div>
          <h3>{s.name}</h3>
          <p>{s.description || "지능형 서비스 분석 및 자동 최적화가 진행 중입니다."}</p>
        </Link>
      ))}
    </div>
  </div>
);

const PlaceholderService = ({ name }) => (
  <div className="page">
    <h2>{name}</h2>
    <p>이 서비스는 현재 AI Evolution 엔진에 의해 고도화 중입니다. 잠시만 기다려 주세요.</p>
  </div>
);

function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/nexus/services')
      .then(res => setServices(res.data))
      .catch(err => {
        console.error("Service fetch error", err);
        // Fallback for demo
        setServices([
          { id: 'crab-infinity', name: 'Crab-Infinity', icon: 'infinity' },
          { id: 'crab-shield', name: 'Crab-Shield', icon: 'shield' },
          { id: 'mood-ge', name: 'Mood-Ge', icon: 'mood' }
        ]);
      });
  }, []);

  return (
    <Router>
      <div className="nexus-layout">
        <aside className="sidebar">
          <div className="logo">CRAB NEXUS ♾️</div>
          <nav>
            <Link to="/"><LayoutDashboard size={20} /> Dashboard</Link>
            <Link to="/evolution"><Sparkles size={20} color="#7F00FF" /> AI Evolution</Link>
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
            <Route path="/evolution" element={<EvolutionPage />} />
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
            <Route path="/work-crab" element={<WorkPage />} />
            <Route path="/god-crab" element={<GodPage />} />
            {services.filter(s => !['crab-infinity', 'crab-shield', 'mood-ge', 'crab-mate', 'crab-finance', 'crab-health', 'eco-charge-optimizer', 'senticrypto-analyzer', 'crab-crab-care', 'crab-crab-link', 'crab-deep-dream', 'crab-mind', 'crab-scan', 'crab-sentinel', 'crab-soul-care', 'nuri-bom', 'soso-haeng', 'work-crab', 'god-crab'].includes(s.id)).map(s => (
              <Route key={s.id} path={`/${s.id}`} element={<PlaceholderService name={s.name} />} />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
