import axios from "axios";
const baseUrl = "/api/users";

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data
};

const registerUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { getAllUsers, registerUser };