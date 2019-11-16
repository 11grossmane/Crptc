import React, { useState, useContext } from 'react'
import { app, db } from '../../firebase-config'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Card, CardSection, Button, Spinner } from '../components/index'
import { withNavigation } from 'react-navigation'

import UserContext from '../context/UserContext'
import * as GoogleSignin from 'expo-google-sign-in'
import * as Google from 'expo-google-app-auth'

const LoginForm = ({ navigation }) => {
  //const { loggedIn, setLoggedIn } = useLoggedIn()
  // const [loggedIn, setLoggedIn] = useReducer(logger(reducer), false)
  const { loggedIn, setLoggedIn, curUser, setCurUser } = useContext(UserContext)
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
      .then(data => onLoginSuccess(data))
      .catch(error => onLoginFail(error))

    //adding user to firestore
    //this.setState({ loading: false })
  }

  async function onLoginSuccess(data) {
    if (data && data.user) {
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
        setCurUser({ ...snapData, id: snapId.toString() })
        // setLoading(false)
        // setLoggedIn(true)
        // setError('')
        navigation.navigate('RecentWords', {
          curUser: {
            ...snapData,
            id: snapId.toString(),
          },
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  function onLoginFail(error) {
    console.log('error', error)
    setError('authentication error')
    setLoading(false)
    //setLoggedIn(false)
  }
  console.log('rerendering login form')
  if (loggedIn === true) {
    return (
      <CardSection>
        <Button onPress={() => setLoggedIn(false)}>Log out</Button>
      </CardSection>
    )
  }
  return (
    <Card>
      <CardSection>
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
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    marginBottom: 1,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    // alignItems: 'center',//this would shrink the search bar and override flex property
    justifyContent: 'space-between',
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
})

export default withNavigation(LoginForm)
