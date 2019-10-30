import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import SearchBar from '../components/SearchBar'
import BusList from '../components/BusList'
import useResults from '../hooks/useResults'

const SearchScreen = props => {
  const [term, setTerm] = useState('')
  const [searchApi, results, errorMessage] = useResults()
  //make sure to add flex 1 to thing containing scrollview if you want it to work
  return (
    <View style={{ flex: 1 }}>
      <SearchBar term={term} setTerm={setTerm} searchApi={searchApi} />
      {{ errorMessage } && <Text>{errorMessage}</Text>}
      <Text>We have found {results.length} results</Text>
      <Text>Cheap:</Text>

      <ScrollView>
        {results.length > 0 && (
          <BusList
            results={results.filter(bus => {
              if (bus.price) return bus.price.length < 2
            })}
          />
        )}
        <Text>Pricier:</Text>
        {results.length > 0 && (
          <BusList
            results={results.filter(bus => {
              if (bus.price) return bus.price.length === 2
            })}
          />
        )}
        <Text>Expensive:</Text>
        {results.length > 0 && (
          <BusList
            results={results.filter(bus => {
              if (bus.price) return bus.price.length > 2
            })}
          />
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
export default SearchScreen
