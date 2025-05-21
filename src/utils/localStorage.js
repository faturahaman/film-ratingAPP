import axios from 'axios';

export const API_URL = 'http://localhost:8000';

export const fetchRatings = async () => {
  try {
    const response = await axios.get(`${API_URL}/ratings`);
    return response.data;
  } catch (error) {
    throw new error('Failed to fetch ratings');
  }
};

export const createRating = async (rating) => {
  try {
    const response = await axios.post(`${API_URL}/ratings`, rating, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new error('Failed to create rating');
  }
};

export const updateRatingAPI = async (id, rating) => {
  try {
    const response = await axios.put(`${API_URL}/ratings/${id}`, rating, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new error('Failed to update rating');
  }
};

export const deleteRatingAPI = async (id) => {
  try {
    await axios.delete(`${API_URL}/ratings/${id}`);
    return true;
  } catch (error) {
    throw new error('Failed to delete rating');
  }
};
