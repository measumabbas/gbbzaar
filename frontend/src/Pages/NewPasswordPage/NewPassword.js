import React, { useEffect, useState } from 'react'
import '../NewPasswordPage/NewPassword.css'
import { useDispatch,useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { UPDATE_PASSWORD_RESET } from '../../store/constants/userConstants'
import { useNavigate } from 'react-router-dom'
import BtnLoader from '../../Components/BtnLoader/BtnLoader'
import { updatePassword } from '../../store/actions/userActions'

const NewPassword = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {error,loading,success} = useSelector(state => state.updatePassword)
  const [password,setPassword] = useState('')
  const [cPassword,setCPassword] = useState('')
  useEffect(()=>{
    if(error){
      Swal.fire({
        icon: 'error',
        title: 'Please fix the errors above',
        text: `${error}`
      })
    }
    dispatch({type:UPDATE_PASSWORD_RESET})
  },[error])
  useEffect(()=>{
    if(success){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'password has been updated successfully',
        showConfirmButton: false,
        timer: 2500
      })
      dispatch({type:UPDATE_PASSWORD_RESET})
      navigate('/login')
    }
    
  },[success])

  const handlePassUpdate = ()=>{
    if(password !== cPassword){
      Swal.fire({
        icon: 'error',
        title: 'Please fix the errors above',
        text: `passwords didn't match`
      })
    }else{
      dispatch(updatePassword(password))
    }
  }
  return (
   <>
   <section className="new-password">
    <div className="newpassword">
      <h1>New Password</h1>
      <p>Enter New Password</p>
      <input type="password" placeholder='At least 8 digits' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <p>Confirm Password</p>
      <input type="password" placeholder='********' value={cPassword} onChange={(e)=>setCPassword(e.target.value)}/>
      <button  disabled={loading?true:false} onClick={handlePassUpdate}>{loading?<BtnLoader/>:'Update'}</button>
    </div>
   </section>
   
   </>
  )
}

export default NewPassword