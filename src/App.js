import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(
    {message: null, cssClassName: null})

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(
    () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }, [])

  const showNotification = (message, cssClassName='notification') => {
    setNotification({message: message, cssClassName: cssClassName})
    setTimeout(
      () => {
        setNotification({message: null, cssClassName: null})
      }, 5000)
  }
  const showError = (message) => showNotification(message, 'error')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials');
      showError('wrong username or password')
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }
  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = { author, title, url }
    const createdBlog = await blogService.create(blog)
    showNotification(`created blog '${createdBlog.title} by ${createdBlog.author}`)
    setBlogs(blogs.concat([createdBlog]))
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const showLogin = () =>
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username: <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          Password: <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  const showBlogs = () =>
    <div>
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

  return (
    <div>
      <Notification message={notification.message} cssClassName={notification.cssClassName}/>
      {(user === null ) ? showLogin() : showBlogs()}
    </div>
  )
}

export default App
