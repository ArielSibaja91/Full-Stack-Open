import axios from "axios";
const baseUrl = "/api/users";

const getAllUsers = () => {
  const response = axios.get(baseUrl);
  return response.data
}

export default { getAllUsers };