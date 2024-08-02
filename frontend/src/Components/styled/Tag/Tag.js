import React from 'react'
import './style.css'
import Flex from '../Flex/Flex'
import {X} from 'react-feather'
const Tag = ({children,onClick,className}) => {
  return (
    <Flex align='center' justify='space-between' className={`global-tag ${className}`} gap={10}>
        <p>{children}</p>
        <X onClick={onClick} color='#fff' cursor='pointer' size={15}/>
    </Flex>
  )
}

export default Tag
