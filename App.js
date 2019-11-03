import React, { useEffect } from 'react'
import firebase from 'firebase'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './src/screens/SearchScreen'
import SingleRestScreen from './src/screens/SingleRestScreen'
import Loading from './src/screens/Loading'
import useLoggedIn from './src/hooks/useLoggedIn'
import { UserProvider } from './src/context/UserContext'

const navigator = createStackNavigator(
  {
    Loading: Loading,
    Search: SearchScreen,
    SingleRest: SingleRestScreen,
  },
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      title: 'Business Search',
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
