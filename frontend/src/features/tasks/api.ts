import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getUserId = () => {
  return localStorage.getItem('userId') || '1';
};

export const TaskAPI = {
  async list() {
    const { data } = await api.get('/tasks', {
      params: { userId: getUserId() },
    });
    return data;
  },
  async create(payload: {
    title: string;
    description: string;
    priority: string;
    assignee: string;
    status: string;
  }) {
    const { data } = await api.post('/add/task', {
      ...payload,
      userId: Number(getUserId()),
    });
    return data;
  },
  async update(
    id: number,
    payload: {
      title: string;
      description: string;
      priority: string;
      assignee: string;
      status: string;
    }
  ) {
    const { data } = await api.put(`/update/task/${id}`, payload);
    return data;
  },
  async delete(id: number) {
    const { data } = await api.delete(`/delete/task/${id}`);
    return data;
  },
};

export default api;
