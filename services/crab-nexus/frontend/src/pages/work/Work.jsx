import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, Plus, CheckCircle2, Circle } from 'lucide-react';
import './Work.css';

const Work = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/workcrab/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error("Work fetch error", err));
  }, []);

  const addTask = () => {
    if(!newTask) return;
    axios.post('http://localhost:8080/api/v1/workcrab/tasks', { title: newTask, status: "PENDING" })
      .then(res => {
        setTasks([...tasks, res.data]);
        setNewTask("");
      });
  };

  return (
    <div className="page work-page">
      <header className="page-header">
        <h2>💼 Work-Crab Tasks</h2>
        <p>꽃게팀의 진화 과제를 관리하고 실시간 협업 상태를 확인하세요.</p>
      </header>
      
      <div className="task-input">
        <input 
          type="text" 
          placeholder="새로운 작업 추가..." 
          value={newTask} 
          onChange={e => setNewTask(e.target.value)} 
        />
        <button onClick={addTask}><Plus size={18} /> Add</button>
      </div>

      <div className="task-list">
        {tasks.map(t => (
          <div key={t.id} className={`task-item ${t.status}`}>
            {t.status === "DONE" ? <CheckCircle2 color="#48bb78" /> : <Circle color="#a0aec0" />}
            <span>{t.title}</span>
            <span className="status-badge">{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
