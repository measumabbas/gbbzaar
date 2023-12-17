import React from 'react'
import '../ContinuePostPage/ContinuePost.css'

const ContinuePost = () => {
  return (
    <>
    <section className="continue-post">
        <div className="continuepost">
            <h1>Please provide details to post</h1>
            <div className="inputs">
                <p>Contact Number:</p>
                <input type="number" placeholder='+92' />
                <p>Email Address</p>
                <input type="email" placeholder='Enter your E-mail' />
                <p>Address</p>
                <input type="email" placeholder='Enter your Address' />
            </div>
            <button>Sign In</button>
        </div>
    </section>
    </>
  )
}

export default ContinuePost