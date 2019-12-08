/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import { Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Loading from './src/screens/Loading'
import RecentWords from './src/screens/RecentWords'
import LoginForm from './src/screens/LoginForm'
import FriendsList from './src/screens/FriendsList'
import FriendWords from './src/screens/FriendWords'
import Foooter from './src/components/Footer'
import NativeHeader from './src/components/NativeHeader'
import { UserProvider } from './src/context/UserContext'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'native-base'
import { YellowBox } from 'react-native'
import { loadFont } from './src/utils/random'
import clone from 'lodash.clone'
import Header from './src/components/header'

YellowBox.ignoreWarnings(['Setting a timer'])
const _console = clone(console)
console.warn = message => {
 if (message.indexOf('Setting a timer') <= -1) {
  _console.warn(message)
 }
}

const navigator = createStackNavigator(
 {
  Loading: Loading,

  RecentWords,
  LoginForm,
  FriendsList: {
   screen: FriendsList,
   navigationOptions: {
    headerTitle: () => {
     return <Header headerText='Friends' />
    },
   },
  },
  FriendWords,
  Foooter,
 },
 {
  defaultNavigationOptions: {
   title: 'Crptc',
  },
 }
)
// export const loadFont = async () => {
//   await Font.loadAsync({
//     Roboto: require('./fonts/Roboto.ttf'),
//     Roboto_medium: require('./fonts/Roboto_medium.ttf'),
//     ...Ionicons.font,
//   })
// }
const Navigation = createAppContainer(navigator)
const App = () => {
 const [loading, setLoading] = useState(true)
 useEffect(() => {
  loadFont().then(() => setLoading(false))
 }, [])
 return (
  !loading && (
   <UserProvider>
    <Navigation>
     <Foooter />
    </Navigation>
   </UserProvider>
  )
 )
}

export default App
