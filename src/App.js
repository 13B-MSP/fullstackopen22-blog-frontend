import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(
    {message: null, cssClassName: null})

  useEffect(() => {
      const fetchBlogs = async () => {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
    }
    fetchBlogs()
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
  const createBlog = async (blog) => {
    const createdBlog = await blogService.create(blog)
    showNotification(`created blog '${createdBlog.title} by ${createdBlog.author}`)
    setBlogs(blogs.concat([createdBlog]))
  }
  const incrementLikes = async (id) => {
    console.log('updating blog ', id)
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = await blogService.update(id, {...blog, likes: blog.likes+1})
    setBlogs(blogs.map(b => b.id === id ? updatedBlog: b))
  }
  const removeBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`remove blog '${blog.title} by '${blog.author}?`)) {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(b => b.id !== id))
    }
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
      <Togglable buttonLabel='create blog'>
        <NewBlogForm
          createBlog={createBlog}
          />
      </Togglable>
      {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          incrementLikes={() => incrementLikes(blog.id)}
          removeBlog={() => removeBlog(blog.id)}
          username={user.username}/>
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
