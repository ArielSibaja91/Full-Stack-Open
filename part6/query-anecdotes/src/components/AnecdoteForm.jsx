import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createNew } from '../request'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
      dispatch({ type: 'SHOW_NOTIFICATION', payload: `anecdote ${newAnecdote.content} created` })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    },
    onError: () => {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 5000)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: getId(), votes: 0})
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
