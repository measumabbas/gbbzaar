import React, { useEffect } from 'react'
import '../SignIn/SignIn.css'
import Navbar from '../../Components/Navbar/Navbar'
import signin from '../../Images/Signupimg.png'
import usericon from '../../Images/user.png'
import usernameicon from '../../Images/username.png'
import emailicon from '../../Images/sms.png'
import passwordicon from '../../Images/lock.png'
// import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { register } from '../../store/actions/userActions'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { CLEAR_ERRORS } from '../../store/constants/userConstants'
import BtnLoader from '../../Components/BtnLoader/BtnLoader'
import Swal from 'sweetalert2'
const SignIn = ({isLoggedIn, setIsloggedIn}) => {
    const dispatch = useDispatch()
    const {error,isAuthenticated,loading} = useSelector(state => state.token) 
    const user = useSelector(state => state.user)

    useEffect(()=>{
        if(error){
            if(error.code === 400){
                const errorArr = error.message.split(',')
                Swal.fire({
                    icon: 'error',
                    title: 'Please fix the errors above',
                    text: `${errorArr.map((err)=> `${err}`)}`
                  })
            }
            if(error.code === 409){
                Swal.fire({
                    icon: 'error',
                    title: 'Please fix the error above',
                    text: `${error.message}`
                  })
            }
            if(error.code === 403){
                Swal.fire({
                    icon: 'error',
                    title: 'Please fix the error above',
                    text: `Can't send email right now , please check your internet connection or try again later`
                  })
            }
            dispatch({type:CLEAR_ERRORS})
        }
        
    },[dispatch,error])
    
    // const navigate = useNavigate()
    const handleSignUp = ()=>{
        // navigate('/login')
        // console.log(formik)
       
        const userData = {
            name:formik.values.name,
            userName:formik.values.userName,
            email:formik.values.email,
            password:formik.values.password
        }

        dispatch(register(userData))

    }

    const formik = useFormik({
        initialValues:{
            name:'',
            userName:'',
            email:'',
            password:''
        },
        onSubmit:handleSignUp
    })
    return (
        <>
        <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />
            <div className="max-width-1440">
                <section className="signin ">

                    <section className="left-section">
                        <h1 className="signinheading">Sign up to <br /> <span className='primary-blue-color'>GB </span> Art Bazaar</h1>
                        <p className="signinpara">GB Art Bazaar is the leading destination
                            to find & showcase creative work and home to the world's best design professionals.</p>

                    <form onSubmit={formik.handleSubmit}>

                        <div className="input-fields">

                            <div className="input-name">
                                <input className='name' type="text" placeholder='Name' name='name' id='name' value={formik.values.name} onChange={formik.handleChange}/>
                                <div className="user-icon">
                                    <img src={usericon} alt="" />
                                </div>
                            </div>

                            <div className="input-name">
                                <input className='name' type="text" placeholder='Username' name='userName' id='userName' value={formik.values.userName} onChange={formik.handleChange}/>
                                <div className="username-icon">
                                    <img src={usernameicon} alt="" />
                                </div>
                            </div>

                            <div className="input-name">
                                <input className='name' type="Email" placeholder='Email' name='email' id='email' value={formik.values.email} onChange={formik.handleChange}/>
                                <div className="email-icon">
                                    <img src={emailicon} alt="" />
                                </div>
                            </div>

                            <div className="input-name">
                                <input className='name' type="password" placeholder='Password' name='password' id='password' value={formik.values.password} onChange={formik.handleChange}/>
                                <div className="password-icon">
                                    <img src={passwordicon} alt="" />
                                </div>
                            </div>

                        </div>

                        <button disabled={loading?true:false} className='submit-btn' type='submit'>{loading ? <BtnLoader/>:'Sign Up'}</button>
                    </form>

                    </section>

                    <section className="right-section">
                        <img className='hero-img' src={signin} alt="" />
                    </section>


                </section>

            </div>



        </>
    )
}

export default SignIn