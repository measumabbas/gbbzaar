import React, { useEffect } from "react";
import "../UploadPage/Upload.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import backbtn from "../UploadPage/back.png";
import uploadimg from "../UploadPage/uploadimg.png";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { uploadArt } from "../../store/actions/artActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import BtnLoader from "../../Components/BtnLoader/BtnLoader";
import {
  UPLOAD_ART_FAIL,
  UPLOAD_ART_REQUEST,
  UPLOAD_ART_RESET,
} from "../../store/constants/artConstants";
import { useForm } from "react-hook-form";
import Flex from "../../Components/styled/Flex/Flex";
import GlobalDropDown from "../../Components/styled/Form/GlobalDropDown/GlobalDropDown";

const Upload = () => {
  const [isLoggedIn, setIsloggedIn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { success, error, loading } = useSelector((state) => state.uploadArt);

  // console.log(user._id)

  // const [selectedImage, setSelectedImage] = useState(null);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setSelectedImage(reader.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  useEffect(() => {
    if (success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Book has been uploaded successfully",
        showConfirmButton: false,
        timer: 2500,
      });
      dispatch({ type: UPLOAD_ART_RESET });
      navigate("/profile");
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (error) {
      const errorArr = error.split(",");
      Swal.fire({
        icon: "error",
        title: "Please fix the errors above",
        text: `${errorArr.map((err) => `${err}`)}`,
      });
    }
  }, [dispatch, error]);

  const handleUploadBook = async (values) => {
    dispatch({ type: UPLOAD_ART_REQUEST });
    const myForm = new FormData();
    myForm.append("file", selectedImage);
    myForm.append("upload_preset", "oha7na0l");
    myForm.append("cloud_name", "drkf8to4g");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/drkf8to4g/image/upload",
        myForm
      );

      const data = {
        title: values.title,
        description: values.description,
        imageUrl: res.data.url,
        user_id: user._id,
        category: values.category,
        language: values.language,
        condition: selectedCondition.value,
        availability: selectedAvailability.value,
        author: values.author,
      };
      dispatch(uploadArt(data));
    } catch (error) {
      dispatch({ type: UPLOAD_ART_FAIL, error: error.message });
      Swal.fire({
        icon: "error",
        title: "Please fix the errors above",
        text: `Please check your internet connection`,
      });
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [showImage, setShowImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    // Check if the file is an image
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = new Image();

        image.onload = () => {
          const { width, height } = image;
          const minWidth = 100;
          const minHeight = 100;
          const maxWidth = 1500;
          const maxHeight = 1500;
          if (
            width >= minWidth &&
            height >= minHeight &&
            width <= maxWidth &&
            height <= maxHeight
          ) {
            setSelectedImage(file);
            setShowImage(reader.result);
            setErrorMessage("");
          } else {
            setErrorMessage(
              "Image size is not within the allowed limits(100-701 x 100-445). Please choose an image with appropriate dimensions."
            );
            setSelectedImage(null);
            setShowImage(null);
          }
        };

        image.src = reader.result;
      };

      reader.readAsDataURL(file);
    } else {
      setErrorMessage("Please select an image");
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />

      <form onSubmit={handleSubmit(handleUploadBook)}>
        <section className="upload max-width-1440">
          <h1 className="book-details-form-head">Enter Book Details</h1>
          <div className="upload-content-inputs">
            <Flex
              className={`global-input-container global-outer-input upload-content-input`}
              direction="column"
              gap={10}
            >
              <label htmlFor="title">Book Name*</label>
              <div className="global-input-container-input">
                <input
                  type={"text"}
                  placeholder={"Book Title"}
                  {...register("title", {
                    required: "Please Enter Book Title",
                    maxLength: {
                      value: 100,
                      message: "Should not be greater then 100 characters",
                    },
                  })}
                  id="title"
                />
              </div>
            </Flex>
            <Flex
              className={`global-input-container global-outer-input upload-content-input`}
              direction="column"
              gap={10}
            >
              <label htmlFor="author">Book Author*</label>
              <div className="global-input-container-input">
                <input
                  type={"text"}
                  placeholder={"Author Name"}
                  {...register("author", {
                    required: "Please Enter author Name",
                    maxLength: {
                      value: 20,
                      message: "Should not be greater then characters",
                    },
                  })}
                  id="author"
                />
              </div>
            </Flex>
            <Flex
              className={`global-input-container global-outer-input upload-content-input`}
              direction="column"
              gap={10}
            >
              <label htmlFor="category">Category *</label>
              <div className="global-input-container-input">
                <input
                  type={"text"}
                  placeholder={"Category"}
                  {...register("category", {
                    required: "Please Enter category",
                    maxLength: {
                      value: 20,
                      message: "Should not be greater then characters",
                    },
                  })}
                  id="category"
                />
              </div>
            </Flex>
            <Flex
              className={`global-input-container global-outer-input upload-content-input`}
              direction="column"
              gap={10}
            >
              <label htmlFor="language">Language *</label>
              <div className="global-input-container-input">
                <input
                  type={"text"}
                  placeholder={"Book Language"}
                  {...register("language", {
                    required: "Please Enter Book Language",
                    maxLength: {
                      value: 20,
                      message: "Should not be greater then characters",
                    },
                  })}
                  id="language"
                />
              </div>
            </Flex>
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
          </div>
          <div className="lable-textarea-group lable-input-group mb-40">
            <label htmlFor="notes">Description*</label>
            <div className="edit-client-icon-textarea">
              <textarea
                name=""
                id="notes"
                cols="135"
                rows="3"
                placeholder="Description"
                {...register("description", {
                  required: "Please Add description",
                })}
              ></textarea>
            </div>
            <p className="global-input-error">
              {errors?.description && errors?.description?.message}
            </p>
          </div>
          <div className="upload-content-image-section mb-40" id="img-box">
            <label htmlFor="file">
              <div>
                {selectedImage ? (
                  <div className="upload-img">
                    {/* <img src={selectedImage} alt="Preview" /> */}
                    {selectedImage && <img src={showImage} alt="Selected" />}
                  </div>
                ) : (
                  // <img src={uploadimg} alt="Preview" />
                  <>
                    <div className="upload-photo">
                      <span className="drag-drop">Select Image</span>
                    </div>
                    {/* {errorMessage && (
                      <div className="error-message">{errorMessage}</div>
                    )} */}
                  </>
                )}
              </div>
            </label>
            <input
              className="upload-content-image"
              type="file"
              accept="image/*"
              name="image"
              id="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="file" className="upload-content-label">
              Choose image
            </label>
          </div>
          <div className="upld-btn">
            <button
              disabled={loading ? true : false}
              type="submit"
              className="upload-btn"
            >
              {loading ? <BtnLoader /> : "Upload"}
            </button>
          </div>
        </section>
      </form>

      <Footer />
    </>
  );
};

export default Upload;
