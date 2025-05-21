import axios from 'axios';

const API_URL = 'http://localhost:8000';

const fetchRatings = async () => {
  try {
    const response = await axios.get(`${API_URL}/ratings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return [];
  }
};

const createRating = async (rating) => {
  try {
    const response = await axios.post(`${API_URL}/ratings`, rating, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding rating:", error);
    throw error;
  }
};

const updateRatingAPI = async (id, rating) => {
  try {
    const response = await axios.put(`${API_URL}/ratings/${id}`, rating, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
};

const deleteRatingAPI = async (id) => {
  try {
    await axios.delete(`${API_URL}/ratings/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting rating:", error);
    throw error;
  }
};

export { fetchRatings, createRating, updateRatingAPI, deleteRatingAPI };
