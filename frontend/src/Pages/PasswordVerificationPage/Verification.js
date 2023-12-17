import React, { useEffect, useRef, useState } from "react";
import "./Verification.css";
import BtnLoader from "../../Components/BtnLoader/BtnLoader";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch,useSelector } from "react-redux";
import { VERIFY_PASS_RESET } from "../../store/constants/userConstants";
import { useNavigate } from "react-router-dom";
import { verifyPassword } from "../../store/actions/userActions";
const Verification = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const {error,loading,success} = useSelector(state => state.verifyPassword)
  useEffect(()=>{
    if(error){
      Swal.fire({
        icon: 'error',
        title: 'Please fix the errors above',
        text: `${error}`
      })
    }
    dispatch({type:VERIFY_PASS_RESET})
  },[error])
  useEffect(()=>{
    if(success){
      navigate('/newpassword')
    }
    dispatch({type:VERIFY_PASS_RESET})
  },[success])

  const handlePasswordVerify = async ()=>{
    dispatch(verifyPassword(otp))
  }

  return (
    <>
      <section className="verification">
        <div className="verification-content">
          <h1>Enter Verification Code</h1>
          <div className="code">
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
          <button
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
            disabled={loading ? true : false}
            onClick={handlePasswordVerify}
          >
            {loading ? <BtnLoader /> : "Submit"}
          </button>
        </div>
      </section>
    </>
  );
};

export default Verification;
