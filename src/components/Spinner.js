import React from 'react'
import firebase from 'firebase'
import useLoggedIn from '../hooks/useLoggedIn'
import {
 View,
 Text,
 TextInput,
 StyleSheet,
 ActivityIndicator,
} from 'react-native'

const Spinner = ({ size }) => {
 return (
  <View style={styles.spinnerStyle}>
   <ActivityIndicator size={size || 'large'} />
  </View>
 )
}

const styles = StyleSheet.create({
 spinnerStyle: {
  // height: 50,
  // width: 50,
  flexDirection: 'column',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
})

export default Spinner
