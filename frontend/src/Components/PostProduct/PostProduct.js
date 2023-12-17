import React, { useRef } from "react";
import "../PostProduct/PostProduct.css";
import pcall from "../../Pages/PostPage/call.png";
import pmail from "../../Pages/PostPage/sms.png";
import paddress from "../../Pages/PostPage/location.png";

import Review from "../../Components/Reviews/Review";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from "formik";
import profileimage from "../../Components/PostProduct/profileimage.png";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import OrderPopup from "../OrderPopUp/OrderPopup";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addArtReview } from "../../store/actions/artActions";
import BtnLoader from "../BtnLoader/BtnLoader";
const PostProduct = ({
  user,
  art,
  productimg,
  profilepic,
  username,
  userdate,
  isAuthenticated,
  revState,
  reviews,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const handleClick = () => {
    setShowPopup(true);
  };

  const handleReviewSubmit = () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "error",
        title: "Please fix the errors above",
        text: `Please login or sign up to add review`,
      });
    } else {
      const data = {
        rating: formik.values.rating,
        comment: formik.values.comment,
        userId: user._id,
        artId: id,
      };
      dispatch(addArtReview(data));
    }
  };

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: "",
    },
    onSubmit: handleReviewSubmit,
  });

  return (
    <>
      {showPopup && (
        <OrderPopup id={id} user={art.result.user_id} showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <section className="post-details max-width-1440">
        <div className="left-post">
          <img className="product-img" src={art?.result?.imageUrl} alt="" />

          {user?._id === art?.result?.user_id?._id && (
            <div className="left-post-btn">
              <Link to={`/editpostproduct/${art?.result?._id}`}>
                <button className="edit-post-btn">Edit your post </button>
              </Link>
              <button className="dlt-post-btn">Delete your post </button>
            </div>
          )}

          {!(user?._id === art?.result?.user_id?._id) && (
            <div className="order-button">
              <button className="order-post-btn" onClick={handleClick}>
                Order Now
              </button>
            </div>
          )}
        </div>
        <div className="right-post">
          <h1 className="post-heading">{art?.result?.title}</h1>
          <div
            className="review-card-stars"
            style={{ display: "flex", alignItems: "cenetr", gap: "10px" }}
          >
            {/* <input type="radio" name="rate" id="rate-5" />
                        <FontAwesomeIcon for="rate-5" className='fastar' icon={faStar} />
                        <input type="radio" name="rate" id="rate-4" />
                        <FontAwesomeIcon for="rate-4" className='fastar' icon={faStar} />
                        <input type="radio" name="rate" id="rate-3" />
                        <FontAwesomeIcon for="rate-3" className='fastar' icon={faStar} />
                        <input type="radio" name="rate" id="rate-2" />
                        <FontAwesomeIcon for="rate-2" className='fastar' icon={faStar} />
                        <input type="radio" name="rate" id="rate-1" />
                        <FontAwesomeIcon for="rate-1" className='fastar' icon={faStar} /> */}

            <ReactStars
              count={5}
              size={24}
              value={parseInt(art?.result?.ratings)}
              color2="#ffd700"
            />
            <span
              style={{
                color: "#fff",
                transform: "translateY(3px)",
                fontSize: "19px",
              }}
            >{`(${art?.result?.numOfReviews})`}</span>
          </div>
          <div className="profile-link1">
            <img
              className="post-proimg"
              src={art?.result?.user_id?.profileUrl}
              alt=""
            />
            <p className="users-name">{art?.result?.user_id?.userName}</p>
            <div className="usergap"></div>
            <p className="users-date">
              {new Date(art?.result?.publishedDate).toDateString()}
            </p>
          </div>
          <h2 className="post-heading2">Describtion</h2>
          <p className="post-para">{art?.result?.description} </p>
          <div className="post-contact-links">
            <div className="post-number">
              <img src={pcall} alt="" />
              <p>Contact Number: {art?.result?.user_id?.wNumber}</p>
            </div>
            <div className="post-mail">
              <img src={pmail} alt="" />
              <p>Mailing Address: {art?.result?.user_id?.email}</p>
            </div>
            <div className="post-address">
              <img src={paddress} alt="" />
              <p>Addrss: {art?.result?.user_id?.address}</p>
            </div>
          </div>

          {!(user?._id === art?.result?.user_id?._id) && (
            <section className="review-section">
              <form onSubmit={formik.handleSubmit}>
                <h1>Review</h1>
                <textarea
                  className="add-review"
                  type="text"
                  placeholder="Write a review...."
                  onChange={formik.handleChange}
                  value={formik.values.comment}
                  name="comment"
                />

                <div className="rat-star">
                  <h1>Rating</h1>
                  <ReactStars
                    count={5}
                    size={24}
                    color2="#ffd700"
                    value={formik.values.rating}
                    onChange={(newRating) =>
                      formik.setFieldValue("rating", newRating)
                    }
                  />
                </div>

                <button
                  disabled={revState.loading ? true : false}
                  className="my-art-btn-1"
                  type="submit"
                >
                  {revState.loading ? <BtnLoader /> : "Submit"}
                </button>
              </form>
            </section>
          )}

          <div className="reviews">
            <div className="review-cards">
              {reviews.reviews ? (
                reviews.reviews.length > 0 ? (
                  reviews.reviews.map((rev, index) => {
                    return (
                      <Review
                        reviewpara="The intricately hand-carved wooden sculpture I recently encountered is a true masterpiece of artistic excellence and craftsmanship. This remarkable piece captivates the imagination with its exquisite details and captivating beauty."
                        reviewimg={profileimage}
                        review={rev}
                      />
                    );
                  })
                ) : (
                  <>
                    <h1 style={{ color: "#fff", fontSize: "20px" }}>
                      Not Revieved Yet
                    </h1>
                  </>
                )
              ) : (
                <>
                  <BtnLoader />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostProduct;
