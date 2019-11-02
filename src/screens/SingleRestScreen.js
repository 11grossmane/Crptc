import React from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import usePhotos from '../hooks/usePhotos'

const SingleRestScreen = ({ navigation }) => {
  const { photos, setPhotos } = usePhotos(navigation.getParam('id', 'no-id'))
  return (
    <>
      <FlatList
        data={photos}
        keyExtractor={photo => photo}
        renderItem={({ item: photoUri }) => {
          return <Image style={styles.imageStyle} source={{ uri: photoUri }} />
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    flex: 1,
    borderRadius: 4,
    height: 150,
    width: 250,
    marginBottom: 5,
  },
})

export default SingleRestScreen
