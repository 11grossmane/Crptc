/* eslint-disable no-undef */
import React, { useState, useEffect, useReducer, useContext } from 'react'
import { View, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import { db } from '../../firebase-config'
import { Button } from '../components/index'
import WordComp from '../components/WordComp'

import UserContext from '../context/UserContext'
import Carousel from 'react-native-snap-carousel'

import { sliderWidth, itemWidth } from '../styles/SliderEntry.style'
import BusList from '../components/BusList'
import SliderEntry from '../components/SliderEntry'
import styles from '../styles/index.style'
import { withNavigation } from 'react-navigation'
import Foooter from '../components/Footer'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
const FriendWords = ({ navigation }) => {
  console.log('props are', curFriend)
  const {
    queryWords,
    friendWords,
    setCurWord,
    curFriend,
    setCurFriend,
  } = useContext(UserContext)

  const [friendWordComments, setFriendWordComments] = useState([])

  const onSnap = ind => {
    try {
      console.log(ind)
      setCurWord(friendWords[ind])
      setFriendWordComments(friendWords[ind].comments)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    console.log(curFriend)
    setCurFriend(navigation.getParam('friend', 'No Friend'))
    queryWords(curFriend)
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
            <Text style={styles.title}>{curFriend.name} is feeling crptc</Text>
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
          <CommentForm />
          {friendWordComments.length > 0 && (
            <CommentList comments={friendWordComments} />
          )}
        </ScrollView>
      </View>
      <Foooter />
    </SafeAreaView>
  )
}

export default withNavigation(FriendWords)
