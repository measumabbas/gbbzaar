import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import heroimg from "../LandingPage/heroimg.png";

import c1 from "../../Components/LandingCard/c1.png";

import propic from "../../Components/LandingCard/propic.png";
import Loader from "../../Components/Loader/Loader";
import Navbar from "../../Components/Navbar/Navbar";
import LandingCard from "../../Components/LandingCard/LandingCard";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getAllArts } from "../../store/actions/artActions";
import Tabs from "../../Components/styled/Tabs/Tabs";
import GlobalDropDown from "../../Components/styled/Form/GlobalDropDown/GlobalDropDown";
import Flex from "../../Components/styled/Flex/Flex";
const Home = ({ isLoggedIn, setIsloggedIn }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.token);
  const loggedUser = useSelector((state) => state.user);

  const { arts, loading } = useSelector((state) => state.arts);
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [activeTab, setActiveTab] = useState("New");
  // designing
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  useEffect(() => {
    dispatch(
      getAllArts(language, selectedAvailability, selectedCondition, title)
    );
  }, [dispatch, selectedAvailability, language, selectedCondition, title]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />
      <section className="home-section max-width-1440">
        {/* -----------------------------------Hero-section--------------------------------- */}

        <section className="landing-hero-section">
          <section className="landing-hero-left">
            <h1 className="landing-hero-header" style={{ color: "#333333" }}>
              Discover Books &{" "}
              <span className="primary-blue-color">Download, Exchange</span>{" "}
            </h1>
            <p className="landing-hero-para" style={{ color: "#333333" }}>
              Book Spot is the leading destination to find & replace books
            </p>

            {/* <div className="landing-hero-btn">
                            {
                                
                                !isAuthenticated && <Link to={'/signup'}><button className="get-btn" style={{color:'#000'}}>Get Started</button></Link>

                            }
                            
                            
                            <Link to={'/aboutus'}><img className='demo-btn' src={demo} alt="" /></Link>

                        </div> */}
          </section>
          <section className="landing-hero-right">
            <img className="landing-hero-img" src={'/book.png'} alt=""  style={{width:'600px'}}/>
          </section>
        </section>

        {/* ----------------------------Our-Community------------------------- */}

        {/* {isLoggedIn ? (
          <div className="community-catogory max-width-1440">
            <p
              className={`catogory-para ${category === "All" ? "active" : ""}`}
              onClick={() => setCategory("All")}
            >
              All
            </p>
            <p
              className={`catogory-para ${category === "art" ? "active" : ""}`}
              onClick={() => setCategory("art")}
            >
              Arts
            </p>
            <p
              className={`catogory-para ${
                category === "handicraft" ? "active" : ""
              }`}
              onClick={() => setCategory("handicraft")}
            >
              Handicrafts
            </p>
            <p
              className={`catogory-para ${
                category === "designing" ? "active" : ""
              }`}
              onClick={() => setCategory("designing")}
            >
              Designing
            </p>
          </div>
        ) : (
          <div className="our-community">
            <h1 className="our-heading">
              Our <span className="primary-blue-color"> Community</span>
            </h1>
            <p className="our-para">
              GB Art Bazaar is the leading destination to find & showcase
              creative work and home to the world's best design professionals.
            </p>
          </div>
        )} */}
        <h1 style={{ color: "#666666", marginBottom: "20px" }}>
          Filter Books Based on
        </h1>
        <div className="home-page-filter-inputs">
          <div className="upload-content-input">
            <GlobalDropDown
              background="#fff"
              stateHandler={selectedCondition}
              setStateHandler={setSelectedCondition}
              label="Condition*"
              options={[
                { name: "New", value: 1 },
                { name: "Like New", value: 2 },
                { name: "Good", value: 3 },
                { name: "Fair", value: 4 },
                { name: "Poor", value: 5 },
              ]}
            />
          </div>
          <div className="upload-content-input">
            <GlobalDropDown
              background="#fff"
              stateHandler={selectedAvailability}
              setStateHandler={setSelectedAvailability}
              label="Availability*"
              options={[
                { name: "Exchange", value: 1 },
                { name: "Sale", value: 2 },
                { name: "Both", value: 3 },
              ]}
            />
          </div>
          <Flex
            className={`global-input-container global-outer-input upload-content-input`}
            direction="column"
            gap={10}
          >
            <label htmlFor="language">Language</label>
            <div className="global-input-container-input">
              <input
                type={"text"}
                placeholder={"Book Language"}
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
          </Flex>
          <Flex
            className={`global-input-container global-outer-input upload-content-input`}
            direction="column"
            gap={10}
          >
            <label htmlFor="title">Title</label>
            <div className="global-input-container-input">
              <input
                type={"text"}
                placeholder={"Book Name"}
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </Flex>
        </div>

        <section className="our-community">
          <section className="community-cards">
            {loading ? (
              <Flex align='center' justify='center'>
                <Loader />
              </Flex>
            ) : (
              <>
                {arts &&
                  (arts.length > 0 ? (
                    arts.map(
                      (art, index) =>
                        loggedUser?.user?._id !== art?.user_id?._id && (
                          <LandingCard
                            loggedUser={loggedUser}
                            handleDelete={() => {}}
                            art={art}
                            landingimg={c1}
                            landingheader="How to create desigining personas that start with empathy"
                            profilepic={propic}
                            username="John Birmingham"
                            userdate="25 December 2019"
                            key={index}
                          />
                        )
                    )
                  ) : (
                    <>
                      <h1 style={{ color: "#666666", fontSize: "20px" }}>
                        No books to show try changing above filters
                      </h1>
                    </>
                  ))}
              </>
            )}
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
            <div className="card-button" style={{ marginTop: "50px" }}>
              <Link to="/signup">
                <button className="card-signup">Sign up to Continue</button>
              </Link>
              {/* <Link to='/login'><button className="card-signin" style={{color:'white'}}>Sign In</button></Link> */}
            </div>
          )}
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Home;
