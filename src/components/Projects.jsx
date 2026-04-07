import React, { useState, useEffect } from 'react';

function Projects({ context }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    clientId: '',
    teamMembers: [],
    startDate: '',
    deadline: ''
  });

  useEffect(() => {
    setProjects(context.projects);
    setFilteredProjects(context.projects);
  }, [context.projects]);

  useEffect(() => {
    if (!projectForm.clientId && context.clients.length > 0) {
      setProjectForm(prev => ({ ...prev, clientId: context.clients[0].id }));
    }
  }, [context.clients]);

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
    setProjectForm({
      name: '',
      description: '',
      clientId: context.clients.length > 0 ? context.clients[0].id : '',
      teamMembers: [],
      startDate: '',
      deadline: ''
    });
    setShowAddModal(true);
  };

  const handleProjectFormChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace('newProject', '').charAt(0).toLowerCase() + id.replace('newProject', '').slice(1);
    const nextValue = fieldName === 'clientId' ? Number(value) : value;
    setProjectForm(prev => ({ ...prev, [fieldName]: nextValue }));
  };

  const handleTeamSelection = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => Number(option.value));
    setProjectForm(prev => ({ ...prev, teamMembers: selected }));
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();

    if (!projectForm.name || !projectForm.description || !projectForm.clientId || projectForm.teamMembers.length === 0 || !projectForm.startDate || !projectForm.deadline) {
      alert('Please fill in all required fields and select at least one team member.');
      return;
    }

    const client = context.clients.find(c => c.id === Number(projectForm.clientId));
    const newProject = {
      id: Math.max(...projects.map(p => p.id), 0) + 1,
      name: projectForm.name,
      description: projectForm.description,
      clientId: Number(projectForm.clientId),
      clientName: client ? client.name : '',
      assignedTeamMembers: projectForm.teamMembers,
      status: 'Not Started',
      progress: 0,
      startDate: projectForm.startDate,
      deadline: projectForm.deadline,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    const updatedProjects = [...projects, newProject];
    context.updateProjects(updatedProjects);
    setShowAddModal(false);
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
            <form id="addProjectForm" onSubmit={handleSubmitProject}>
              <div className="form-group">
                <label htmlFor="newProjectName">Project Name *</label>
                <input
                  type="text"
                  id="newProjectName"
                  className="form-control"
                  value={projectForm.name}
                  onChange={handleProjectFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newProjectDescription">Description *</label>
                <textarea
                  id="newProjectDescription"
                  className="form-control"
                  rows="3"
                  value={projectForm.description}
                  onChange={handleProjectFormChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="newProjectClient">Client *</label>
                <select
                  id="newProjectClient"
                  className="form-control"
                  value={projectForm.clientId}
                  onChange={handleProjectFormChange}
                  required
                >
                  {context.clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name} - {client.company}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="newProjectTeam">Team Members *</label>
                <select
                  id="newProjectTeam"
                  className="form-control"
                  multiple
                  size={Math.max(context.users.length, 4)}
                  value={projectForm.teamMembers}
                  onChange={handleTeamSelection}
                  required
                >
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
                  <input
                    type="date"
                    id="newProjectStart"
                    className="form-control"
                    value={projectForm.startDate}
                    onChange={handleProjectFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newProjectDeadline">Deadline *</label>
                  <input
                    type="date"
                    id="newProjectDeadline"
                    className="form-control"
                    value={projectForm.deadline}
                    onChange={handleProjectFormChange}
                    required
                  />
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