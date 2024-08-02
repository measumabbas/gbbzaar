
import './App.css';
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Home from './Pages/Home/Home'
import Post from './Pages/PostPage/Post'
import Profile from './Pages/Profile/Profile'
import LandingPage from './Pages/LandingPage/LandingPage'
import Upload from './Pages/UploadPage/Upload'
import SignInDetails from './Pages/SignInDetails/SignInDetails'
import ForgetPassword from './Pages/ForgetPasswordPage/ForgetPassword';
import Verification from './Pages/PasswordVerificationPage/Verification';
import NewPassword from './Pages/NewPasswordPage/NewPassword';
import EmailCode from './Pages/EmailCodeConfirmationPage/EmailCode';
import EmailVerfication from './Pages/EmailVerificationPage/EmailVerfication';
import ContinuePost from './Pages/ContinuePostPage/ContinuePost';
import EditProfileDetail from './Pages/EditProfileDetails/EditProfileDetail';
import EditPostProduct from './Pages/EditPostProduct/EditPostProduct';
import AboutUs from './Pages/AboutUsPage/AboutUs';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

// Comment

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './store/actions/userActions';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import ProtectedRoute from './Components/protectedRoute/protectedRoute';
import UnProtectedRoute from './Components/protectedRoute/UnProtectedRoute';
import Loader from './Components/Loader/Loader';
import UserProfile from './Pages/userProfile/UserProfile';
import Offers from './Pages/Offers/Offers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Pdf from './Pages/Pdf/Pdf';
import UploadPdf from './Pages/UploadPdf/UploadPdf';


function App() {

  const dispatch = useDispatch()
  const {token,isAuthenticated,isEmailVerified,isAllDetails} = useSelector(state => state.token)
  // const {user:{isEmailVerified}} = useSelector(state => state.user)
  // console.log(user.isEmailVerified)
  // const {isAuthenticated} = useSelector(state => )
  // console.log(token)
  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch,token])

  const [isLoggedIn, setIsloggedIn] = useState(true)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn}/>} />
        <Route path='/landingpage' element={<LandingPage />} />
        <Route path='/pdf' element={<Pdf />} />
        <Route path='/profile/:id' element={<UserProfile/>}/>
        <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated} isEmailVerified={isEmailVerified} isAllDetails={isAllDetails}>
          <Profile/>
        </ProtectedRoute>} />
        <Route path='/post/:id' element={<Post/>} />
        <Route path='/editprofiledetail' element={<ProtectedRoute isAuthenticated={isAuthenticated} isEmailVerified={isEmailVerified}  isAllDetails={isAllDetails}>
          <EditProfileDetail/>
        </ProtectedRoute>} />

        <Route path='/upload' element={<ProtectedRoute isAuthenticated={isAuthenticated} isEmailVerified={isEmailVerified} isAllDetails={isAllDetails}>
          <Upload/>
        </ProtectedRoute>} />
        <Route path='/upload-pdf' element={<ProtectedRoute isAuthenticated={isAuthenticated} isEmailVerified={isEmailVerified} isAllDetails={isAllDetails}>
          <UploadPdf/>
        </ProtectedRoute>} />
        <Route path='/offers' element={<ProtectedRoute isAuthenticated={isAuthenticated} isEmailVerified={isEmailVerified} isAllDetails={isAllDetails}>
          <Offers/>
        </ProtectedRoute>} />
       
        <Route path='/signup' element={<UnProtectedRoute isAuthenticated={isAuthenticated} >
          <SignIn isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn}/>
        </UnProtectedRoute>}/>
        <Route path='/login' element={<UnProtectedRoute isAuthenticated={isAuthenticated}>
          <SignUp isLoggedIn={isLoggedIn} setIsloggedIn={setIsloggedIn}/>
        </UnProtectedRoute>}/>
       
        <Route path='/forgetpassword' element={<UnProtectedRoute isAuthenticated={isAuthenticated}>
          <ForgetPassword/>
        </UnProtectedRoute>}/>
 
        <Route path='/verification' element={<UnProtectedRoute isAuthenticated={isAuthenticated}>
          <Verification/>
        </UnProtectedRoute>}/>
      
        <Route path='/newpassword' element={<UnProtectedRoute isAuthenticated={isAuthenticated}>
          <NewPassword/>
        </UnProtectedRoute>}/>
    
        <Route path='/signindetails' element={<ProtectedRoute isAuthenticated={isAuthenticated} isEmailVerified={isEmailVerified} isAllDetails={isAllDetails}>
          <SignInDetails/>
        </ProtectedRoute>} />

        <Route path='/emailcode' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAllDetails={isAllDetails}>
          <EmailCode isEmailVerified={isEmailVerified}/>
        </ProtectedRoute>} />
  
        <Route path='/emailverification' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAllDetails={isAllDetails}>
          <EmailVerfication/>
        </ProtectedRoute>} />
      
        <Route path='/continuepost' element={<ProtectedRoute isAuthenticated={isAuthenticated} isEmailVerified={isEmailVerified} isAllDetails={isAllDetails}>
          <ContinuePost/>
        </ProtectedRoute>} />

        <Route path='/editpostproduct/:id' element={<ProtectedRoute isAuthenticated={isAuthenticated} isAllDetails={isAllDetails} isEmailVerified={isEmailVerified}>
          <EditPostProduct/>
        </ProtectedRoute>}/>
        <Route path='/aboutus' element={<AboutUs/>} />
        <Route path='/loader' element={<Loader/>}/>


      </Routes>
        <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
