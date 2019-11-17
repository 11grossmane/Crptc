import React from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import SingleBus from '../components/SingleBus'

const BusList = ({ comments }) => {
  const { value, likes, timestamp, userId, wordId, id } = comments
  if (!comments.length) {
    return <Text>Be the first to comment on this word!</Text>
  }
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>{id}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={comments}
        keyExtractor={com => com.id}
        //remember to destructure below or that the important stuff is on instance.item
        renderItem={({ item: com }) => {
          return <SingleBus com={com} />
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
    color: 'red',
  },
})

export default BusList
