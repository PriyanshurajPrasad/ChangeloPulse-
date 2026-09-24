import API from './api';

export const feedbackService = {
  // User APIs
  createOrUpdateFeedback: async (feedbackData) => {
    const response = await API.post('/feedback', feedbackData);
    return response.data;
  },

  getMyFeedback: async () => {
    const response = await API.get('/feedback/my');
    return response.data;
  },

  getFeedbackForUpdate: async (updateId) => {
    const response = await API.get(`/feedback/update/${updateId}`);
    return response.data;
  },

  updateMyFeedback: async (id, feedbackData) => {
    const response = await API.put(`/feedback/${id}`, feedbackData);
    return response.data;
  },

  deleteMyFeedback: async (id) => {
    const response = await API.delete(`/feedback/${id}`);
    return response.data;
  },

  // Admin APIs
  getAllAdminFeedback: async (params = {}) => {
    const response = await API.get('/feedback/admin/all', { params });
    return response.data;
  },

  getAdminFeedbackById: async (id) => {
    const response = await API.get(`/feedback/admin/${id}`);
    return response.data;
  },

  updateFeedbackStatus: async (id, status) => {
    const response = await API.patch(`/feedback/admin/${id}/status`, { status });
    return response.data;
  },

  replyToFeedback: async (id, adminReply, status = 'reviewed') => {
    const response = await API.patch(`/feedback/admin/${id}/reply`, { adminReply, status });
    return response.data;
  },

  deleteAdminFeedback: async (id) => {
    const response = await API.delete(`/feedback/admin/${id}`);
    return response.data;
  },

  getFeedbackStatistics: async () => {
    const response = await API.get('/feedback/admin/statistics');
    return response.data;
  }
};
