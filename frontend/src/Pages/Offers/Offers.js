import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../store/actions/userActions";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./style.css";
import Tabs from "../../Components/styled/Tabs/Tabs";
import { acceptOffer, getAllOffers } from "../../store/actions/offerActions";
import Loader from "../../Components/Loader/Loader";
import { prettifyDate } from "../../utills/prettifyDate";
import { Edit, Edit2 } from "react-feather";
import { BookConditionBadge } from "../../Components/LandingCard/LandingCard";
import Flex from "../../Components/styled/Flex/Flex";
import ReactStars from "react-stars";
import Popup from "../../Components/styled/Popup/Popup";
import GlobalDropDown from "../../Components/styled/Form/GlobalDropDown/GlobalDropDown";
import Button from "../../Components/styled/Button/Button";
import { toast } from "react-toastify";
const Offers = () => {
  const [isLoggedIn, setIsloggedIn] = useState(true);
  const loggedUser = useSelector((state) => state.user);
  const {
    getLoading,
    getError,
    offers,
    acceptLoading,
    acceptError,
    acceptSuccess,
  } = useSelector((state) => state.offer);
  // console.log(arts)
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Sent");
  useEffect(() => {
    dispatch(loadUser);
    if (loggedUser?.user?._id) {
      dispatch(
        getAllOffers({
          id: loggedUser.user._id,
          mode: activeTab === "Sent" ? "sent" : "received",
        })
      );
    }
  }, [dispatch, loggedUser.user, activeTab]);
  useEffect(() => {
    if (acceptSuccess) {
      toast.success("Offer Accepted successfuly");
      setPopup(null)
    }
    if (acceptError) {
      toast.error(acceptError);
    }
  }, [acceptSuccess, acceptError]);
  const [popup, setPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn} />
      <div className="offers-container" style={{ minHeight: "80vh" }}>
        <div className="max-width-1440 offers-inner-container">
          <h1>Browse offers</h1>

          <Tabs
            activeOption={activeTab}
            setActiveOption={setActiveTab}
            options={["Sent", "Received"]}
          />
          {getLoading ? (
            <div>
              <Loader />
            </div>
          ) : !getError ? (
            <>
              <div className="show-offers-container">
                {offers && offers.length > 0 ? (
                  <>
                    <div className="offers">
                      <table>
                        <thead>
                          <tr>
                            <th>Offered with book</th>
                            <th>Offered to book</th>
                            <th>Date</th>
                            <th>status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {offers.map((offer) => {
                            return (
                              <tr key={offer?._id} className="offer">
                                <td>
                                  <Flex align="center" justify="space-between">
                                    {offer?.offered_by_book?.title}
                                    <BookConditionBadge
                                      condition={
                                        offer?.offered_by_book?.condition
                                      }
                                      position="static"
                                    />
                                  </Flex>
                                  <Flex
                                    justify="space-between"
                                    className="mt-20"
                                  >
                                    <div>
                                      <small style={{ color: "#000" }}>
                                        By {offer?.offered_by_book?.author}
                                      </small>
                                      <br />
                                      <small style={{ color: "#000" }}>
                                        Uploaded By {offer?.offered_by?.name}
                                      </small>
                                      <br />
                                      <div
                                        className="review-card-stars"
                                        style={{
                                          display: "flex",
                                          alignItems: "cenetr",
                                          gap: "5px",
                                          paddingLeft: "0",
                                          marginLeft: "0",
                                        }}
                                      >
                                        <ReactStars
                                          count={5}
                                          size={15}
                                          value={parseInt(
                                            offer?.offered_by_book?.ratings
                                          )}
                                          color2="#ffd700"
                                        />
                                        <small
                                          style={{
                                            color: "#000",
                                            transform: "translateY(3px)",
                                          }}
                                        >{`(${offer?.offered_by_book?.numOfReviews})`}</small>
                                      </div>
                                    </div>
                                    <img
                                      src={offer?.offered_by_book?.imageUrl}
                                      alt=""
                                      style={{ maxWidth: "100px" }}
                                    />
                                  </Flex>
                                </td>
                                <td>
                                  <Flex align="center" justify="space-between">
                                    {offer?.offered_to_book?.title}
                                    <BookConditionBadge
                                      condition={
                                        offer?.offered_to_book?.condition
                                      }
                                      position="static"
                                    />
                                  </Flex>
                                  <Flex
                                    justify="space-between"
                                    className="mt-20"
                                  >
                                    <div>
                                      <small style={{ color: "#000" }}>
                                        By {offer?.offered_to_book?.author}
                                      </small>
                                      <br />
                                      <small style={{ color: "#000" }}>
                                        Uploaded By {offer?.offered_to?.name}
                                      </small>
                                      <br />
                                      <div
                                        className="review-card-stars"
                                        style={{
                                          display: "flex",
                                          alignItems: "cenetr",
                                          gap: "5px",
                                          paddingLeft: "0",
                                          marginLeft: "0",
                                        }}
                                      >
                                        <ReactStars
                                          count={5}
                                          size={15}
                                          value={parseInt(
                                            offer?.offered_to_book?.ratings
                                          )}
                                          color2="#ffd700"
                                        />
                                        <small
                                          style={{
                                            color: "#000",
                                            transform: "translateY(3px)",
                                          }}
                                        >{`(${offer?.offered_to_book?.numOfReviews})`}</small>
                                      </div>
                                    </div>
                                    <img
                                      src={offer?.offered_to_book?.imageUrl}
                                      alt=""
                                      style={{ maxWidth: "100px" }}
                                    />
                                  </Flex>
                                </td>
                                <td>{prettifyDate(offer?.createdAt)}</td>
                                <td>{offer?.status}</td>
                                <td>
                                  <Flex align="center" justify="center">
                                    <Edit2
                                      cursor="pointer"
                                      size={18}
                                      onClick={() => setPopup(offer._id)}
                                    />
                                  </Flex>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <h3>No Offers to show</h3>
                )}
              </div>
            </>
          ) : (
            <h3>{getError}</h3>
          )}
        </div>
      </div>
      <Footer />
      {popup && (
        <Popup popUp={popup} setPopUp={setPopup} className="accept-offer-popup">
          <h2>Accept Or Decline offer</h2>
          <GlobalDropDown
            setStateHandler={setSelectedStatus}
            stateHandler={selectedStatus}
            options={[
              { name: "Approve", value: "approved" },
              { name: "Decline", value: "declined" },
            ]}
          />
          <div style={{marginBottom:'30px'}}>

          </div>
          <Flex align="center" justify="flex-emd">
            <Button
              label="Save"
              handleClick={() => {
                if (selectedStatus.value === "approved") {
                  dispatch(acceptOffer({ data: { id: popup } }));
                }
              }}
              loading={acceptLoading}
            />
          </Flex>
        </Popup>
      )}
    </div>
  );
};

export default Offers;
