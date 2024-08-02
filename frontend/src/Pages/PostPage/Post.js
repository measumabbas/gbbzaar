import React, { useEffect } from "react";
import "../PostPage/Post.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import productimg from "../PostPage/product.png";
import propic from "../PostPage/Avatar.png";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PostProduct from "../../Components/PostProduct/PostProduct";
import { getArtReviews, getSingleArt } from "../../store/actions/artActions";
import Loader from "../../Components/Loader/Loader";
import Swal from "sweetalert2";
import { ADD_REVIEW_REST } from "../../store/constants/artConstants";

const Post = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { art, loading } = useSelector((state) => state.art);
  const { user } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.token);
  const revState = useSelector((state) => state.review);
  const reviews = useSelector((state) => state.getReviews);

  useEffect(() => {
    dispatch(getSingleArt(params.id));
    dispatch(getArtReviews(params.id));
  }, [dispatch, params, revState]);

  useEffect(() => {
    if (revState.error) {
      Swal.fire({
        icon: "error",
        title: "Please fix the errors above",
        text: `${revState.error}`,
      });
    }
  }, [revState.error]);
  useEffect(() => {
    if (revState.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Review has been added successfully",
        showConfirmButton: false,
        timer: 2500,
      });
      dispatch({ type: ADD_REVIEW_REST });
    }
  }, [revState.success]);

  const [isLoggedIn, setIsloggedIn] = useState(true);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />

      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <section className="post-section">
            <PostProduct
              reviews={reviews}
              revState={revState}
              user={user}
              isAuthenticated={isAuthenticated}
              art={art}
              productimg={productimg}
              profilepic={propic}
              username="John Birmingham"
              userdate="25 December 2019"
            />
          </section>
        </>
      )}

      <Footer />
    </>
  );
};

export default Post;
