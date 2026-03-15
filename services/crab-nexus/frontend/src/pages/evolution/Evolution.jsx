import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, ShieldAlert, FileText, Zap, Cpu, Activity } from 'lucide-react';
import './Evolution.css';

const Evolution = () => {
    const [status, setStatus] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [aiDocs, setAiDocs] = useState('');
    const [threatReport, setThreatReport] = useState('');
    const [loading, setLoading] = useState({ docs: false, threats: false });

    useEffect(() => {
        // Evolution Status & Service List Fetch
        axios.get('http://localhost:8080/api/v1/evolution/status')
            .then(res => setStatus(res.data))
            .catch(err => console.error("Evolution status fetch error", err));

        axios.get('http://localhost:8080/api/v1/nexus/services')
            .then(res => setServices(res.data))
            .catch(err => console.error("Service list fetch error", err));
    }, []);

    const handleGenerateDocs = () => {
        if (!selectedService) return;
        setLoading({ ...loading, docs: true });
        setAiDocs('');
        axios.get(`http://localhost:8080/api/v1/evolution/docs/${selectedService}`)
            .then(res => {
                setAiDocs(res.data.aiDocs);
                setLoading({ ...loading, docs: false });
            })
            .catch(err => {
                console.error("Docs generation error", err);
                setLoading({ ...loading, docs: false });
            });
    };

    const handleAnalyzeThreats = () => {
        setLoading({ ...loading, threats: true });
        setThreatReport('');
        axios.get('http://localhost:8080/api/v1/evolution/threats/analyze')
            .then(res => {
                setThreatReport(res.data.threatReports);
                setLoading({ ...loading, threats: false });
            })
            .catch(err => {
                console.error("Threat analysis error", err);
                setLoading({ ...loading, threats: false });
            });
    };

    return (
        <div className="page evolution-page">
            <header className="evolution-header">
                <h2><Sparkles color="#7F00FF" size={28} /> Phase 5: AI Evolution & Intelligence</h2>
                <p>Gemini API 기반의 자율 진화 및 지능형 관제 시스템입니다.</p>
            </header>

            {status && (
                <div className="status-grid">
                    <div className="status-card">
                        <Cpu size={24} />
                        <div>
                            <h4>Evolution Level</h4>
                            <div className="level-bar"><div className="level-fill" style={{width: status.evolutionLevel}}></div></div>
                            <span>{status.evolutionLevel}</span>
                        </div>
                    </div>
                    <div className="status-card">
                        <Zap size={24} />
                        <div>
                            <h4>Active Engines</h4>
                            <p>{status.activeEngines.join(', ')}</p>
                        </div>
                    </div>
                    <div className="status-card">
                        <Activity size={24} />
                        <div>
                            <h4>Phase</h4>
                            <p>{status.phase}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="evolution-content">
                <section className="evo-section">
                    <h3><FileText size={20} /> AI Documentation Autogen</h3>
                    <p>컨트롤러 코드를 실시간 분석하여 인간 친화적인 API 문서를 생성합니다.</p>
                    <div className="controls">
                        <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                            <option value="">서비스 선택...</option>
                            {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                        <button onClick={handleGenerateDocs} disabled={loading.docs || !selectedService}>
                            {loading.docs ? 'Generating...' : 'Generate Docs'}
                        </button>
                    </div>
                    {aiDocs && <div className="ai-report markdown-body">{aiDocs}</div>}
                </section>

                <section className="evo-section">
                    <h3><ShieldAlert size={20} /> Intelligent Threat Defense</h3>
                    <p>Gemini 기반의 지능형 로그 분석 및 보안 위협 탐지를 가동합니다.</p>
                    <button onClick={handleAnalyzeThreats} disabled={loading.threats} className="danger-btn">
                        {loading.threats ? 'Analyzing Logs...' : 'Analyze System Threats'}
                    </button>
                    {threatReport && <div className="ai-report threat-report markdown-body">{threatReport}</div>}
                </section>
            </div>
        </div>
    );
};

export default Evolution;
