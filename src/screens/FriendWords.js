/* eslint-disable no-undef */
import React, { useState, useEffect, useReducer, useContext } from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import { db } from '../../firebase-config'
import { Button } from '../components/index'
import WordComp from '../components/WordComp'

import UserContext from '../context/UserContext'
import Carousel from 'react-native-snap-carousel'

import { sliderWidth, itemWidth } from '../styles/SliderEntry.style'

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

    queryComments,
    curComments,
    curFriend,
    setCurFriend,
  } = useContext(UserContext)

  const [friendWordComments, setFriendWordComments] = useState([])
  const [curWord, setCurWord] = useState({})

  useEffect(() => {
    console.log(curFriend)

    if (!curFriend) {
      setCurFriend(navigation.getParam('friend', 'No Friend'))
    } else {
      const query = async () => {
        await queryWords(curFriend)
      }
      query()
    }
  }, [])
  useEffect(() => {
    if (friendWords.length) {
      console.log(
        'friendWordsinside hooks wathcing friendWords',
        friendWords[0]
      )
      setCurWord(friendWords[0])

      const query = async () => {
        await queryComments(friendWords[0].id)
      }
      query()
    }
  }, [friendWords])
  console.log('TCL: curWord in friend', curWord)
  console.log('comments in freindwords', curComments)
  const onSnap = async ind => {
    try {
      console.log(ind)
      if (friendWords.length) {
        setCurWord(friendWords[ind])
        await queryComments(friendWords[ind].id)
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (!curFriend || !curFriend.id) {
    return <ActivityIndicator size='large' />
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
            <Text style={styles.subtitle}>
              {curFriend.name} is feeling crptc
            </Text>
            {/* <Text style={styles.subtitle}>Recent Words</Text> */}
            {friendWords.length > 0 ? (
              <Carousel
                ref={c => (this.carousel = c)}
                data={friendWords}
                renderItem={({ item }) => {
                  return <SliderEntry data={item} even={false} />
                }}
                onBeforeSnapToItem={onSnap}
                //onLayout={onSnap}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                layout={'tinder'}
                loop={true}
              />
            ) : (
              <ActivityIndicator size='large' />
            )}
          </View>

          {curWord && curWord.id && (
            <>
              <CommentForm curWord={curWord} />
              <CommentList userType='friend' curWord={curWord} />
            </>
          )}
        </ScrollView>
      </View>
      <Foooter />
    </SafeAreaView>
  )
}

export default withNavigation(FriendWords)
