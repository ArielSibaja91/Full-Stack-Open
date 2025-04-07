import { useState } from 'react'

const AddBlog = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthor = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrl = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    newBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={handleTitle}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={handleAuthor}
          />
        </div>
        <div>
          url:
          <input type='url' value={url} name='url' onChange={handleUrl} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AddBlog
