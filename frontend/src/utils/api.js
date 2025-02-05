import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchVideos = async () => {
  const { data } = await axios.get(`${API_URL}/videos`);
  return data;
};

export const fetchVideoDetails = async (id) => {
  const { data } = await axios.get(`${API_URL}/videos/${id}`);
  return data;
};

export const uploadVideo = async (formData) => {
  await axios.post(`${API_URL}/videos`, formData);
};

export const postComment = async (videoId, comment) => {
  await axios.post(`${API_URL}/videos/${videoId}/comments`, { comment });
};

export const loginUser = async (credentials) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, credentials);
    localStorage.setItem("token", data.token);
    return data;
  };
  
  export const registerUser = async (userData) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, userData);
    return data;
  };
  