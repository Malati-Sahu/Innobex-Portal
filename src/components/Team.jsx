import React, { useState, useEffect } from 'react';

function Team({ context }) {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [accessFilter, setAccessFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

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
    setShowAddModal(true);
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
                <button className="btn btn-sm">View Profile</button>
                <button className="btn btn-sm btn-outline">Edit</button>
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
            <form id="addTeamMemberForm">
              <div className="form-group">
                <label htmlFor="newMemberName">Name *</label>
                <input type="text" id="newMemberName" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="newMemberEmail">Email *</label>
                <input type="email" id="newMemberEmail" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="newMemberPassword">Password *</label>
                <input type="password" id="newMemberPassword" className="form-control" defaultValue="password123" required />
              </div>
              <div className="form-group">
                <label htmlFor="newMemberRole">Role *</label>
                <input type="text" id="newMemberRole" className="form-control" placeholder="e.g., Developer" required />
              </div>
              <div className="form-group">
                <label htmlFor="newMemberAccess">Access Level *</label>
                <select id="newMemberAccess" className="form-control" required>
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
    </div>
  );
}

export default Team;