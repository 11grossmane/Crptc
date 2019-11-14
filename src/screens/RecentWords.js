import React, { useState, useEffect, useReducer, useContext } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import { db } from '../../firebase-config'
import { Button, CardSection } from '../components/index'
import WordComp from '../components/WordComp'

import UserContext from '../context/UserContext'
import Carousel from 'react-native-snap-carousel'
import { Dimensions } from 'react-native'
const RecentWords = props => {
  const [term, setTerm] = useState('')

  const {
    loggedIn,
    setLoggedIn,
    allWords,
    setAllWords,
    curUser,
    setCurUser,
  } = useContext(UserContext)
  useEffect(() => {
    let wordsRef = db.collection('words')
    let unsubscribe = wordsRef.onSnapshot(snap => {
      let arr = []
      snap.docs.forEach(doc => {
        arr.push(doc.data())
      })
      setAllWords(arr)
    })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])
  const horizontalMargin = 20
  const slideWidth = 280

  const sliderWidth = Dimensions.get('window').width
  const itemWidth = slideWidth + horizontalMargin * 2
  const itemHeight = Dimensions.get('window').height

  return (
    <View>
      {curUser.email && <Text>Welcome {curUser.name}</Text>}
      <Text style={styles.wordStyle}>Recent Words</Text>
      <>
        <ScrollView>
          <Carousel
            ref={c => {
              this._carousel = c
            }}
            onPress={() => {
              this._carousel.snapToNext()
            }}
            layout={'default'}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            data={allWords}
            renderItem={({ item }) => {
              return <WordComp word={item} />
            }}
          />
        </ScrollView>
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  wordStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
})
export default RecentWords
