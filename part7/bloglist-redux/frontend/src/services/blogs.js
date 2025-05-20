import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);

  return response.data;
};

const updateBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`);
  return response.data;
};

const getId = () => (100000 * Math.random()).toFixed(0);

const addComment = async (id, content) => {
  const config = {
    headers: { Authorization: token },
  };
  const object = {
    content,
    id: getId(),
  };
  const response = await axios.post(`${baseUrl}/${id}/comments`, object, config);
  return response.data;
};

export default { getAll, createBlog, setToken, updateBlog, deleteBlog, getComments, addComment };
