import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const addNew = async (content) => {
  const object = { content, id: getId(), votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const object = response.data
  const newObject = { ...object, votes: object.votes + 1 }
  const resquest = axios.put(`${baseUrl}/${id}`, newObject)
  return resquest.then((response) => response.data)
}

export default { getAll, addNew, updateVote }