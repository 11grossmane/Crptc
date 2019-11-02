import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import SearchBar from '../components/SearchBar'
import BusList from '../components/BusList'
import useResults from '../hooks/useResults'

const SearchScreen = props => {
  const [term, setTerm] = useState('')
  const [searchApi, results, errorMessage] = useResults()
  //make sure to add flex 1 to thing containing scrollview if you want it to work
  const filterByPrice = price => {
    return results.filter(bus => {
      if (bus.price === price) return bus
    })
  }
  return (
    <>
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
