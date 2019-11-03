import React, { useState, useEffect, useReducer, useContext } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import { Button, CardSection } from '../components/index'
import SearchBar from '../components/SearchBar'
import BusList from '../components/BusList'
import useResults from '../hooks/useResults'
import LoginForm from '../components/LoginForm'
import useLoggedIn from '../hooks/useLoggedIn'
import firebaseConfig from '../../firebase-config'
//import reducer from '../store/reducer'
import logger from 'use-reducer-logger'
import { reducer, toggleLi } from '../store/reducer'
import UserContext from '../context/UserContext'
const SearchScreen = props => {
  const [term, setTerm] = useState('')
  const [searchApi, results, errorMessage] = useResults()
  // const [loggedIn, setLoggedIn] = useReducer(logger(reducer))
  const { loggedIn, setLoggedIn } = useContext(UserContext)
  //const { loggedIn, setLoggedIn } = useLoggedIn()
  //make sure to add flex 1 to thing containing scrollview if you want it to work
  const filterByPrice = price => {
    return results.filter(bus => {
      if (bus.price === price) return bus
    })
  }
  return (
    <>
      {loggedIn === true ? (
        <CardSection>
          <Button onPress={() => setLoggedIn(false)}>Log out</Button>
        </CardSection>
      ) : (
        <LoginForm />
      )}
      {/* return grouping of elements without constrained view */}
      <SearchBar term={term} setTerm={setTerm} searchApi={searchApi} />
      {{ errorMessage } && <Text>{errorMessage}</Text>}
      <ScrollView>
        {results.length > 0 && (
          <BusList title='Cheap' results={filterByPrice('$')} />
        )}

        {results.length > 0 && (
          <BusList title='Pricier' results={filterByPrice('$$')} />
        )}

        {results.length > 0 && (
          <BusList title='Priciest' results={filterByPrice('$$$')} />
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
})
export default SearchScreen
