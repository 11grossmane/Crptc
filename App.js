import React, { useEffect } from 'react'
import firebase from 'firebase'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './src/screens/SearchScreen'
import SingleRestScreen from './src/screens/SingleRestScreen'
import Loading from './src/screens/Loading'
import RecentWords from './src/screens/RecentWords'
import LoginForm from './src/screens/LoginForm'
import FriendsList from './src/screens/FriendsList'
import FriendWords from './src/screens/FriendWords'
import useLoggedIn from './src/hooks/useLoggedIn'
import ReactCarousel from './src/screens/ReactCarousel'
import { UserProvider } from './src/context/UserContext'
import { YellowBox } from 'react-native'
import clone from 'lodash.clone'

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
    Search: SearchScreen,
    SingleRest: SingleRestScreen,
    RecentWords,
    LoginForm,
    FriendsList,
    FriendWords,
  },
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      title: 'Crptc',
    },
  }
)
const Navigation = createAppContainer(navigator)
const App = () => {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  )
}

export default App
