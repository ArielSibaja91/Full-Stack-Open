import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const classType = useSelector(state => state.notification.classType)
  
  return (
    <Alert severity={classType} variant='outlined' sx={{ margin: 1.5 }}>
      {notification}
    </Alert>
  )
}

export default Notification