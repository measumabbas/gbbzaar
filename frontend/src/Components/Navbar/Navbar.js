import React from 'react'
import '../Navbar/Navbar.css'
import searchimg from '../Navbar/search.png'
import bellicon from '../Navbar/notification-bing.png'
import profileicon from '../Navbar/profileimage.png'
import { HiOutlineLogout } from 'react-icons/hi'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleLogout } from '../../store/actions/userActions'
const Navbar = ({ isLoggedIn, setIsloggedIn }) => {

    const { isAuthenticated } = useSelector(state => state.token)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleOnClick = () => {
        // setIsloggedIn(false);
        dispatch(handleLogout())
    }
    return (

        <div className='main-outer-navbar'>
            <section className="navbar max-width-1440">
                <div className="navbar-left-links">
                    <Link to={'/'}>
                        <div className="left-navbar">
                            <h1 className="logo" style={{color:'#5C2E88'}}><span className='primary-blue-color'> Book</span> Spot</h1>
                        </div>
                    </Link>

                    <div className="navbar-left-home-links">
                        <Link to={'/'}>Home</Link>
                        <Link to={'/aboutus'}>About Us</Link>
                        <Link to={'/aboutus'}>Contact Us</Link>
                        <Link to={'/pdf'}>Pdf Books</Link>
                    </div>


                </div>



                {
                    isAuthenticated ? (<div className="right-navbar">
                        {/* <div className="navbar-input">
                            <input className='navbar-search' type="input" placeholder='Search..' name='Search' id='search' />
                            <div className="search-icon">
                                <img className='search-img' src={searchimg} alt="" />
                            </div>
                        </div> */}
                        {/* <Link to={'/aboutus'}><img className='bell-icon' src={bellicon} alt="" /></Link> */}
                        
                        <Link className='profile-links' to='/profile'><img className='profile-icon' src={user?.profileUrl} alt="" />
                            <Link to='/' className="logout" onClick={handleOnClick}>
                                <HiOutlineLogout className='logout-icon' />
                                <span>Log Out</span>
                            </Link>
                        </Link>


                    </div>) : (
                        <>
                            <div className="header-right">
                                <Link to={'/login'}> <button className="landing-signin-btn">Sign In</button></Link>
                                <Link to={'/signup'}> <button className="landing-register-btn" style={{boxShadow:'none'}}>Register</button></Link>


                            </div>
                        </>
                    )
                }

            </section>
        </div>
    )
}

export default Navbar