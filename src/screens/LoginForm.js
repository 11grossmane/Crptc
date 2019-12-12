import React, { useState, useContext } from 'react'
import { app, db } from '../../firebase-config'
import {
 View,
 Text,
 TextInput,
 StyleSheet,
 ImageBackground,
} from 'react-native'
import { Card, CardSection, Button, Spinner } from '../components/index'
import { withNavigation } from 'react-navigation'

import UserContext from '../context/UserContext'
import * as Google from 'expo-google-app-auth'
import { NavigationActions, StackActions } from 'react-navigation'
import { setCurUser } from '../context/store'
import { connect } from 'react-redux'
const LoginForm = ({ navigation, setCurUser }) => {
 //local state below because form
 const [email, setEmail] = useState('brigitte.maggio@gmail.com')
 const [password, setPassword] = useState('yolo123')
 const [error, setError] = useState('')
 const [loading, setLoading] = useState(false)
 async function onGoogleButtonPress() {
  try {
   const result = await Google.logInAsync({
    androidClientId:
     '888787169491-k68gp3tmna1jvd3mcsq89p3c9n7g3chh.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
   })

   if (result.type === 'success') {
    onLoginSuccess(result)
    return result.accessToken
   } else {
    return { cancelled: true }
   }
  } catch (e) {
   onLoginFail(e)
   return { error: true }
  }
 }

 function onButtonPress() {
  setError('')
  setLoading(true)

  //adding user to auth db
  app
   .auth()
   .signInWithEmailAndPassword(email, password)
   .then(data => onLoginSuccess(data))
   .catch(() =>
    //if there is an error signing in, create new user
    app.auth().createUserWithEmailAndPassword(email, password)
   )
   .then(data => {
    if (data) onLoginSuccess(data)
   })
   .catch(error => onLoginFail(error))

  //adding user to firestore
  //this.setState({ loading: false })
 }

 async function onLoginSuccess(data) {
  console.log('data is', data)
  try {
   const { email, password } = data.user
   const snapshot = await db
    .collection('users')
    .where('email', '==', email)
    .get()
   let snapData = snapshot.docs[0].data()

   let snapId = !snapshot.empty ? snapshot.docs[0].id : email
   if (snapId === email) {
    let newUser = await db
     .collection('users')
     .doc(`${snapId}`)
     .set({
      name: email.split('@')[0],
      email,
     })
    snapData = newUser.data()
   }
   await setCurUser({ ...snapData, id: snapId.toString() })
   // setLoading(false)
   // setLoggedIn(true)
   // setError('')

   navigation.navigate({ routeName: 'RecentWords' })

   //  navigation.navigate('RecentWords', {
   //   curUser: {
   //    ...snapData,
   //    id: snapId.toString(),
   //   },
   //  })
  } catch (e) {
   console.error(e)
  }
 }

 function onLoginFail(error) {
  console.log('error', error)
  setError('authentication error')
  setLoading(false)
  //setLoggedIn(false)
 }
 console.log('rerendering login form')
 // if (loggedIn === true) {
 //   return (
 //     <CardSection>
 //       <Button onPress={() => setLoggedIn(false)}>Log out</Button>
 //     </CardSection>
 //   )
 // }
 return (
  <ImageBackground
   source={require('../../assets/crptc-icon.png')}
   style={styles.image}
  >
   <Text style={{ color: 'white', fontSize: 50, alignSelf: 'center' }}>
    Crptc
   </Text>

   <Card style={styles.backgroundStyle}>
    <CardSection style={{ marginTop: 10 }}>
     <TextInput
      style={styles.inputStyle}
      autoCompleteType={'email'}
      placeholder='User Name'
      importantforAutofill={true}
      autoCapitalize='none'
      autoCorrect={false}
      value={email}
      onChangeText={val => setEmail(val)}
     />
    </CardSection>
    <CardSection>
     <TextInput
      style={styles.inputStyle}
      autoCompleteType={'password'}
      importantforAutofill={true}
      secureTextEntry={true}
      placeholder='Password'
      autoCapitalize='none'
      autoCorrect={false}
      value={password}
      onChangeText={val => setPassword(val)}
     />
    </CardSection>
    {error.length > 0 && (
     <Text style={{ fontSize: 20, color: 'red' }}>{error}</Text>
    )}
    <CardSection>
     {loading === true ? (
      <Spinner />
     ) : (
      <Button color='blue' onPress={onButtonPress}>
       Log in/Signup
      </Button>
     )}
     <Button color='red' onPress={onGoogleButtonPress}>
      Log in with Google
     </Button>
    </CardSection>
   </Card>
  </ImageBackground>
 )
}

const styles = StyleSheet.create({
 image: {
  //position: 'absolute',
  flex: 1,
  resizeMode: 'cover',
  width: '100%',
  height: '100%',
  //alignItems: 'center',
  justifyContent: 'center',
 },

 backgroundStyle: {
  marginTop: 10,
  marginBottom: 1,
  backgroundColor: 'transparent',
  height: 50,
  borderRadius: 5,
  marginHorizontal: 15,
  flexDirection: 'row',
  // alignItems: 'center',//this would shrink the search bar and override flex property
  justifyContent: 'space-between',
  opacity: 50,
 },
 inputStyle: {
  flex: 1,
  fontSize: 18,
  color: 'darkslategray',
  backgroundColor: 'transparent',
 },
 iconStyle: {
  fontSize: 35,
  alignSelf: 'center',
  marginHorizontal: 15,
 },
})

export default withNavigation(connect(null, { setCurUser })(LoginForm))
