import API from './api';

export const userService = {
  /**
   * Get authenticated user's profile
   */
  getProfile: async () => {
    const response = await API.get('/users/profile');
    return response.data;
  },

  /**
   * Update authenticated user's profile
   */
  updateProfile: async (profileData) => {
    const response = await API.put('/users/profile', profileData);
    return response.data;
  }
};

export default userService;
