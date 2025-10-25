import React, { useState, useEffect } from 'react';
import OrganizationList from './components/OrganizationList';
import OrganizationForm from './components/OrganizationForm';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { fetchOrganizations, fetchUsers } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('organizations');
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);
  const [showOrgForm, setShowOrgForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'organizations') {
        const data = await fetchOrganizations();
        setOrganizations(data.organizations || []);
      } else {
        const data = await fetchUsers();
        setUsers(data.users || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrganization = () => {
    setEditingOrg(null);
    setShowOrgForm(true);
  };

  const handleEditOrganization = (org) => {
    setEditingOrg(org);
    setShowOrgForm(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleFormClose = () => {
    setShowOrgForm(false);
    setShowUserForm(false);
    setEditingOrg(null);
    setEditingUser(null);
    loadData();
  };

  return (
    <div className="min-h-screen relative">
      {/* Decorative flowers */}
      <div className="flower-decoration" style={{top: '10%', left: '5%'}}>🌸</div>
      <div className="flower-decoration" style={{top: '60%', right: '10%'}}>🌺</div>
      <div className="flower-decoration" style={{bottom: '15%', left: '15%'}}>🌷</div>
      <div className="flower-decoration" style={{top: '30%', right: '5%'}}>💐</div>

      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute text-6xl">💖</div>
          <div className="absolute right-20 text-6xl">🌸</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
          <h1 className="text-5xl font-bold text-white text-center drop-shadow-lg">
            💖 Organization & Users Management 🌸
          </h1>
          <p className="text-center text-pink-100 mt-2 text-lg">
            Beautiful & Functional Management System
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-2 border-2 border-pink-200">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('organizations')}
              className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'organizations'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105'
                  : 'text-purple-600 hover:bg-pink-50'
              }`}
            >
              🏢 Organizations
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105'
                  : 'text-purple-600 hover:bg-pink-50'
              }`}
            >
              👥 Users
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        {error && (
          <div className="bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 text-red-700 px-6 py-4 rounded-2xl mb-4 shadow-lg">
            ❌ {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="spinner text-6xl">💖</div>
            <p className="mt-6 text-2xl gradient-text font-semibold">Loading beautiful data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'organizations' && (
              <>
                {!showOrgForm ? (
                  <OrganizationList
                    organizations={organizations}
                    onAdd={handleAddOrganization}
                    onEdit={handleEditOrganization}
                    onDelete={loadData}
                  />
                ) : (
                  <OrganizationForm
                    organization={editingOrg}
                    onClose={handleFormClose}
                  />
                )}
              </>
            )}

            {activeTab === 'users' && (
              <>
                {!showUserForm ? (
                  <UserList
                    users={users}
                    organizations={organizations}
                    onAdd={handleAddUser}
                    onEdit={handleEditUser}
                    onDelete={loadData}
                  />
                ) : (
                  <UserForm
                    user={editingUser}
                    organizations={organizations}
                    onClose={handleFormClose}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Footer with YOUR NAME */}
      <footer className="text-center py-8 mt-12">
        <p className="gradient-text text-xl font-bold mb-2">
          Made with 💖 by K. D. P. V. S. SRUTHI
        </p>
        <p className="text-purple-600 text-sm">
          Sruthi
        </p>
      </footer>
    </div>
  );
}

export default App;
