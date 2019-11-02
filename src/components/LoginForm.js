import React from 'react'
import firebase from 'firebase'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Card, CardSection, Button, Spinner } from './index'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    }
  }

  onButtonPress() {
    this.setState({ error: '', loading: true })

    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() =>
        firebase.auth().createUserWithEmailAndPassword(email, password)
      )
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this))
    //this.setState({ loading: false })
  }

  onLoginSuccess() {
    this.setState({ loading: false })
  }

  onLoginFail() {
    this.setState({ error: 'authentication failed', loading: false })
  }

  render() {
    return (
      <Card>
        <CardSection>
          <TextInput
            style={styles.inputStyle}
            autoCompleteType={'email'}
            placeholder='User Name'
            autoCapitalize='none'
            autoCorrect={false}
            value={this.state.email}
            onChangeText={val => this.setState({ email: val })}
          />
        </CardSection>
        <CardSection>
          <TextInput
            style={styles.inputStyle}
            autoCompleteType={'password'}
            secureTextEntry={true}
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            value={this.state.password}
            onChangeText={val => this.setState({ password: val })}
          />
        </CardSection>
        {this.state.error.length > 0 && (
          <Text style={{ fontSize: 20, color: 'red' }}>{this.state.error}</Text>
        )}
        <CardSection>
          {this.state.loading === true ? (
            <Spinner />
          ) : (
            <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>
          )}
        </CardSection>
      </Card>
    )
  }
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

export default LoginForm
