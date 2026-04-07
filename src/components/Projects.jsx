import React, { useState, useEffect } from 'react';

function Projects({ context }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setProjects(context.projects);
    setFilteredProjects(context.projects);
  }, [context.projects]);

  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, statusFilter]);

  const handleAddProject = () => {
    setShowAddModal(true);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'status-success';
      case 'In Progress': return 'status-info';
      case 'Not Started': return 'status-warning';
      case 'On Hold': return 'status-error';
      default: return '';
    }
  };

  return (
    <div id="projectsPage" className="content-page active">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Projects</h1>
          <button id="addProjectBtn" className="btn btn-primary" onClick={handleAddProject}>
            ➕ Add Project
          </button>
        </div>

        <div className="filters">
          <input
            type="text"
            id="projectSearch"
            className="form-control search-input"
            placeholder="🔍 Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            id="projectStatusFilter"
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <div id="projectsList" className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className={`status ${getStatusClass(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-meta">
                <div className="meta-item">
                  <span className="meta-label">Client:</span>
                  <span className="meta-value">{project.clientName}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Progress:</span>
                  <span className="meta-value">{project.progress}%</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Deadline:</span>
                  <span className="meta-value">{new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="project-actions">
                <button className="btn btn-sm">View Details</button>
                <button className="btn btn-sm btn-outline">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div id="addProjectModal" className="modal active">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h2>Add New Project</h2>
            <form id="addProjectForm">
              <div className="form-group">
                <label htmlFor="newProjectName">Project Name *</label>
                <input type="text" id="newProjectName" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="newProjectDescription">Description *</label>
                <textarea id="newProjectDescription" className="form-control" rows="3" required></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="newProjectClient">Client *</label>
                <select id="newProjectClient" className="form-control" required>
                  {context.clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name} - {client.company}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="newProjectTeam">Team Members *</label>
                <select id="newProjectTeam" className="form-control" multiple size={context.users.length || 4} required>
                  {context.users.length > 0 ? (
                    context.users.map(user => (
                      <option key={user.id} value={user.id}>{user.name} - {user.role}</option>
                    ))
                  ) : (
                    <option disabled>No team members available</option>
                  )}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="newProjectStart">Start Date *</label>
                  <input type="date" id="newProjectStart" className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="newProjectDeadline">Deadline *</label>
                  <input type="date" id="newProjectDeadline" className="form-control" required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Create Project</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;