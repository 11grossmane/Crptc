/* eslint-disable no-undef */
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
import BusList from '../components/BusList'
import Foooter from '../components/Footer'
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
  const [wordComments, setWordComments] = useState([])
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
  const queryWordComments = async id => {
    const comments = await db
      .collection('comments')
      .where('wordId', '==', id)
      .get()
    return comments.docs.map(doc => {
      console.log('docs data', doc.data(), doc.id)
      return { ...doc.data(), id: doc.id }
    })
  }
  const queryUserWords = async () => {
    try {
      console.log(curUser.id)
      const words = await db
        .collection('words')
        .where('userId', '==', curUser.id.toString())
        .get()

      const wordsPromiseArray = words.docs.map(async doc => {
        console.log('words dave', doc.id)
        const comArray = await queryWordComments(doc.id)
        return { ...doc.data(), id: doc.id, comments: comArray }
      })
      const wordsArray = await Promise.all(wordsPromiseArray)
      console.log('wordsArray', wordsArray)
      setUserWords(wordsArray)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (curUser && curUser.id) {
      console.log('TCL: curUser', curUser)

      queryUserWords()
      console.log('userWords', userWords)
    } else {
      let userData = navigation.getParam('curUser', 'NONE')
      console.log('TCL: userData', userData)
      setCurUser(userData)
      queryUserWords()
      console.log('userWords', userWords)
    }

    //return allWordsListener()
  }, [curUser.id])

  const onSnap = async ind => {
    try {
      console.log(ind)
      setWordComments(userWords[ind].comments)
      console.log('TCL: wordComments', wordComments)
    } catch (e) {
      console.error(e)
    }
  }

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
            {userWords.length > 0 && (
              <Carousel
                ref={c => (this.carousel = c)}
                data={userWords}
                renderItem={({ item }) => {
                  return <SliderEntry data={item} even={false} />
                }}
                onSnapToItem={onSnap}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                layout={'tinder'}
                loop={true}
              />
            )}
          </View>
          {wordComments.length > 0 && <BusList comments={wordComments} />}
          <Button onPress={() => navigation.navigate('FriendsList')}>
            Friends
          </Button>
        </ScrollView>
      </View>
      <Foooter />
    </SafeAreaView>
  )
}

export default RecentWords
