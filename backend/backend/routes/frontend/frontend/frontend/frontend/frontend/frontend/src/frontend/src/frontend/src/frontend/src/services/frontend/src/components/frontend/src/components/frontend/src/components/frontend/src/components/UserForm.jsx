import React, { useState, useEffect } from 'react';
import { createUser, updateUser, fetchOrganizations } from '../services/api';

function UserForm({ user, organizations, onClose }) {
  const [orgList, setOrgList] = useState(organizations);
  const [formData, setFormData] = useState({
    organization_id: user?.organization_id || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || '',
    department: user?.department || '',
    status: user?.status || 'active',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!organizations || organizations.length === 0) {
      loadOrganizations();
    }
  }, []);

  const loadOrganizations = async () => {
    try {
      const data = await fetchOrganizations();
      setOrgList(data.organizations || []);
    } catch (err) {
      console.error('Error loading organizations:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (user) {
        await updateUser(user.id, formData);
      } else {
        await createUser(formData);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold gradient-text">
          {user ? '✏️ Edit User' : '✨ Add New User'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-pink-600 text-3xl font-bold transition-colors"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl mb-4">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-purple-700 mb-2">
            Organization *
          </label>
          <select
            name="organization_id"
            value={formData.organization_id}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select Organization</option>
            {orgList.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Sruthi"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="K"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-purple-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="sruthi@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-purple-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="+91 1234567890"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Manager, Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Engineering, Sales"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-purple-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="active">✅ Active</option>
            <option value="inactive">⭕ Inactive</option>
            <option value="pending">⏳ Pending</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? '💫 Saving...' : user ? '✅ Update' : '✨ Create'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
