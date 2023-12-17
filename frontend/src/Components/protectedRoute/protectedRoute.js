import React, { useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
const ProtectedRoute = ({ isAuthenticated,isEmailVerified, isAllDetails, children }) => {
    // console.log(isAuthenticated)
    const navigate = useNavigate();
    

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isEmailVerified) {
      navigate('/emailcode');
    }
    else if(!isAllDetails){
      navigate('/editprofiledetail');
    }
  }, [isAuthenticated, isEmailVerified,isAllDetails, navigate]);

  return children;
  
  
}

export default ProtectedRoute