import { useSelector, useDispatch } from 'react-redux'
import { addVotes, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVotes(id))
  }

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdotes.value
    event.target.anecdotes.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name='anecdotes' />
          </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App