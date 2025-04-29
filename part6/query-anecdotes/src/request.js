import axios from 'axios'

export const getAll = () => axios.get('http://localhost:3001/anecdotes').then(response => response.data)