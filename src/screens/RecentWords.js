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
const RecentWords = ({ navigation }) => {
  const {
    loggedIn,
    setLoggedIn,
    allWords,
    setAllWords,
    curUser,
    setCurUser,
  } = useContext(UserContext)
  const [userWords, setUserWords] = useState([])
  //   const allWordsListener = async () => {
  //     try {
  //       let unsubscribe = await wordsRef.onSnapshot(snap => {
  //         let arr = []
  //         snap.forEach(doc => {
  //           arr.push(doc.data())
  //           console.log('TCL: doc.data()', doc.data())
  //         })
  //         setAllWords(arr)

  //         console.log('TCL: allWords', allWords)
  //       })
  //       return unsubscribe && unsubscribe()
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  const queryUserWords = async () => {
    try {
      console.log(curUser.id)
      const words = await db
        .collection('words')
        .where('userId', '==', +curUser.id)
        .get()
      const wordsArray = words.docs.map(doc => {
        return doc.data()
      })
      console.log(wordsArray)
      setUserWords(wordsArray)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    if (curUser && curUser.id) {
      console.log('TCL: curUser', curUser)

      queryUserWords()
      console.log(userWords)
    } else {
      let userData = navigation.getParam('curUser', 'NONE')
      console.log('TCL: userData', userData)
      setCurUser(userData)
      queryUserWords()
      console.log(userWords)
    }

    //return allWordsListener()
  }, [curUser.id])

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
            <Text style={styles.title}>My Words</Text>
            {/* <Text style={styles.subtitle}>Recent Words</Text> */}
            <Carousel
              data={userWords}
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
