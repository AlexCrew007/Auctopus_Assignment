import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({children}) => {
    const user = useSelector( (state) => state.login.user)
  return (
    <div>
        {
            user ? children : <Navigate to="/login" />
        }
    </div>
  )
}
