const Notification = ({ message, cssClassName }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={cssClassName}>
        {message}
      </div>
    )
  }
export default Notification