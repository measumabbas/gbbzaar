import React from 'react'
import '../AboutUsPage/AboutUs.css'
import Navbar from '../../Components/Navbar/Navbar'
import constructionimg from '../AboutUsPage/construction.png'

const AboutUs = ({isLoggedIn, setIsloggedIn}) => {
  return (
    <>
     <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />
    <div className="about-us max-width-1440">
        <div className="about-img">
            <img src={constructionimg} alt="" />
            <p>Our team is working, this page will be live soon!</p>
        </div>
    </div>
    </>
  )
}

export default AboutUs