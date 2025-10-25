import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchOrganizations = async () => {
  const response = await api.get('/organizations');
  return response.data;
};

export const fetchOrganization = async (id) => {
  const response = await api.get(`/organizations/${id}`);
  return response.data;
};

export const createOrganization = async (data) => {
  const response = await api.post('/organizations', data);
  return response.data;
};

export const updateOrganization = async (id, data) => {
  const response = await api.put(`/organizations/${id}`, data);
  return response.data;
};

export const deleteOrganization = async (id) => {
  const response = await api.delete(`/organizations/${id}`);
  return response.data;
};

export const fetchUsers = async (organizationId = null) => {
  const url = organizationId 
    ? `/users?organization_id=${organizationId}` 
    : '/users';
  const response = await api.get(url);
  return response.data;
};

export const fetchUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await api.post('/users', data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export default api;
