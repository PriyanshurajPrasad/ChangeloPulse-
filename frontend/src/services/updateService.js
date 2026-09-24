import API from './api';

const notifyChange = (type, data) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('changelog:update', {
        detail: { type, data, timestamp: Date.now() }
      })
    );
  }
};

export const updateService = {
  // Public changelog feed
  getPublicChangelog: async (params = {}) => {
    const response = await API.get('/changelog', { params });
    return response.data;
  },

  // Admin / General updates query
  getUpdates: async (params = {}) => {
    const response = await API.get('/updates', { params });
    return response.data;
  },

  // Admin: Aggregated database statistics
  getUpdateStats: async () => {
    const response = await API.get('/updates/stats');
    return response.data;
  },

  // Get single update by ObjectId or Slug
  getUpdateById: async (idOrSlug) => {
    const response = await API.get(`/updates/${idOrSlug}`);
    return response.data;
  },

  // Admin: Create update
  createUpdate: async (updateData) => {
    const response = await API.post('/updates', updateData);
    if (response.data && response.data.success) {
      notifyChange('create', response.data.data);
    }
    return response.data;
  },

  // Admin: Edit update
  updateUpdate: async (id, updateData) => {
    const response = await API.put(`/updates/${id}`, updateData);
    if (response.data && response.data.success) {
      notifyChange('edit', response.data.data);
    }
    return response.data;
  },

  // Admin: Delete update
  deleteUpdate: async (id) => {
    const response = await API.delete(`/updates/${id}`);
    if (response.data && response.data.success) {
      notifyChange('delete', { id });
    }
    return response.data;
  },

  // Admin: Publish update
  publishUpdate: async (id) => {
    const response = await API.patch(`/updates/${id}/publish`);
    if (response.data && response.data.success) {
      notifyChange('publish', response.data.data);
    }
    return response.data;
  },

  // Admin: Archive update
  archiveUpdate: async (id) => {
    const response = await API.patch(`/updates/${id}/archive`);
    if (response.data && response.data.success) {
      notifyChange('archive', response.data.data);
    }
    return response.data;
  }
};

export default updateService;
