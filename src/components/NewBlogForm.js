import { useState } from 'react'

const NewBlogForm = ({  createBlog  }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    await createBlog({ author, title, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return <div>
    <h2>Create new</h2>
    <form onSubmit={handleCreate}>
      <div>
        title: <input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: <input
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: <input
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  </div>
}

export default NewBlogForm