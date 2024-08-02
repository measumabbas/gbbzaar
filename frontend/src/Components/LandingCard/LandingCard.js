import React from "react";
import "../LandingCard/LandingCard.css";
import { Link } from "react-router-dom";
// import ReactStars from 'react-stars'

import { HiOutlinePencil } from "react-icons/hi";
import { TbTrash } from "react-icons/tb";
import { useDispatch } from "react-redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
import { timeDifference } from "../../utills/prettifyDate";
import Flex from "../styled/Flex/Flex";
import ReactStars from "react-stars";
const landingcard = ({
  handleDelete,
  art,
  landingimg,
  landingheader,
  profilepic,
  username,
  userdate,
  loggedUser,
}) => {
  return (
    <>
      <div className="landing-card" style={{ position: "relative" ,marginBottom:'30px'}}>
        <BookConditionBadge condition={art?.condition} />
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
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p className="user-date">
            Posted {timeDifference(art?.createdAt)} Ago | For{" "}
            {art?.availability === 1
              ? "Exchange"
              : art?.availability === 2
              ? "Sale"
              : "Exchange and Sale"}
          </p>
          <Link to={`/post/${art?._id}`}>
            <h1 className="landing-header">{art?.title}</h1>
          </Link>

          <span className="user-date">
            By {art?.author} | {art?.language}
          </span>
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
            </div>
          </Link>
        </div>
        <div justify="space-between" className="landing-card-image-container">
          <div className="landing-card-description-container">
            <p>{art?.description}</p>
          </div>
          <Link to={`/post/${art?._id}`}>
            <div className="landing-card-image">
              <img className="landing-card-img" src={art?.imageUrl} alt="" />
            </div>
          </Link>
        </div>
        <div
            className="review-card-stars"
            style={{ display: "flex", alignItems: "cenetr", gap: "10px",position:'absolute',bottom:'0',left:'0' }}
          >

            <ReactStars
              count={5}
              size={24}
              value={parseInt(art?.ratings)}
              color2="#ffd700"
            />
            <span
              style={{
                color: "#666666",
                transform: "translateY(6px)",
                fontSize: "19px",
              }}
            >{`(${art?.numOfReviews})`}</span>
          </div>

        <Link to={"/post"}>
          <div className="reviewbtn">{/* <button>Review</button> */}</div>
        </Link>
      </div>
    </>
  );
};

export function BookConditionBadge({ condition,position='absolute' }) {
  if (condition === 1) {
    return <div className="condition-badge badge-new" style={{position}}>New</div>;
  }
  if (condition === 2) {
    return <div className="condition-badge badge-likely-new" style={{position}}>Likely New</div>;
  }
  if (condition === 3) {
    return <div className="condition-badge badge-good" style={{position}}>Good</div>;
  }
  if (condition === 4) {
    return <div className="condition-badge badge-fair" style={{position}}>Fair</div>;
  }
  if (condition === 4) {
    return <div className="condition-badge badge-poor" style={{position}}>Poor</div>;
  }
}

export default landingcard;
