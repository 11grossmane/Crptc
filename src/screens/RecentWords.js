import React, { useState, useEffect, useReducer, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { db } from '../../firebase-config'
import { Button, CardSection } from '../components/index'
import WordComp from '../components/WordComp'

import UserContext from '../context/UserContext'
import Carousel from 'react-native-snap-carousel'

import { sliderWidth, itemWidth } from '../styles/SliderEntry.style'
import SliderEntry from '../components/SliderEntry'
import styles, { colors } from '../styles/index.style'
const RecentWords = props => {
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
      snap.forEach(doc => {
        arr.push(doc.data())
        console.log('TCL: doc.data()', doc.data())
      })
      setAllWords(arr)

      console.log('TCL: allWords', allWords)
    })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0.3)'}
          barStyle={'light-content'}
        />

        <ScrollView
          style={styles.scrollview}
          scrollEventThrottle={200}
          directionalLockEnabled={true}
        >
          <View style={styles.exampleContainer}>
            <Text style={styles.title}>{`Example `}</Text>
            <Text style={styles.subtitle}>Recent Words</Text>
            <Carousel
              data={allWords}
              renderItem={({ item }) => {
                return <SliderEntry data={item} even={false} />
              }}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              layout={'tinder'}
              loop={true}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default RecentWords
