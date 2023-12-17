import React from "react";
import "../OrderPopUp/OrderPopup.css";
import { useState } from "react";
import { useFormik } from "formik";
import BtnLoader from "../BtnLoader/BtnLoader";
import axios from "axios";
import Swal from "sweetalert2";
const OrderPopup = ({ setShowPopup, user, id }) => {
  const [loading, setLoading] = useState(false);
  const handleOrder = async () => {
    try {
      setLoading(true);
      const userData = {
        userName: values.userName,
        number: values.number,
        email: values.email,
        address: values.address,
        userEmail: user.email,
        artId: id,
      };

      const {data} = await axios.post('http://localhost:4000/api/v1/arts/order',userData)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Order has been placed successfully, seller will contact you soon',
        showConfirmButton: false,
        timer: 2500
      })
      setLoading(false);
      setShowPopup(false)
    } catch (error) {
        setLoading(false)
        Swal.fire({
            icon: 'error',
            title: 'Please fix the errors above',
            text: `Some error occured Please try again or contact customer support`
          })
    }
  };

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      userName: "",
      number: "",
      email: "",
      address: "",
    },
    onSubmit: handleOrder,
  });
  return (
    <>
      <div className="popup max-width-1440">
        <div className="popup-inner">
          <h1>Order Now</h1>
          <form className="popup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="userName"
              name="userName"
              value={values.userName}
              onChange={handleChange}
              placeholder="User Name"
            />
            <input
              type="text"
              name="number"
              value={values.number}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={values.address}
              onChange={handleChange}
            />

            <div className="buttons">
              <button className="cancel" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
              <button
                disabled={loading ? true : false}
                className="send"
                type="submit"
              >
                {loading ? <BtnLoader /> : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderPopup;
