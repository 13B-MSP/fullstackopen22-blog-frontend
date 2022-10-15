import { useState } from "react"

const Blog = ({ blog, incrementLikes, removeBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false)
  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }
  const showRemove = blog.user && blog.user.username === username

  return <div>
    <div style={{ display: showDetails ? 'none': '' }}>
      <h3>{blog.title}</h3>
      <button onClick={() => toggleShowDetails()}>Show details</button>
    </div>
    <div style={{ display: showDetails ? '': 'none' }}>
      <h3>{blog.title}</h3>
      <div>by {blog.author}</div>
      <div><a href={blog.url}>Link</a></div>
      <div>
        likes: {blog.likes}
        <button onClick={incrementLikes}>like</button>
      </div>
      <button
        onClick={removeBlog}
        style={{ display: showRemove ? '': 'none'}}>
          remove
      </button>
      <button onClick={() => toggleShowDetails()}>Hide details</button>
    </div>
  </div>  
}

export default Blog