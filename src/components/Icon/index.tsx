import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { IconProps } from 'react-native-vector-icons/Icon'

interface Props extends IconProps {
  icomoon?: boolean
}

const Icon = ({ size = 18, color = '#000', style, ...props }: Props) => {
  const Wrapper = FontAwesome // Check if it is icomoon or not later
  return <Wrapper size={size} color={color} style={style} {...props} />
}

export default Icon
