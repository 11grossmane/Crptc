import React, { useEffect, useReducer, useContext } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import useLoggedIn from '../hooks/useLoggedIn'
import { app } from '../../firebase-config'
import firebaseConfig from '../../firebase-config'
import logger from 'use-reducer-logger'
import { reducer, toggleLi } from '../store/reducer'
import UserContext from '../context/UserContext'
const Loading = props => {
  //const { loggedIn, setLoggedIn } = useLoggedIn()
  const { loggedIn, setLoggedIn } = useContext(UserContext)
  //   const [loggedIn, setLoggedIn] = useReducer(logger(reducer), false)

  useEffect(() => {
    console.log('in loading')
    // firebase.initializeApp(firebaseConfig)
    app.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true)
        props.navigation.navigate('RecentWords')
      } else {
        setLoggedIn(false)
        props.navigation.navigate('LoginForm')
      }
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
