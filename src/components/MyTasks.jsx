import React, { useState, useEffect } from 'react';

function MyTasks({ context }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Filter tasks for current user
    const userTasks = context.tasks.filter(task => task.assignedTo === context.currentUser.id);
    setTasks(userTasks);
  }, [context.tasks, context.currentUser]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'status-success';
      case 'In Progress': return 'status-info';
      case 'Not Started': return 'status-warning';
      case 'On Hold': return 'status-error';
      case 'Blocked': return 'status-error';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'priority-critical';
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div id="mytasksPage" className="content-page active">
      <div className="container">
        <h1 className="page-title">My Tasks</h1>

        <div className="task-filter-tabs">
          <button
            className={`task-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`task-tab ${filter === 'Not Started' ? 'active' : ''}`}
            onClick={() => setFilter('Not Started')}
          >
            Not Started
          </button>
          <button
            className={`task-tab ${filter === 'In Progress' ? 'active' : ''}`}
            onClick={() => setFilter('In Progress')}
          >
            In Progress
          </button>
          <button
            className={`task-tab ${filter === 'Completed' ? 'active' : ''}`}
            onClick={() => setFilter('Completed')}
          >
            Completed
          </button>
        </div>

        <div id="myTasksList" className="my-tasks-list">
          {filteredTasks.map(task => (
            <div key={task.id} className="task-card card">
              <div className="task-header">
                <h3>{task.name}</h3>
                <div className="task-badges">
                  <span className={`status ${getStatusClass(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`priority ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-meta">
                <div className="meta-item">
                  <span className="meta-label">Project:</span>
                  <span className="meta-value">
                    {context.projects.find(p => p.id === task.projectId)?.name}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Progress:</span>
                  <span className="meta-value">{task.progress}%</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Deadline:</span>
                  <span className="meta-value">{new Date(task.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              <div className="task-actions">
                <button className="btn btn-sm">View Details</button>
                <button className="btn btn-sm btn-outline">Update Progress</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTasks;