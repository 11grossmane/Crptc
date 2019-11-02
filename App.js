import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './src/screens/SearchScreen'
import SingleRestScreen from './src/screens/SingleRestScreen'

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

export default createAppContainer(navigator)
