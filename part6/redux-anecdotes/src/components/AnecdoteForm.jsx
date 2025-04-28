import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotes.value
        event.target.anecdotes.value = ''
        const newAnecdote = await anecdoteService.addNew(content)
        dispatch(addAnecdote(newAnecdote.content))
        dispatch(showNotification(`you created '${content}'`))
        setTimeout(() => {
            dispatch(showNotification(''))
        }, 5000)
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