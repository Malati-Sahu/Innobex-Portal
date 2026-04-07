import React, { useState, useEffect } from 'react';

function Team({ context }) {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [accessFilter, setAccessFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamForm, setTeamForm] = useState({
    name: '',
    email: '',
    password: 'password123',
    role: '',
    accessLevel: 'full'
  });
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: '',
    accessLevel: 'full'
  });

  useEffect(() => {
    setTeamMembers(context.users);
    setFilteredMembers(context.users);
  }, [context.users]);

  useEffect(() => {
    let filtered = teamMembers;

    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (accessFilter) {
      filtered = filtered.filter(member => member.accessLevel === accessFilter);
    }

    setFilteredMembers(filtered);
  }, [teamMembers, searchTerm, accessFilter]);

  const handleAddTeamMember = () => {
    setTeamForm({
      name: '',
      email: '',
      password: 'password123',
      role: '',
      accessLevel: 'full'
    });
    setShowAddModal(true);
  };

  const handleTeamFormChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace('newMember', '').charAt(0).toLowerCase() + id.replace('newMember', '').slice(1);
    setTeamForm(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();

    if (!teamForm.name || !teamForm.email || !teamForm.password || !teamForm.role || !teamForm.accessLevel) {
      alert('Please fill in all required fields.');
      return;
    }

    const newMember = {
      id: Math.max(...teamMembers.map(member => member.id), 0) + 1,
      name: teamForm.name,
      email: teamForm.email,
      password: teamForm.password,
      role: teamForm.role,
      accessLevel: teamForm.accessLevel
    };

    const updatedUsers = [...teamMembers, newMember];
    context.updateUsers(updatedUsers);
    setShowAddModal(false);
  };

  const handleViewProfile = (member) => {
    setSelectedMember(member);
    setShowProfileModal(true);
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setEditForm({
      name: member.name,
      email: member.email,
      role: member.role,
      accessLevel: member.accessLevel
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!editForm.name || !editForm.email || !editForm.role) {
      alert('Please fill in all required fields.');
      return;
    }

    const updatedUsers = teamMembers.map(member =>
      member.id === selectedMember.id
        ? { ...member, ...editForm }
        : member
    );

    context.updateUsers(updatedUsers);
    setShowEditModal(false);
    setSelectedMember(null);
  };

  return (
    <div id="teamPage" className="content-page active">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Team Members</h1>
          <button id="addTeamMemberBtn" className="btn btn-primary" onClick={handleAddTeamMember}>
            ➕ Add Team Member
          </button>
        </div>

        <div className="filters">
          <input
            type="text"
            id="teamSearch"
            className="form-control search-input"
            placeholder="🔍 Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            id="teamAccessFilter"
            className="form-control"
            value={accessFilter}
            onChange={(e) => setAccessFilter(e.target.value)}
          >
            <option value="">All Access Levels</option>
            <option value="full">Full Access</option>
            <option value="view">View Access</option>
          </select>
        </div>

        <div id="teamList" className="team-grid">
          {filteredMembers.map(member => (
            <div key={member.id} className="team-member-card card">
              <div className="member-avatar">
                <span>{member.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-email">{member.email}</p>
                <div className="member-access">
                  <span className={`access-badge ${member.accessLevel === 'full' ? 'access-full' : 'access-view'}`}>
                    {member.accessLevel === 'full' ? 'Full Access' : 'View Access'}
                  </span>
                </div>
              </div>
              <div className="member-actions">
                <button className="btn btn-sm" onClick={() => handleViewProfile(member)}>View Profile</button>
                <button className="btn btn-sm btn-outline" onClick={() => handleEdit(member)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Team Member Modal */}
      {showAddModal && (
        <div id="addTeamMemberModal" className="modal active">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h2>Add Team Member</h2>
            <form id="addTeamMemberForm" onSubmit={handleTeamSubmit}>
              <div className="form-group">
                <label htmlFor="newMemberName">Name *</label>
                <input
                  type="text"
                  id="newMemberName"
                  className="form-control"
                  value={teamForm.name}
                  onChange={handleTeamFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newMemberEmail">Email *</label>
                <input
                  type="email"
                  id="newMemberEmail"
                  className="form-control"
                  value={teamForm.email}
                  onChange={handleTeamFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newMemberPassword">Password *</label>
                <input
                  type="password"
                  id="newMemberPassword"
                  className="form-control"
                  value={teamForm.password}
                  onChange={handleTeamFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newMemberRole">Role *</label>
                <input
                  type="text"
                  id="newMemberRole"
                  className="form-control"
                  placeholder="e.g., Developer"
                  value={teamForm.role}
                  onChange={handleTeamFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newMemberAccess">Access Level *</label>
                <select
                  id="newMemberAccess"
                  className="form-control"
                  value={teamForm.accessLevel}
                  onChange={handleTeamFormChange}
                  required
                >
                  <option value="full">Full Access</option>
                  <option value="view">View Access</option>
                  <option value="client">Client Access</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Add Member</button>
            </form>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {showProfileModal && selectedMember && (
        <div id="memberProfileModal" className="modal active">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowProfileModal(false)}>&times;</span>
            <h2>{selectedMember.name}</h2>
            <div className="member-profile">
              <div className="profile-section">
                <h3>Profile Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{selectedMember.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedMember.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Role:</span>
                  <span className="detail-value">{selectedMember.role}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Access Level:</span>
                  <span className={`detail-value ${selectedMember.accessLevel === 'full' ? 'access-full' : 'access-view'}`}>
                    {selectedMember.accessLevel === 'full' ? 'Full Access' : 'View Access'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && selectedMember && (
        <div id="editMemberModal" className="modal active">
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowEditModal(false)}>&times;</span>
            <h2>Edit Member</h2>
            <form id="editMemberForm" onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="editMemberName">Name *</label>
                <input
                  type="text"
                  id="editMemberName"
                  className="form-control"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="editMemberEmail">Email *</label>
                <input
                  type="email"
                  id="editMemberEmail"
                  className="form-control"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="editMemberRole">Role *</label>
                <input
                  type="text"
                  id="editMemberRole"
                  className="form-control"
                  name="role"
                  value={editForm.role}
                  onChange={handleEditFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="editMemberAccess">Access Level *</label>
                <select
                  id="editMemberAccess"
                  className="form-control"
                  name="accessLevel"
                  value={editForm.accessLevel}
                  onChange={handleEditFormChange}
                  required
                >
                  <option value="full">Full Access</option>
                  <option value="view">View Access</option>
                  <option value="client">Client Access</option>
                </select>
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

export default Team;