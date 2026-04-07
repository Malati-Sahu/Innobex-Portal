import React, { useState, useEffect } from 'react';

function Clients({ context }) {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    password: 'password123'
  });
  const [editFormData, setEditFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
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

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setShowDetailsModal(true);
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setEditFormData({
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone
    });
    setShowEditModal(true);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace('newClient', '').charAt(0).toLowerCase() + id.replace('newClient', '').slice(1);
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
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

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    
    if (!editFormData.name || !editFormData.company || !editFormData.email || !editFormData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    // Update client in list
    const updatedClients = clients.map(client => 
      client.id === selectedClient.id 
        ? { ...client, ...editFormData }
        : client
    );
    context.updateClients(updatedClients);

    // Close modal
    setShowEditModal(false);
    setSelectedClient(null);
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
                <button className="btn btn-sm" onClick={() => handleViewDetails(client)}>View Details</button>
                <button className="btn btn-sm btn-outline" onClick={() => handleEdit(client)}>Edit</button>
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

      {/* View Details Modal */}
      {showDetailsModal && selectedClient && (
        <div id="clientDetailsModal" className="modal active">
          <div className="modal-content modal-large">
            <span className="modal-close" onClick={() => setShowDetailsModal(false)}>&times;</span>
            <h2>{selectedClient.name}</h2>
            <div className="client-details">
              <div className="details-section">
                <h3>Company Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Company Name:</span>
                  <span className="detail-value">{selectedClient.company}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedClient.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedClient.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`detail-value status ${selectedClient.status === 'Active' ? 'status-success' : 'status-warning'}`}>
                    {selectedClient.status}
                  </span>
                </div>
              </div>
              <div className="details-section">
                <h3>Account Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Join Date:</span>
                  <span className="detail-value">{selectedClient.joinDate}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Last Login:</span>
                  <span className="detail-value">{selectedClient.lastLogin}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Projects:</span>
                  <span className="detail-value">{selectedClient.projects.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && selectedClient && (
        <div id="editClientModal" className="modal active">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowEditModal(false)}>&times;</span>
            <h2>Edit Client</h2>
            <form id="editClientForm" onSubmit={handleSubmitEdit}>
              <div className="form-group">
                <label htmlFor="editClientName">Name *</label>
                <input 
                  type="text" 
                  id="editClientName" 
                  className="form-control" 
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="editClientCompany">Company *</label>
                <input 
                  type="text" 
                  id="editClientCompany" 
                  className="form-control" 
                  name="company"
                  value={editFormData.company}
                  onChange={handleEditFormChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="editClientEmail">Email *</label>
                <input 
                  type="email" 
                  id="editClientEmail" 
                  className="form-control" 
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="editClientPhone">Phone *</label>
                <input 
                  type="tel" 
                  id="editClientPhone" 
                  className="form-control" 
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditFormChange}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowEditModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;