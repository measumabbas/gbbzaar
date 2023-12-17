import React, { useRef, useState, useEffect } from "react";
import "../EmailCodeConfirmationPage/EmailCode.css";
import { useDispatch, useSelector } from "react-redux";
import { userEmailVerify } from "../../store/actions/userActions";
import { CLEAR_USER_EMAIL_VERIFY_ERRORS } from "../../store/constants/userConstants";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BtnLoader from "../../Components/BtnLoader/BtnLoader";
const EmailCode = ({ isEmailVerified }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.emailVerify);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Please fix the error above",
        text: `invalid email verification token`,
      });
      dispatch({ type: CLEAR_USER_EMAIL_VERIFY_ERRORS });
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isEmailVerified) {
      navigate("/profile");
    }
  }, [dispatch, isEmailVerified]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [otp, setOtp] = useState("");

  const handleChange = (index, event) => {
    const { value } = event.target;
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.disabled = false;
      inputRefs[index + 1].current.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs[index].current.disabled = true;
      inputRefs[index - 1].current.focus();
    }

    // Update the 'otp' state with the entered numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp.join(""));
  };

  const handleVerify = () => {
    dispatch(userEmailVerify(otp));
  };
  return (
    <>
      <section className="email-code">
        <div className="emailcode">
          <h1>Enter Code</h1>
          <p>We have sent you access code via email for verification</p>
          <div className="code">
            {/* <input type="number" />
          <input type="number" />
          <input type="number" />
          <input type="number" /> */}
            {inputRefs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type="text"
                maxLength="1"
                style={{
                  width: "40px",
                  height: "40px",
                  fontSize: "24px",
                  marginRight: "10px",
                }}
                onChange={(event) => handleChange(index, event)}
                disabled={index !== 0}
              />
            ))}
          </div>
          <div className="resend">
            <p>If you didn’t receive a code, </p>
            <p className="resend-code">Resend</p>
          </div>
          <button disabled={loading ? true : false} onClick={handleVerify}>
            {loading ? <BtnLoader /> : "Verify"}
          </button>
        </div>
      </section>
    </>
  );
};

export default EmailCode;
