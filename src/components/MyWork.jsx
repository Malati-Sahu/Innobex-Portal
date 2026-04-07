import React, { useState } from 'react';

function MyWork({ context }) {
  const [formData, setFormData] = useState({
    project: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    hoursWorked: '',
    status: 'In Progress',
    progress: 0,
    notes: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProgressChange = (e) => {
    setFormData(prev => ({
      ...prev,
      progress: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newWorkUpdate = {
      id: Date.now(),
      projectId: parseInt(formData.project),
      userId: context.currentUser.id,
      userName: context.currentUser.name,
      date: formData.date,
      description: formData.description,
      hoursWorked: parseFloat(formData.hoursWorked),
      status: formData.status,
      progress: parseInt(formData.progress),
      notes: formData.notes,
      timestamp: new Date().toISOString()
    };

    context.updateWorkUpdates([...context.workUpdates, newWorkUpdate]);
    setSuccessMessage('Work update submitted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);

    // Reset form
    setFormData({
      project: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      hoursWorked: '',
      status: 'In Progress',
      progress: 0,
      notes: ''
    });
  };

  return (
    <div id="myworkPage" className="content-page active">
      <div className="container">
        <h1 className="page-title">Update My Work</h1>

        <div className="card">
          <form id="workUpdateForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="workProject">Project *</label>
                <select
                  id="workProject"
                  name="project"
                  className="form-control"
                  value={formData.project}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Project</option>
                  {context.projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="workDate">Date *</label>
                <input
                  type="date"
                  id="workDate"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="workDescription">Task/Activity Description *</label>
              <textarea
                id="workDescription"
                name="description"
                className="form-control"
                rows="4"
                placeholder="Describe what you worked on..."
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="workHours">Hours Worked *</label>
                <input
                  type="number"
                  id="workHours"
                  name="hoursWorked"
                  className="form-control"
                  min="0"
                  step="0.5"
                  placeholder="0"
                  value={formData.hoursWorked}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="workStatus">Status *</label>
                <select
                  id="workStatus"
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="workProgress">Progress (%) *</label>
              <div className="progress-input-container">
                <input
                  type="range"
                  id="workProgress"
                  className="progress-slider"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleProgressChange}
                  required
                />
                <span id="workProgressValue" className="progress-value">{formData.progress}%</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="workNotes">Notes/Comments</label>
              <textarea
                id="workNotes"
                name="notes"
                className="form-control"
                rows="3"
                placeholder="Any additional notes..."
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Submit Update</button>
            {successMessage && (
              <div id="workUpdateSuccess" className="success-message">{successMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyWork;