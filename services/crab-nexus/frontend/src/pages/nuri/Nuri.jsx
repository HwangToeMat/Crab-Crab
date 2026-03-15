import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Heart, MapPin, MessageCircle, Plus } from 'lucide-react';
import './Nuri.css';

const NuriPage = () => {
    const [missions, setMissions] = useState([]);
    const [matchingResult, setMatchingResult] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/nuri/missions').then(res => setMissions(res.data));
    }, []);

    const handleJoin = async (id) => {
        const res = await axios.post(`http://localhost:8080/api/v1/nuri/missions/${id}/join`);
        setMatchingResult(res.data);
    };

    return (
        <div className="page nuri-page">
            <header className="page-header">
                <h2>🌞 Nuri-Bom Community</h2>
                <p>시니어와 청년이 함께 만드는 따뜻한 동네 네트워크</p>
            </header>

            <div className="nuri-container">
                <section className="mission-list-section">
                    <div className="section-header">
                        <h3>Active Missions</h3>
                        <button className="add-mission-btn"><Plus size={18} /> 새 미션</button>
                    </div>
                    <div className="mission-grid">
                        {missions.map(m => (
                            <div key={m.id} className="mission-card">
                                <div className="card-top">
                                    <span className="author">{m.authorNickname}</span>
                                    <span className="distance"><MapPin size={14} /> {m.distance}km</span>
                                </div>
                                <p className="content">{m.content}</p>
                                <div className="card-bottom">
                                    <span className={`type-tag ${m.type.toLowerCase()}`}>{m.type}</span>
                                    <button onClick={() => handleJoin(m.id)}>함께하기</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {matchingResult && (
                    <section className="matching-overlay">
                        <div className="matching-box">
                            <Heart size={40} color="#ff4d4f" fill="#ff4d4f" />
                            <h3>매칭이 완료되었습니다!</h3>
                            <p className="reason">{matchingResult.matchingReason}</p>
                            <button className="chat-btn"><MessageCircle size={18} /> 대화 시작하기</button>
                            <button className="close-btn" onClick={() => setMatchingResult(null)}>닫기</button>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default NuriPage;
