
import React,{useEffect} from 'react'
import './EditProfileDetail.css'
import profilepic from '../../Pages/Profile/profilpic.png'

import { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { updateUserData } from '../../store/actions/userActions'
import { useNavigate } from 'react-router-dom'
import BtnLoader from '../../Components/BtnLoader/BtnLoader'
import axios from 'axios'
import Swal from 'sweetalert2'
import { UPDATE_USER_DETAIL_FAIL, UPDATE_USER_DETAIL_REQUEST } from '../../store/constants/userConstants'

const EditProfileDetail = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAllDetails} = useSelector(state => state.token)
    const {loading,error} = useSelector(state => state.updateUser)
    useEffect(()=>{
        if(isAllDetails){
            navigate('/profile')
        }
    },[dispatch,isAllDetails])

    useEffect(()=>{
      if(error){
        Swal.fire({
          icon: 'error',
          title: 'Please fix the error above',
          text: `${error}`
        })
      }
    },[dispatch,error])
    const {user} = useSelector(state => state.user)
    const handleSubmit = async ()=>{
        dispatch({type:UPDATE_USER_DETAIL_REQUEST})
        const myForm = new FormData()
        myForm.append('file',selectedImage)
        myForm.append('upload_preset','oha7na0l')
        myForm.append('cloud_name','drkf8to4g')
        try {
            const res = await axios.post('https://api.cloudinary.com/v1_1/drkf8to4g/image/upload',myForm)
            // console.log(res.data.url)
            const data = {
                email:user.email,
                wNumber:formik.values.wNumber.toString(),
                cNumber:formik.values.cNumber.toString(),
                address:formik.values.address,
                profileUrl:res.data.url
            }
            dispatch(updateUserData(data))

            // window.location.reload()
        } catch (error) {
          dispatch({type:UPDATE_USER_DETAIL_FAIL,error:error.message})
          Swal.fire({
            icon: 'error',
            title: 'Please fix the error above',
            text: `Some error occured try again later`
          })
        }
        // dispatch(updateUserData(myForm))
    }



    const formik = useFormik({
        initialValues:{
            file:null,
            wNumber:'',
            cNumber:'',
            address:''

        },
        onSubmit:handleSubmit
    })

    
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
  
      // Check if the file is an image
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const image = new Image();
  
          image.onload = () => {
            // Get the width and height of the image
            const { width, height } = image;
  
            // Define the minimum and maximum allowed sizes
            const minWidth = 50;
            const minHeight = 50;
            const maxWidth = 1200;
            const maxHeight = 1200;
  
            // Perform size validation here
            if (
              width >= minWidth &&
              height >= minHeight &&
              width <= maxWidth &&
              height <= maxHeight
            ) {
              // Image size is valid, set the selected image and show success message
              setSelectedImage(reader.result);
              setErrorMessage('');
              
            } else {
              // Image size is not valid, show an error message
              setErrorMessage(
                'Image size is not within the allowed limits(50-1200 x 50-1200).'
              );
              setSelectedImage(null);
            }
          };
  
          image.src = reader.result;
        };
  
        reader.readAsDataURL(file);
      } else {
        setErrorMessage('Please select an image');
        setSelectedImage(null);
      }
    };
    
    return (
        <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>

            <form onSubmit={formik.handleSubmit}>
            <section className="profile-form">
              <label htmlFor="file" style={{cursor:'pointer'}}>

              <div>
                {selectedImage ? (
                <div className="profile-form-left">
                    <div className="profile-form-left-img">
                    {selectedImage && <img src={selectedImage} alt="Selected Img" />}
                        
                    </div>
                </div>
                ) : (
                <div className="profile-form-left">
                    <div className="profile-form-left-img">
                        <img src={profilepic} alt="" />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>

                )}
              </div>
              </label>
              <input type="file" id='file' name='file' style={{display:'none'}} onChange={handleImageUpload}/>
                <div className="profile-form-right">
                    <div className="form-inputs">
                        <label htmlFor="wNumber">Whatsapp Number</label>
                        <input type="number" id='wNumber' name='wNumber' placeholder='Enter Your Whats app number' onChange={formik.handleChange} value={formik.values.wNumber}/>
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="cNumber">Contact Number</label>
                        <input type="text" id='cNumber' name='cNumber' placeholder='Enter Your contact number' onChange={formik.handleChange} value={formik.values.cNumber}/>
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="address">Address</label>
                        <input type="text" id='address' name='address' placeholder='Enter Your Address' onChange={formik.handleChange} value={formik.values.address}/>
                    </div>
                    <button type='submit' className='form-save-btn' disabled={loading?true:false}>{loading?<BtnLoader/>:'Save and Continue'}</button>
                </div>
            </section>
            </form>
           
        </div>
    )
}

export default EditProfileDetail