import React from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'

const BusList = ({ results }) => {
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={bus => bus.id}
        //remember to destructure below or that the important stuff is on instance.item
        renderItem={({ item: bus }) => {
          return (
            <View style={styles.busStyle}>
              <Text>{bus.name}</Text>
              <Image
                style={styles.imageStyle}
                source={{ uri: bus.image_url }}
              ></Image>
              <Text>
                Rating :{bus.rating}
                {'    '}Price: {bus.price}
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listStyle: {
    fontSize: 30,
    color: 'blue',
    marginVertical: 50,
  },
  busStyle: {
    margin: 5,
    backgroundColor: '#F0EEEE',
    height: 150,
    width: 250,
  },
  imageStyle: {
    margin: 5,
    flex: 1,
  },
})

export default BusList
