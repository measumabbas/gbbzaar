import React from 'react'
import { Link } from 'react-router-dom'
import '../LandingPage/LandingPage.css'
import demo from '../LandingPage/demo.png'
import heroimg from '../LandingPage/heroimg.png'


import c1 from '../../Components/LandingCard/c1.png'
import c2 from '../../Components/LandingCard/c2.png'
import c3 from '../../Components/LandingCard/c3.png'
import c4 from '../../Components/LandingCard/c4.png'
import c5 from '../../Components/LandingCard/c5.png'
import c6 from '../../Components/LandingCard/c6.png'
import propic from '../../Components/LandingCard/propic.png'



import LandingCard from '../../Components/LandingCard/LandingCard'


const LandingPage = () => {
    return (
        <>

            <section className="landingpage">

                {/* -----------------------------------Header---------------------------------- */}

                <section className="header">
                    <div className="header-left">
                        <h1 className="logo"> <span className='primary-blue-color'> GB </span>Art Bazaar</h1>
                    </div>
                    <div className="header-right">
                        <Link to='/login' ><button className="landing-signin-btn">Sign in</button></Link>
                        <Link to='/signup'></Link>
                        <button className="landing-register-btn">Register</button>
                    </div>
                </section>

                {/* -----------------------------------Hero-section--------------------------------- */}

                <section className="landing-hero-section">

                    <section className="landing-hero-left">
                        <h1 className="landing-hero-header">Discover the GB’s
                            designers & <span className='primary-blue-color'>creatives</span> </h1>
                        <p className="landing-hero-para">GB Art Bazaar is the leading destination to find & showcase creative work and home to the best design professionals.</p>

                        <div className="landing-hero-btn">
                            <Link to='/signup'><button className="get-btn">Get Started</button></Link>

                            <img className='demo-btn' src={demo} alt="" />
                        </div>

                    </section>
                    <section className="landing-hero-right">
                        <img className='landing-hero-img' src={heroimg} alt="" />

                    </section>

                </section>
                <div className="com">

                    <div className="community-catogory">

                        <p className="catogory-para">All</p>
                        <p className="catogory-para">Catogory 1</p>
                        <p className="catogory-para">Catogory 2</p>
                        <p className="catogory-para">Catogory 3</p>
                        <p className="catogory-para">Catogory 4</p>


                    </div>

                </div>

                {/* ----------------------------Our-Community------------------------- */}

                <section className="our-community">
                    <h1 className="our-heading">Our <span className='primary-blue-color'> Community</span></h1>
                    <p className="our-para">GB Art Bazaar is the leading destination to find & showcase creative work and home to the world's best design professionals.</p>

                    <section className="community-cards">

                        <LandingCard landingimg={c1} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        <LandingCard landingimg={c2} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        <LandingCard landingimg={c3} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        <LandingCard landingimg={c4} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        <LandingCard landingimg={c5} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        <LandingCard landingimg={c6} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />
                        <LandingCard landingimg={c1} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        <LandingCard landingimg={c2} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        <LandingCard landingimg={c3} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        <LandingCard landingimg={c4} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        <LandingCard landingimg={c5} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        <LandingCard landingimg={c6} landingheader="How to create marketing personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                    </section>

                    <div className="card-button">

                        <button className="card-signup">Sign up to Continue</button>
                        <button className="card-signin">Sign In</button>

                    </div>

                </section>


            </section>
        </>
    )
}

export default LandingPage