import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotes.value
        event.target.anecdotes.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you created '${content}'`, 5))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div>
                    <input name='anecdotes' />
                </div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm