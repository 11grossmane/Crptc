import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

const SingleBus = props => {
  const { bus, navigation } = props

  return (
    <TouchableOpacity
      style={styles.busStyle}
      onPress={() =>
        navigation.navigate('SingleRest', {
          id: bus.id,
        })
      }
    >
      <Image style={styles.imageStyle} source={{ uri: bus.image_url }}></Image>
      <Text style={styles.nameStyle}>{bus.name}</Text>
      <Text>
        Rating: {bus.rating}, Reviews: {bus.review_count}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  busStyle: {
    marginLeft: 15,
    height: 150,
    width: 250,
  },
  imageStyle: {
    flex: 1,
    borderRadius: 4,
    height: 150,
    width: 250,
    marginBottom: 5,
  },
  nameStyle: {
    fontWeight: 'bold',
  },
})
export default withNavigation(SingleBus)
