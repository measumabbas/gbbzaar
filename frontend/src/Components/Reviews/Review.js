import React from 'react'
import '../Reviews/Review.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
import ReactStars from 'react-stars'

const Review = ({ reviewpara, reviewimg,review }) => {
  // console.log(review)
  return (
    <>
      <section className="review">
        <div className="review-card">
          <div className="review-card-up">
            <h1>{review.user.name}</h1>
            <img src={review.user.profileUrl} alt="" />
          </div>
          <div className="review-center">
            <p>{review.comment}</p>
            
          </div>
          <div className="review-card-stars">

            <ReactStars count={5} size={24} value={review.rating} color2={'#ffd700'} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Review