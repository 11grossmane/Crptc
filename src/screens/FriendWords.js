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
import SliderEntry from '../components/SliderEntry'
import styles, { colors } from '../styles/index.style'
import { withNavigation } from 'react-navigation'
import Foooter from '../components/Footer'
const FriendWords = ({ navigation }) => {
  const curFriend = navigation.getParam('friend', 'No Friend')
  console.log('props are', curFriend)
  const {
    loggedIn,
    setLoggedIn,
    allWords,
    setAllWords,
    curUser,
    setCurUser,
  } = useContext(UserContext)

  const [friendWords, setFriendWords] = useState([])
  const [friendWordComments, setFriendWordComments] = useState([])

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
  const queryFriendWords = async () => {
    try {
      console.log(curFriend.id)
      const words = await db
        .collection('words')
        .where('userId', '==', curFriend.id)
        .get()

      const wordsArray = words.docs.map(async doc => {
        const comArray = await queryWordComments(doc.id)
        return { ...doc.data(), id: doc.id, comments: comArray }
      })
      Promise.all(wordsArray).then(wordsArray => {
        console.log('wordsArray', wordsArray)
        setFriendWords(wordsArray)
      })
    } catch (e) {
      console.error(e)
    }
  }

  const onSnap = ind => {
    try {
      console.log(ind)

      setFriendWordComments(friendWords[ind].comments)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    console.log(curFriend)
    queryFriendWords()
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
            <Text style={styles.title}>{curFriend.name}</Text>
            {/* <Text style={styles.subtitle}>Recent Words</Text> */}
            {friendWords.length > 0 && (
              <Carousel
                ref={c => (this.carousel = c)}
                data={friendWords}
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
          {friendWordComments.length > 0 && (
            <BusList comments={friendWordComments} />
          )}
          <Button onPress={() => navigation.navigate('FriendsList')}>
            Friends
          </Button>
          <Button onPress={() => navigation.navigate('RecentWords')}>
            Home
          </Button>
        </ScrollView>
      </View>
      <Foooter />
    </SafeAreaView>
  )
}

export default withNavigation(FriendWords)
