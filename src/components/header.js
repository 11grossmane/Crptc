import React from 'react'
import { Text, View } from 'react-native'
import { Icon } from 'native-base'

// Make a component
const Header = props => {
  const { textStyle, viewStyle, iconStyle } = styles

  return (
    <>
      <Text style={textStyle}>{props.headerText}</Text>
      <Icon style={iconStyle} name='md-contacts' />
    </>
  )
}

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
  },
  iconStyle: {
    padding: 2,
    margin: 2,
  },
}

// Make the component available to other parts of the app
export default Header
