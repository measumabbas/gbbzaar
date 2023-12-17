import React from "react";
import "../ProfileDetails/ProfileDetail.css";

import LandingCard from "../../Components/LandingCard/LandingCard";

import pro1 from "../../Components/LandingCard/profile1.png";
import pro2 from "../../Components/LandingCard/profile2.png";
import pro3 from "../../Components/LandingCard/profile3.png";
import pro4 from "../../Components/LandingCard/profile4.png";
import pro5 from "../../Components/LandingCard/profile5.png";
import pro6 from "../../Components/LandingCard/profile6.png";
import pro7 from "../../Components/LandingCard/profile7.png";
import pro8 from "../../Components/LandingCard/profile8.png";
import pro9 from "../../Components/LandingCard/profile9.png";
import propic from "../../Components/LandingCard/propic.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { deleteUserArt } from "../../store/actions/artActions";
import Swal from "sweetalert2";

const ProfileDetail = ({
  user,
  arts,
  proheroimg,
  profilepicture,
  loading,
  profiledetailsheading,
  profiledetailspara1,
  profiledetailspara2,
  profiledetailspara3,
  profiledetailspara4,
  location,
  loggedUser
}) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this art",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserArt(id))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
      window.location.reload()
    })
   
  };
  return (
    <>
      {loading ? (
        <>
          <h1>Loading</h1>
        </>
      ) : (
        <>
          <section className="profile-detail">
            <img src={proheroimg} alt="" />
            <div className="pro-leftandright">
              <div className="pro-left">
                <div className="profile-details">
                  <img className="profile-pic" src={user.profileUrl} alt="" />
                  <h1>{user.name}</h1>
                  <p>{user.wNumber}</p>
                  <p>{user.cNumber}</p>

                  <div className="profile-address">
                    <img src={location} alt="" />
                    <p>{user?.address}</p>
                  </div>
                </div>
                {
                  (loggedUser?.user?._id === user?._id) && (<Link to={'/editprofiledetail'}><button className='profile-edit-btn'>Edit Your Profile</button></Link>)
                }
                
              </div>
              <div className="pro-right">

                {
                  (loggedUser?.user?._id === user?._id) && (
                    <div className="pro-right-top">
                  <button className="my-art-btn">My art work</button>
                  <p className="pro-right-top-about">About</p>

                  <Link to={"/upload"}>
                    <p className="pro-right-top-share">Share your art work</p>
                  </Link>
                </div>
                  )
                }
                
                <div className="pro-right-bottom">
                  {arts &&
                    (arts?.length === 0 ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        <h1 style={{ color: "#fff", marginTop: "20px" }}>
                          No art work to show
                        </h1>
                        <Link to={"/upload"}>
                          <button className="my-art-btn">Upload</button>
                        </Link>
                      </div>
                    ) : (
                      arts.map((art, index) => (
                        <LandingCard
                          user={user}
                          loading={loading}
                          handleDelete={handleDelete}
                          key={index}
                          art={art}
                          landingimg={pro5}
                          landingheader="How to create marketing personas that start with empathy"
                          profilepic={propic}
                          username="John Birmingham"
                          userdate="25 December 2019"
                          loggedUser={loggedUser}
                        />
                      ))
                    ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProfileDetail;
