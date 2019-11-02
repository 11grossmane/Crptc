import { useEffect, useState } from 'react'
import yelp from '../api/yelp'
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

export default () => {
  const [results, setResults] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  //const [location, setLocation] = useState('')

  //   GetLocation.getCurrentPosition({
  //       enableHighAccuracy: true,
  //       timeout: 15000,
  //   })
  //   .then(location => {
  //       console.log(location);
  //   })
  //   .catch(error => {
  //       const { code, message } = error;
  //       console.warn(code, message);})
  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      setErrorMessage('permission to access location was denied')
    }

    let myLocation = await Location.getCurrentPositionAsync({})
    // console.log('mylocation', myLocation)
    // setLocation(myLocation)
    return myLocation
  }
  const searchApi = async (searchTerm = '') => {
    try {
      const location = await getLocationAsync()
      const res = await yelp.get(`/search`, {
        params: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          term: searchTerm,
          limit: 50,
          radius: 40000,
        },
      })

      //use params to append query string, this allows you to send info with a GET request

      setResults(res.data.businesses)
      if (errorMessage.length) {
        setErrorMessage('')
      }
    } catch (error) {
      setErrorMessage('Something went wrong')
      console.log('messed up in searchApi')
    }
  }

  useEffect(() => {
    searchApi()
  }, []) //this is invoked when useResults() is called from SearchScreen
  return [searchApi, results, errorMessage]
}
