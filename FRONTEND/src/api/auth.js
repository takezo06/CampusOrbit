import api from './axiosInstance';

export const registerUser = async (userData) => {
  // Matches your Laravel POST /auth/register route
  const response = await api.post('/auth/register', userData);
  
  // Follows the Standard Response Envelope { success, data, message }
  return response.data;
};