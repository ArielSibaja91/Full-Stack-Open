import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const classType = useSelector(state => state.notification.classType)
  
  return (
    <div className={classType}>
      {notification}
    </div>
  )
}

export default Notification