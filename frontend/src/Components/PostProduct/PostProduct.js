import React, { useEffect, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addArtReview } from "../../store/actions/artActions";
import BtnLoader from "../BtnLoader/BtnLoader";
import { Mail, MapPin, Phone } from "react-feather";
import { timeDifference } from "../../utills/prettifyDate";
import { BookConditionBadge } from "../LandingCard/LandingCard";
import Popup from "../styled/Popup/Popup";
import Button from "../styled/Button/Button";
import BookDropDown from "../styled/Form/GlobalDropDown/BooksDropDown";
import { useForm } from "react-hook-form";
import Flex from "../styled/Flex/Flex";
import {
  createOffer,
  resetCreateOffer,
} from "../../store/actions/offerActions";
import { toast } from "react-toastify";
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
  // const {user} = useSelector(state => state.user)
  const { loading, error, success } = useSelector((state) => state.offer);

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

  const [popup, setPopup] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (success) {
      toast.success("Offer created successfully");
      dispatch(resetCreateOffer());
      setPopup(false);
    }
    if (error) {
      toast.error(error);
      dispatch(resetCreateOffer());
    }
  }, [success, error, dispatch]);
  return (
    <>
      {showPopup && (
        <OrderPopup
          id={id}
          user={art.result.user_id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <section className="post-details max-width-1440">
        <BookConditionBadge condition={art?.result?.condition} />
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
              <button className="order-post-btn" onClick={() => setPopup(true)}>
                Make an offer
              </button>
            </div>
          )}
        </div>
        <div className="right-post">
          <h1 className="post-heading" style={{ marginBottom: "0px" }}>
            {art?.result?.title}
          </h1>
          <span className="post-para" style={{ marginTop: "0" }}>
            {" "}
            By {art?.result?.author} | For{" "}
            {art?.result?.availability === 1
              ? "Exchange"
              : art?.result?.availability === 2
              ? "Sale"
              : "Exchange and Sale"}
          </span>
          <div
            className="review-card-stars"
            style={{ display: "flex", alignItems: "cenetr", gap: "10px" }}
          >
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
            <p className="users-name">{art?.result?.user_id?.userName} |</p>
            <div className="usergap"></div>
            <p className="users-date">
              {timeDifference(art?.result?.createdAt)} Ago |
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {art?.result?.language} |
            </p>
          </div>
          <h2 className="post-heading2">Description</h2>
          <p className="post-para">{art?.result?.description} </p>
          <div className="post-contact-links">
            <div className="post-number">
              <Phone color="#666666" size={18} />
              <p>Contact Number: {art?.result?.user_id?.wNumber}</p>
            </div>
            <div className="post-mail">
              <Mail color="#666666" size={18} />
              <p>Mailing Address: {art?.result?.user_id?.email}</p>
            </div>
            <div className="post-address">
              <MapPin color="#666666" size={18} />
              <p>Address: {art?.result?.user_id?.address}</p>
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
      {popup && (
        <Popup className="make-offer-popup" popUp={popup} setPopUp={setPopup}>
          <form
            onSubmit={handleSubmit((values) => {
              const data = {};
              data.message = values.message;
              data.offered_by = user._id;
              data.offered_to = art.result.user_id._id;
              data.offered_by_book = selectedBook._id;
              data.offered_to_book = art.result?._id;
              dispatch(createOffer(data));
            })}
          >
            <h1 style={{ marginBottom: "20px", color: "#666666" }}>
              Make an offer
            </h1>
            <div style={{ marginBottom: "20px" }}>
              <BookDropDown
                stateHandler={selectedBook}
                setStateHandler={setSelectedBook}
                label="Select Book"
                background="#fff"
              />
            </div>
            <div
              className="lable-textarea-group lable-input-group mb-40"
              style={{ marginBottom: "20px" }}
            >
              <label htmlFor="message">Message *</label>
              <div className="edit-client-icon-textarea">
                <textarea
                  name=""
                  id="notes"
                  cols="135"
                  rows="3"
                  placeholder="message"
                  {...register("message", {
                    required: "Please Add message",
                  })}
                ></textarea>
              </div>
              <p className="global-input-error">
                {errors?.message && errors?.description?.message}
              </p>
            </div>
            <Flex align="center" justify="flex-end" gap={10}>
              <Button
                label="cancel"
                variant="outline"
                handleClick={() => setPopup(false)}
              />
              <Button
                label="Submit"
                type="submit"
                loaderColor="#fff"
                loading={loading}
              />
            </Flex>
          </form>
        </Popup>
      )}
    </>
  );
};

export default PostProduct;
