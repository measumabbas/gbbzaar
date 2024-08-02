import React from 'react'
import './style.css'
const ResponsiveContainer = ({children}) => {
  return (
    <div className='global-responsive-container'>
      {children}
    </div>
  )
}

export default ResponsiveContainer
