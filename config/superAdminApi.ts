import api from './api';

export const SuperAdminAPI = {
  getAdminRequests: async () => {
    const res = await api.get('/super-admin/requests');
    return res.data;
  },
  approveAdmin: async (adminId: number) => {
    const res = await api.post(`/super-admin/approve/${adminId}`);
    return res.data;
  },
  rejectAdmin: async (adminId: number) => {
    const res = await api.post(`/super-admin/reject/${adminId}`);
    return res.data;
  },
  getSystemOverview: async () => {
    const res = await api.get('/super-admin/overview');
    return res.data;
  }
};
