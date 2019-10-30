import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../components/SearchBar'
import BusList from '../components/BusList'
import yelp from '../api/yelp'

const SearchScreen = () => {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    searchApi()
  }, [])

  const searchApi = async (searchTerm = term) => {
    try {
      const res = await yelp.get(`/search`, {
        params: {
          location: 'chicago',
          term: searchTerm,
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

  return (
    <View>
      <SearchBar term={term} setTerm={setTerm} searchApi={searchApi} />
      {{ errorMessage } && <Text>{errorMessage}</Text>}
      <Text>We have found {results.length} results</Text>
      {results.length > 0 && <BusList results={results} />}
    </View>
  )
}

const styles = StyleSheet.create({})
export default SearchScreen
