import React from 'react'
import './style.css'
const Popup = ({children,className,popUp,setPopUp}) => {
  return (
    <div className='global-popup' onClick={()=> setPopUp(false)}>
      <div className={`gloabal-popup-inner ${className}`} onClick={(e)=> e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Popup
