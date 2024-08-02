import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useForm } from "react-hook-form";
import Flex from "../../Components/styled/Flex/Flex";
import Button from "../../Components/styled/Button/Button";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { clearPdfState, uploadPdf } from "../../store/actions/pdfActions";
import { toast } from "react-toastify";
const UploadPdf = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [pdf, setPdf] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { addLoading, addSuccess, addError } = useSelector(
    (state) => state.pdf
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (addSuccess) {
      toast.success("Pdf Added successfully");
      dispatch(clearPdfState());
    }
    if (addError) {
      toast.error(addError);
      dispatch(clearPdfState());
    }
  }, [addSuccess, addError, dispatch]);
  return (
    <div>
      <Navbar />
      <div
        className="max-width-1440"
        style={{ padding: "20px 140px", minHeight: "60vh" }}
      >
        <form
          onSubmit={handleSubmit((values) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("author", values.author);
            formData.append("file", pdf);
            formData.append("user", user._id);

            dispatch(uploadPdf(formData));
          })}
        >
          <div className="upload-pdf-inputs">
            <Flex
              className={`global-input-container global-outer-input upload-pdf-input`}
              direction="column"
              gap={10}
            >
              <label htmlFor="title">Book Title*</label>
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
              className={`global-input-container global-outer-input upload-pdf-input`}
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
          </div>
          <Flex align="center" gap={10}>
            <label htmlFor="pdf">Select Pdf</label>
            <input
              type="file"
              id="pdf"
              onChange={(e) => setPdf(e.target.files[0])}
            />
          </Flex>
          <Flex align="center" justify="flex-end">
            <Button
              label="Upload"
              type="Submit"
              loaderColor="#fff"
              loading={addLoading}
            />
          </Flex>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UploadPdf;
