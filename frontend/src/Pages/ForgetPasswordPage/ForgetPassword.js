import React,{useEffect, useRef, useState} from 'react'
import '../ForgetPasswordPage/ForgetPassword.css'
import BtnLoader from '../../Components/BtnLoader/BtnLoader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch,useSelector } from 'react-redux'
import { updatePasswordRequest } from '../../store/actions/userActions'
import { FORGET_PASS_RESET } from '../../store/constants/userConstants'
const ForgetPassword = () => {
  const navigate = useNavigate()
  // const [loading,setLoading] = useState(false)
  // const [success,setSuccess] = useState(true)
  // const [error,setError] = useState(null)
  const [email,setEmail] = useState('')
  const dispatch = useDispatch()
  
  const {error,loading,success} = useSelector(state => state.updatePass)
  useEffect(()=>{
    if(error){
      Swal.fire({
        icon: 'error',
        title: 'Please fix the errors above',
        text: `${error}`
      })
    }
    dispatch({type:FORGET_PASS_RESET})
  },[error])
  useEffect(()=>{
    if(success){
      navigate('/verification')
    }
    dispatch({type:FORGET_PASS_RESET})
  },[success])

  

  const handlePassRecovery = async ()=>{
    dispatch(updatePasswordRequest(email))
  }
  return (
    <>
      <section className="forget-password">
        <div className="forgetpassword">
          <h1>Enter Email Address</h1>
          <input type="email" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your E-mail' />
          <p onClick={()=> navigate(-1)} >Back to sign in</p>
          <button disabled={loading?true:false} onClick={handlePassRecovery}>{loading?<BtnLoader/>:'Send Recovery Code'}</button>

        </div>

      </section>
    </>
  )
}

export default ForgetPassword