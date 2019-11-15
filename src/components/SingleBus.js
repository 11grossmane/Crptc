import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

const SingleBus = props => {
  const { com, navigation } = props
  // const getAssocUser = async () => {
  // //   try {
  // //   } catch (error) {}
  // // }
  return (
    <TouchableOpacity
      style={styles.busStyle}
      // onPress={() =>
      //   navigation.navigate('SingleRest', {
      //     id: com.id,
      //   })
      // }
    >
      {/* <Image style={styles.imageStyle} source={{ uri: com.image_url }}></Image> */}
      <Text style={styles.nameStyle}>{com.value}</Text>
      <Text>
        Likes: {com.likes}, Timestamp: {com.timestamp.seconds}
      </Text>
      <Text>User: </Text>
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
    color: 'white',
  },
})
export default withNavigation(SingleBus)
