import React, { useState } from 'react';
import { createOrganization, updateOrganization } from '../services/api';

function OrganizationForm({ organization, onClose }) {
  const [formData, setFormData] = useState({
    name: organization?.name || '',
    email: organization?.email || '',
    phone: organization?.phone || '',
    address: organization?.address || '',
    website: organization?.website || '',
    description: organization?.description || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      if (organization) {
        await updateOrganization(organization.id, formData);
      } else {
        await createOrganization(formData);
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
          {organization ? '✏️ Edit Organization' : '✨ Add New Organization'}
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
            Organization Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="Enter organization name"
          />
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
            placeholder="contact@example.com"
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

        <div>
          <label className="block text-sm font-semibold text-purple-700 mb-2">
            Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="input-field"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-purple-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input-field"
            placeholder="123 Main St, City, Country"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-purple-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="input-field"
            placeholder="Brief description of the organization"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1"
          >
            {loading ? '💫 Saving...' : organization ? '✅ Update' : '✨ Create'}
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

export default OrganizationForm;
