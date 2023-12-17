import React from 'react'
import { Navigate } from 'react-router-dom'

const UnProtectedRoute = ({ isAuthenticated, children }) => {
    // console.log(isAuthenticated)
    // const navigate = useNavigate()

    if (isAuthenticated) {
        return <Navigate to={'/profile'}/>
    }
  

        return children
    
}

export default UnProtectedRoute