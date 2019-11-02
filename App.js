import React, { useEffect } from 'react'
import firebase from 'firebase'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './src/screens/SearchScreen'
import SingleRestScreen from './src/screens/SingleRestScreen'
import useLoggedIn from './src/hooks/useLoggedIn'
const firebaseConfig = {
  apiKey: 'AIzaSyBKzexEwqmiABcXPTw__lQ4mUOrxjLXDzQ',
  authDomain: 'food-217a7.firebaseapp.com',
  databaseURL: 'https://food-217a7.firebaseio.com',
  projectId: 'food-217a7',
  storageBucket: 'food-217a7.appspot.com',
  messagingSenderId: '706592017411',
  appId: '1:706592017411:web:155c1919b6fc575e8a1236',
}
const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    SingleRest: SingleRestScreen,
  },
  {
    initialRoute: 'Search',
    defaultNavigationOptions: {
      title: 'Business Search',
    },
  }
)
const Navigation = createAppContainer(navigator)
function App() {
  const { setLoggedIn } = useLoggedIn()

  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })
  }, [])
  return <Navigation />
}

export default App
