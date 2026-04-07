import React, { useState, useEffect } from 'react';

function Clients({ context }) {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    password: 'password123'
  });

  useEffect(() => {
    setClients(context.clients);
    setFilteredClients(context.clients);
  }, [context.clients]);

  useEffect(() => {
    let filtered = clients;

    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm]);

  const handleAddClient = () => {
    setShowAddModal(true);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace('newClient', '').charAt(0).toLowerCase() + id.replace('newClient', '').slice(1);
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.company || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new client with unique ID
    const newClient = {
      id: Math.max(...clients.map(c => c.id), 0) + 1,
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      projects: [],
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0]
    };

    // Update clients list
    const updatedClients = [...clients, newClient];
    context.updateClients(updatedClients);

    // Reset form and close modal
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      password: 'password123'
    });
    setShowAddModal(false);
  };

  return (
    <div id="clientsPage" className="content-page active">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Clients</h1>
          <button id="addClientBtn" className="btn btn-primary" onClick={handleAddClient}>
            ➕ Add Client
          </button>
        </div>

        <div className="filters">
          <input
            type="text"
            id="clientSearch"
            className="form-control search-input"
            placeholder="🔍 Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div id="clientsList" className="clients-grid">
          {filteredClients.map(client => (
            <div key={client.id} className="client-card card">
              <div className="client-header">
                <h3>{client.name}</h3>
                <span className={`status ${client.status === 'Active' ? 'status-success' : 'status-warning'}`}>
                  {client.status}
                </span>
              </div>
              <div className="client-info">
                <p className="client-company">{client.company}</p>
                <p className="client-contact">
                  <span className="contact-label">Email:</span> {client.email}
                </p>
                <p className="client-contact">
                  <span className="contact-label">Phone:</span> {client.phone}
                </p>
                <p className="client-projects">
                  <span className="projects-label">Projects:</span> {client.projects.length}
                </p>
              </div>
              <div className="client-actions">
                <button className="btn btn-sm">View Details</button>
                <button className="btn btn-sm btn-outline">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div id="addClientModal" className="modal active">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h2>Add Client</h2>
            <form id="addClientForm" onSubmit={handleSubmitForm}>
              <div className="form-group">
                <label htmlFor="newClientName">Name *</label>
                <input 
                  type="text" 
                  id="newClientName" 
                  className="form-control" 
                  value={formData.name}
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="newClientCompany">Company *</label>
                <input 
                  type="text" 
                  id="newClientCompany" 
                  className="form-control" 
                  value={formData.company}
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="newClientEmail">Email *</label>
                <input 
                  type="email" 
                  id="newClientEmail" 
                  className="form-control" 
                  value={formData.email}
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="newClientPhone">Phone *</label>
                <input 
                  type="tel" 
                  id="newClientPhone" 
                  className="form-control" 
                  value={formData.phone}
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="newClientPassword">Password *</label>
                <input 
                  type="password" 
                  id="newClientPassword" 
                  className="form-control" 
                  value={formData.password}
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Client</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;