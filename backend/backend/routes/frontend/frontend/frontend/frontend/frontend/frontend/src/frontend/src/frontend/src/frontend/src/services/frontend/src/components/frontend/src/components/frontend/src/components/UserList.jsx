import React from 'react';
import { deleteUser } from '../services/api';

function UserList({ users, organizations, onAdd, onEdit, onDelete }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? 🌸')) {
      try {
        await deleteUser(id);
        onDelete();
      } catch (error) {
        alert('Error deleting user: ' + error.message);
      }
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'active') return 'status-active';
    if (status === 'inactive') return 'status-inactive';
    if (status === 'pending') return 'status-pending';
    return 'status-active';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold gradient-text">👥 Users</h2>
        <button onClick={onAdd} className="btn-primary">
          ✨ Add User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="card text-center text-purple-500">
          <div className="text-6xl mb-4">🌺</div>
          <p className="text-xl">No users found. Click "Add User" to create one!</p>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase tracking-wider">
                  👤 Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase tracking-wider">
                  📧 Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase tracking-wider">
                  🏢 Organization
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase tracking-wider">
                  💼 Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase tracking-wider">
                  ✅ Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-purple-700 uppercase tracking-wider">
                  ⚙️ Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-purple-900">
                      {user.first_name} {user.last_name}
                    </div>
                    {user.phone && (
                      <div className="text-sm text-gray-500">📱 {user.phone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.organization_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.role || '-'}</div>
                    {user.department && (
                      <div className="text-sm text-gray-500">{user.department}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(user.status)}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-blue-600 hover:text-purple-600 mr-4 font-semibold transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-pink-600 font-semibold transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;
