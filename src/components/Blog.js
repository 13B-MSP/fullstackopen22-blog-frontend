import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, incrementLikes, removeBlog, username }) => {
  const [showDetails, setShowDetails] = useState(false)
  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }
  const showRemove = blog.user && blog.user.username === username

  return <div>
    <div style={{ display: showDetails ? 'none': '' }} className="simpleView">
      <h3 className='title'>{blog.title}</h3>
      <button onClick={() => toggleShowDetails()}>Show details</button>
    </div>
    <div style={{ display: showDetails ? '': 'none' }} className="detailsView">
      <h3>{blog.title}</h3>
      <div>by {blog.author}</div>
      <div><a href={blog.url}>Link</a></div>
      <div>
        likes: {blog.likes}
        <button className="likeBtn" onClick={incrementLikes}>like</button>
      </div>
      <button
        onClick={removeBlog}
        style={{ display: showRemove ? '': 'none' }}>
          remove
      </button>
      <button onClick={() => toggleShowDetails()}>Hide details</button>
    </div>
  </div>
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  incrementLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

export default Blog