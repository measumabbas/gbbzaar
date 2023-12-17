import React from 'react'
import '../EmailVerificationPage/EmailVerfication.css'

const EmailVerfication = () => {
    return (
        <>
            <section className="email-verify">
                <div className="emailverify">
                    <h1>Verify Your Email</h1>
                    <p>Please enter your email to receive verification code</p>
                    <input type="email" name="" id="" placeholder='Enter your E-mail' />
                    <button>Send</button>
                </div>
            </section>
        </>
    )
}

export default EmailVerfication