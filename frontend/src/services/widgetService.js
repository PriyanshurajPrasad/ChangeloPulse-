import API from './api';

export const widgetService = {
  getWidgetUpdates: async (limit = 5) => {
    const response = await API.get('/widget/updates', {
      params: { limit }
    });
    return response.data;
  }
};
