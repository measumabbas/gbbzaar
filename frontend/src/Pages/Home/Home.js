import React, { useEffect,useState } from 'react'
import '../Home/Home.css'
import demo from '../LandingPage/demo.png'
import heroimg from '../LandingPage/heroimg.png'

import c1 from '../../Components/LandingCard/c1.png'
import c2 from '../../Components/LandingCard/c2.png'
import c3 from '../../Components/LandingCard/c3.png'
import c4 from '../../Components/LandingCard/c4.png'
import c5 from '../../Components/LandingCard/c5.png'
import c6 from '../../Components/LandingCard/c6.png'
import ha1 from '../../Components/LandingCard/ha1.png'
import ha2 from '../../Components/LandingCard/ha2.png'
import ha3 from '../../Components/LandingCard/ha3.png'
import ha4 from '../../Components/LandingCard/ha4.png'
import ha5 from '../../Components/LandingCard/ha5.png'
import ha6 from '../../Components/LandingCard/ha6.png'
import ha7 from '../../Components/LandingCard/ha7.png'
import ha8 from '../../Components/LandingCard/ha8.png'
import ha9 from '../../Components/LandingCard/ha9.png'
import hp1 from '../../Components/LandingCard/hp1.png'
import hp2 from '../../Components/LandingCard/hp2.png'
import hp3 from '../../Components/LandingCard/hp3.png'
import hp4 from '../../Components/LandingCard/hp4.png'
import hp5 from '../../Components/LandingCard/hp5.png'
import hp6 from '../../Components/LandingCard/hp6.png'

import propic from '../../Components/LandingCard/propic.png'
import handmadehero from '../../Images/handmadehero.png'
import historicalhero from '../../Images/historicalheroimg.png'
import Loader from '../../Components/Loader/Loader'
import Navbar from '../../Components/Navbar/Navbar'
import LandingCard from '../../Components/LandingCard/LandingCard'
import { Link } from 'react-router-dom'
// import { useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { getAllArts } from '../../store/actions/artActions'

const Home = ({ isLoggedIn, setIsloggedIn }) => {

    const dispatch = useDispatch()
    const {isAuthenticated} = useSelector(state => state.token)
    const loggedUser = useSelector(state => state.user)

    const {arts,loading} = useSelector(state => state.arts)
    const [category,setCategory] = useState('All')
    // designing

    useEffect(()=>{
        dispatch(getAllArts(category))
    },[dispatch,category])

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />
            <section className="home-section max-width-1440">

                {/* -----------------------------------Hero-section--------------------------------- */}

                <section className="landing-hero-section">

                    <section className="landing-hero-left">
                        <h1 className="landing-hero-header">Discover the GB’s
                            designers & <span className='primary-blue-color'>creatives</span> </h1>
                        <p className="landing-hero-para">GB ArtBazaar is the leading destination to find & showcase creative work and home to the best design professionals.</p>

                        <div className="landing-hero-btn">
                            {
                                
                                !isAuthenticated && <Link to={'/signup'}><button className="get-btn">Get Started</button></Link>

                            }
                            
                            
                            <Link to={'/aboutus'}><img className='demo-btn' src={demo} alt="" /></Link>

                        </div>

                    </section>
                    <section className="landing-hero-right">
                        <img className='landing-hero-img' src={heroimg} alt="" />

                    </section>

                </section>


                {/* ----------------------------Our-Community------------------------- */}

                {isLoggedIn ? (
                    

                        <div className="community-catogory max-width-1440">

                            <p className={`catogory-para ${category === 'All'?'active':''}`} onClick={()=>setCategory('All')}>All</p>
                            <p className={`catogory-para ${category === 'art'?'active':''}`} onClick={()=>setCategory('art')}>Arts</p>
                            <p className={`catogory-para ${category === 'handicraft'?'active':''}`} onClick={()=>setCategory('handicraft')}>Handicrafts</p>
                            <p className={`catogory-para ${category === 'designing'?'active':''}`} onClick={()=>setCategory('designing')}>Designing</p>
                        </div>

                  

                ) : (
                    <div className='our-community'>

                        <h1 className="our-heading">Our <span className='primary-blue-color'> Community</span></h1>
                        <p className="our-para">GB Art Bazaar is the leading destination to find & showcase creative work and home to the world's best design professionals.</p>


                    </div>

                )}

                <section className="our-community">


                    <section className="community-cards">
                        {
                            loading ?(
                                <>
                                <Loader/>
                                </>
                            ) :(<>
                            { arts && (arts.length > 0?arts.map((art,index)=>(
                                loggedUser?.user?._id !== art?.user_id?._id && <LandingCard loggedUser={loggedUser} handleDelete={()=>{}} art={art} landingimg={c1} landingheader="How to create desigining personas that start with empathy" profilepic={propic} username="John Birmingham" userdate="25 December 2019" key={index}/>
                            )):<><h1 style={{color:'#fff',fontSize:'20px'}}>No arts to show</h1></>)}
                            </>)
                            
                        }

                        


                    </section>

                    {/* --------------------Handmade-Arts--------------------- */}

                    {/* <section className="handmade-arts">
                        <h1 className="handmade-heading">We produce the best  <span className='primary-blue-color'> handmade Art.</span></h1>
                        <p className="handmade-para">The word Artbazaar literally translates to ‘image’ and we believe every piece of art is a reflection of the artist’s mind.</p>
                        <img src={handmadehero} alt="" className="handmade-heroimg" />
                        <div className="handmade-cards">

                            <LandingCard landingimg={ha1} landingheader="This carry our cultural significance and reflect our tradition" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={ha2} landingheader="Our art highlight beauty and natural materials" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={ha3} landingheader="This reflect technical skills, creativity and passion" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={ha4} landingheader="Our art is unique and convey a story" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={ha5} landingheader="We preserve our culture and tradition" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={ha6} landingheader="Our art is unique and convey a story" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={ha7} landingheader="This reflect technical skills, creativity and passion" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={ha8} landingheader="This carry our cultural significance and reflect our tradition" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={ha9} landingheader="We preserve our culture and tradition" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                        </div>
                    </section> */}

                    {/* --------------------Historical-places-------------------- */}

                    {/* <section className="historical-places">
                        <h1 className="historical-heading">Historical <span className='primary-blue-color'> places.</span></h1>
                        <p className="historical-para">The word Artbazaar literally translates to ‘image’ and we believe every piece of art is a reflection of the artist’s mind.</p>
                        <img src={historicalhero} alt="" className="historical-heroimg" />
                        <div className="historical-cards">

                            <LandingCard landingimg={hp1} landingheader="Our art highlight beauty and natural materials" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={hp2} landingheader="This reflect technical skills, creativity and passion" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={hp3} landingheader="Our art is unique and convey a story" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={hp4} landingheader="We preserve our culture and tradition" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={hp5} landingheader="Our art is unique and convey a story" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />

                            <LandingCard landingimg={hp6 } landingheader="This reflect technical skills, creativity and passion" profilepic={propic} username="John Birmingham" userdate="25 December 2019" />


                        </div>
                    </section> */}

                    {isAuthenticated ? (

                        <></>


                    ) : (
                        <div className="card-button" style={{marginTop:'50px'}}>

                            <Link to='/signup'><button className="card-signup">Sign up to Continue</button></Link>
                            <Link to='/login'><button className="card-signin">Sign In</button></Link>


                        </div>


                    )}

                </section>


            </section>
            <Footer />
        </>
    )
}

export default Home