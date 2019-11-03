import React, { useState, useReducer, useContext } from 'react'
import firebase from 'firebase'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Card, CardSection, Button, Spinner } from './index'
import { withNavigation } from 'react-navigation'
import useLoggedIn from '../hooks/useLoggedIn'
import logger from 'use-reducer-logger'
import { reducer, toggleLi } from '../store/reducer'
import UserContext from '../context/UserContext'
const LoginForm = props => {
  //const { loggedIn, setLoggedIn } = useLoggedIn()
  // const [loggedIn, setLoggedIn] = useReducer(logger(reducer), false)
  const { loggedIn, setLoggedIn } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function onButtonPress() {
    setError('')
    setLoading(true)

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(onLoginSuccess)
      .catch(() =>
        firebase.auth().createUserWithEmailAndPassword(email, password)
      )
      .then(onLoginSuccess)
      .catch(onLoginFail)
    //this.setState({ loading: false })
  }

  function onLoginSuccess() {
    setLoading(false)
    setLoggedIn(false)
  }

  function onLoginFail() {
    setError('authentication error')
    setLoading(false)
    setLoggedIn(false)
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
          <Button onPress={onButtonPress}>Log in</Button>
        )}
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
