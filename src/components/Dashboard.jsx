import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard({ context }) {
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    activeMembers: 0,
    totalClients: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [projectProgress, setProjectProgress] = useState([]);

  useEffect(() => {
    // Calculate stats
    const totalProjects = context.projects.length;
    const completedProjects = context.projects.filter(p => p.status === 'Completed').length;
    const activeMembers = new Set(context.tasks.map(t => t.assignedTo)).size;
    const totalClients = context.clients.length;

    setStats({
      totalProjects,
      completedProjects,
      activeMembers,
      totalClients
    });

    // Get recent activity from work updates
    const recent = context.workUpdates
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
    setRecentActivity(recent);

    // Get project progress
    const progress = context.projects.map(p => ({
      name: p.name,
      progress: p.progress,
      status: p.status
    }));
    setProjectProgress(progress);
  }, [context]);

  const projectStatusData = {
    labels: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
    datasets: [{
      label: 'Projects',
      data: [
        context.projects.filter(p => p.status === 'Not Started').length,
        context.projects.filter(p => p.status === 'In Progress').length,
        context.projects.filter(p => p.status === 'Completed').length,
        context.projects.filter(p => p.status === 'On Hold').length
      ],
      backgroundColor: [
        '#FF9800',
        '#2196F3',
        '#4CAF50',
        '#FF5722'
      ]
    }]
  };

  const teamWorkloadData = {
    labels: ['Shakti Mahato', 'Priya Kumar', 'Raj Singh', 'Anita Desai'],
    datasets: [{
      label: 'Tasks Assigned',
      data: [
        context.tasks.filter(t => t.assignedTo === 1).length,
        context.tasks.filter(t => t.assignedTo === 2).length,
        context.tasks.filter(t => t.assignedTo === 3).length,
        context.tasks.filter(t => t.assignedTo === 4).length
      ],
      backgroundColor: '#6B5BFF'
    }]
  };

  return (
    <div id="dashboardPage" className="content-page active">
      <div className="container">
        <h1 className="page-title">Dashboard</h1>

        {/* Analytics Widgets */}
        <div className="analytics-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <h3 id="totalProjects">{stats.totalProjects}</h3>
              <p>Total Projects</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3 id="completedProjects">{stats.completedProjects}</h3>
              <p>Completed Projects</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3 id="activeMembers">{stats.activeMembers}</h3>
              <p>Active Team Members</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-content">
              <h3 id="totalClients">{stats.totalClients}</h3>
              <p>Total Clients</p>
            </div>
          </div>
        </div>

        {/* Charts and Additional Info */}
        <div className="dashboard-content">
          <div className="chart-container">
            <div className="card">
              <h3>Projects by Status</h3>
              <Pie data={projectStatusData} />
            </div>
          </div>
          <div className="chart-container">
            <div className="card">
              <h3>Team Workload</h3>
              <Bar data={teamWorkloadData} />
            </div>
          </div>
          <div className="recent-activity">
            <div className="card">
              <h3>Recent Activity</h3>
              <div id="recentActivityList" className="activity-list">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-content">
                      <strong>{activity.userName}</strong> updated work on project
                      <div className="activity-text">{activity.description}</div>
                      <div className="activity-time">{new Date(activity.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="project-overview">
            <div className="card">
              <h3>Project Progress Overview</h3>
              <div id="projectProgressList" className="progress-list">
                {projectProgress.map((project, index) => (
                  <div key={index} className="progress-item">
                    <div className="progress-info">
                      <strong>{project.name}</strong>
                      <span className="progress-percentage">{project.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;