import React, { useEffect } from 'react'
import '../Profile/Profile.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

import prohero from '../Profile/proheropic.png'
import profilepic from '../../Pages/Profile/profilpic.png'
import location from '../../Pages/Profile/location.png'

import ProfileDetail from '../../Components/ProfileDetails/ProfileDetail'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserArts } from '../../store/actions/artActions'
import { getUser, loadUser } from '../../store/actions/userActions'
import { useParams,useNavigate } from 'react-router-dom'

import Loader from '../../Components/Loader/Loader'
const UserProfile = () => {
  const [isLoggedIn, setIsloggedIn] = useState(true)
  const { user,loading } = useSelector(state => state.getUser)
  const loggesUser = useSelector(state => state.user)
  const { arts } = useSelector(state => state.userArts)
  
  console.log(loggesUser)

  const {id} = useParams()
  const navigate = useNavigate()
  console.log(id)
  // console.log(arts)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(loggesUser.user){
      if(loggesUser.user._id === id){
        navigate('/profile')
      }
    }
  },[id])
 useEffect(()=>{
    dispatch(getUserArts(id))
    dispatch(getUser(id))

 },[dispatch,id])
  return (
    <>
      {
        user ? (
          <>
            <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />

            <section className="profile-section max-width-1440"style={{marginBottom:'200px'}}>
              <ProfileDetail loggesUser={loggesUser} arts={arts} user={user} loading={loading} proheroimg={prohero} profilepicture={user.profileUrl} profiledetailsheading="GB Art Bazaar" profiledetailspara1="Skill Set" profiledetailspara2="Working place/ company" profiledetailspara3="company link here" profiledetailspara4="Address here" location={location} />

            </section>


            <Footer /></>
        ) : (<><Loader/></>)
      }

    </>
  )
}

export default UserProfile