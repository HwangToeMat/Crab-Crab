import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, ShieldAlert, ShieldCheck, Activity, Terminal, AlertTriangle } from 'lucide-react';
import './Sentinel.css';

const SentinelPage = () => {
    const [results, setResults] = useState([]);
    const [threats, setThreats] = useState(null);
    const [loading, setLoading] = useState(false);

    const runAudit = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:8080/api/v1/sentinel/audit/all');
            setResults(res.data.audit_results);
            const tRes = await axios.get('http://localhost:8080/api/v1/sentinel/threat-map');
            setThreats(tRes.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { runAudit(); }, []);

    return (
        <div className="page sentinel-page">
            <header className="page-header">
                <h2>🛡️ Crab-Sentinel Auditor</h2>
                <p>생태계 전역 실시간 위협 감지 및 시스템 무결성 감사</p>
            </header>

            {threats && (
                <div className="threat-banner">
                    <div className="threat-stat">
                        <Activity size={20} /> Integrity: <strong>{threats.system_integrity}</strong>
                    </div>
                    <div className="threat-stat">
                        <AlertTriangle size={20} /> Active Threats: <strong className="safe">{threats.active_threats}</strong>
                    </div>
                    <button onClick={runAudit} disabled={loading} className="re-audit-btn">
                        {loading ? 'Auditing...' : 'Run Full Audit'}
                    </button>
                </div>
            )}

            <div className="audit-grid">
                {results.map((res, i) => (
                    <div key={i} className={`audit-card ${res.status.toLowerCase()}`}>
                        <div className="card-top">
                            <strong>{res.serviceName}</strong>
                            {res.status === 'Secure' ? <ShieldCheck color="#48bb78" /> : <ShieldAlert color="#f56565" />}
                        </div>
                        <div className="score-row">
                            <span>Security Score</span>
                            <strong>{res.securityScore}</strong>
                        </div>
                        {res.vulnerabilities.length > 0 && (
                            <div className="vuln-list">
                                {res.vulnerabilities.map((v, j) => (
                                    <div key={j} className="vuln-item"><Terminal size={14} /> {v}</div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SentinelPage;
