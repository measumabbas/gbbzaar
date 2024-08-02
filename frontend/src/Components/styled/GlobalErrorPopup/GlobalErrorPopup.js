import React from 'react'
import './style.css'
import Flex from '../../styled/Flex/Flex'
const GlobalErrorPopup = ({error}) => {
  return (
    <Flex className='global-error-popup' align='center' justify='center' direction="column" >
      <img src="/icons/error.png" alt="error" />
      <p>{error}</p>
      
    </Flex>
  )
}

export default GlobalErrorPopup
