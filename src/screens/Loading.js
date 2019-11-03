import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import useLoggedIn from '../hooks/useLoggedIn'
import firebase from 'firebase'
import firebaseConfig from '../../firebase-config'

const Loading = props => {
  const { loggedIn, setLoggedIn } = useLoggedIn()

  useEffect(() => {
    console.log('in loading')
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
      props.navigation.navigate('Search')
    })
  }, [])
  console.log('in loading not useEffect')
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator size='large' />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loading
