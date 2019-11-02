import React from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import SingleBus from '../components/SingleBus'

const BusList = props => {
  const { results, title } = props
  if (!results.length) {
    return null
  }
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={bus => bus.id}
        //remember to destructure below or that the important stuff is on instance.item
        renderItem={({ item: bus }) => {
          return <SingleBus bus={bus} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 10,
  },
  listStyle: {
    fontSize: 30,
    color: 'blue',
    marginVertical: 50,
  },
  titleStyle: {
    marginBottom: 5,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 18,
  },
})

export default BusList
