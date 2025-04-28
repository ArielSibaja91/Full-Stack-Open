import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addVotes(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      console.log(JSON.parse(JSON.stringify(state)))
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    },
    addAnecdote(state, action) {
      const content = action.payload
      console.log(JSON.parse(JSON.stringify(state)))
      state.push({
        content: content,
        id: getId(),
        votes: 0
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { addVotes, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer