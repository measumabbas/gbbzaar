import React from 'react'
import '../Footer/Footer.css'
import arrow1 from '../Footer/arrow1.png'

const Footer = () => {
    return (
        <>

            <section className="footer" style={{marginTop:'30px'}}>
                <div className="max-width-1440">
                    <div className="footer-content">

                        <div className="column1">
                            <h1 className="c1-header">GB ArtBazar</h1>
                            <p className="c1-para">Collaboration platform for individual artist.</p>
                        </div>

                        <div className="column2">
                            <h1 className="c2-header">Company</h1>
                            <p className="c2-para1">About Us</p>
                            <p className="c2-para2">Careers</p>
                            <p className="c2-para3">Support</p>
                            <p className="c2-para4">Knowledgebase</p>
                        </div>

                        <div className="column3">
                            <h1 className="c3-header">Features</h1>
                            <p className="c3-para1">Screen Sharing</p>
                            <p className="c3-para2">iOS & Android Apps</p>
                            <p className="c3-para3">File Sharing</p>
                            <p className="c3-para4">User Management</p>

                        </div>
                        <div className="column4">
                            <h1 className="c4-header">Contact Us</h1>
                            <p className="c4-para1">GBArtsBazaar@gmal.com</p>
                            <p className="c4-para2">03479838577</p>
                            <p className="c4-para3">IdeoMetriX office Sonikot Gilgit</p>

                        </div>
                        <div className="column5">
                            <h1 className="c5-header">Stay up to date</h1>
                            <p className="c5-para1">Subscribe to our newsletter</p>
                            <div className="footer-input">
                                <input className='footer-email' type="email" placeholder='Email' name='Email' id='email' />
                                <div className="arrow1-icon">
                                    <img src={arrow1} alt="" />
                                </div>
                            </div>

                        </div>


                    </div>
                    
                    <p className="copyright">© Copyright GBArtsBazaar</p>

                </div>



                


            </section>

        </>
    )
}

export default Footer