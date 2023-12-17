import React from "react";
import "../LandingCard/LandingCard.css";
import { Link } from "react-router-dom";
// import ReactStars from 'react-stars'

import { HiOutlinePencil } from "react-icons/hi";
import { TbTrash } from "react-icons/tb";
import { useDispatch } from "react-redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'

const landingcard = ({
  handleDelete,
  art,
  landingimg,
  landingheader,
  profilepic,
  username,
  userdate,
  loggedUser
}) => {
  // console.log(user)
  return (
    <>
      <div className="landing-card">
        <div className="landing-card-top">
          {loggedUser?.user ? (
            <>
              {loggedUser.user?._id === art?.user_id?._id ? (
                <>
                  <div className="card-edit-del">
                    <div className="edit-del-circle">
                      <Link to={`/editpostproduct/${art._id}`}>
                        <HiOutlinePencil className="landing-card-icon" />
                      </Link>
                    </div>
                    <div className="edit-del-circle">
                      <TbTrash
                        onClick={() => handleDelete(art._id)}
                        className="landing-card-icon"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          <Link to={`/post/${art?._id}`}>
            <div className="landing-card-image">
              <img
                style={{ width: "350px", height: "258px" }}
                className="landing-card-img"
                src={art?.imageUrl}
                alt=""
              />
            </div>
          </Link>
        </div>

        {/* <div className="review-card-stars">
          <input type="radio" name="rate" id="rate-5" />
          <FontAwesomeIcon for="rate-5" className='fastar' icon={faStar} />
          <input type="radio" name="rate" id="rate-4" />
          <FontAwesomeIcon for="rate-4" className='fastar' icon={faStar} />
          <input type="radio" name="rate" id="rate-3" />
          <FontAwesomeIcon for="rate-3" className='fastar' icon={faStar} />
          <input type="radio" name="rate" id="rate-2" />
          <FontAwesomeIcon for="rate-2" className='fastar' icon={faStar} />
          <input type="radio" name="rate" id="rate-1" />
          <FontAwesomeIcon for="rate-1" className='fastar' icon={faStar} />

          <ReactStars count={5} size={24} color1={'#ffd700'} />

        </div> */}

        <h1 className="landing-header">{art?.title}</h1>

        <Link to={`/profile/${art?.user_id?._id}`}>
          <div className="profile-link">
            <img
              className="landing-card-proimg"
              style={{ borderRadius: "50%" }}
              src={art?.user_id?.profileUrl}
              alt=""
            />
            <p className="user-name">{art?.user_id?.userName}</p>
            <div className="usergap"></div>
            <p className="user-date">
              {new Date(art?.publishedDate).toDateString()}
            </p>
          </div>
        </Link>

        <Link to={"/post"}>
          <div className="reviewbtn">{/* <button>Review</button> */}</div>
        </Link>
      </div>
    </>
  );
};

export default landingcard;
