/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native'

import { Button } from '../components/index'

import UserContext from '../context/UserContext'
import Carousel from 'react-native-snap-carousel'

import { sliderWidth, itemWidth } from '../styles/SliderEntry.style'

import Foooter from '../components/Footer'
import SliderEntry from '../components/SliderEntry'
import styles from '../styles/index.style'
import NativeHeader from '../components/NativeHeader'
import WordForm from '../components/WordForm'
import CommentList from '../components/CommentList'
const RecentWords = ({ navigation }) => {
  const {
    curUser,
    setCurUser,
    userWords,
    queryWords,
    setCurFriend,
  } = useContext(UserContext)

  const [wordComments, setWordComments] = useState([])

  useEffect(() => {
    setCurFriend({})
    if (curUser && curUser.id) {
      console.log('TCL: curUser', curUser)

      queryWords(curUser)
      console.log('userWords', userWords)
    } else {
      let userData = navigation.getParam('curUser', 'NONE')
      console.log('TCL: userData', userData)
      setCurUser(userData)
      queryWords(curUser)

      console.log('userWords', userWords)
    }

    //return allWordsListener()
  }, [])

  const onSnap = async ind => {
    try {
      console.log(ind)
      const comments =
        userWords[ind] && userWords ? userWords[ind].comments : []
      setWordComments(comments)
      console.log('TCL: wordComments', wordComments)
    } catch (e) {
      console.error(e)
    }
  }
  if (!curUser || !curUser.id) return <ActivityIndicator size='large' />
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <NativeHeader /> */}
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
            <Text style={styles.subtitle}>My Words</Text>
            <WordForm />
            {/* <Text style={styles.subtitle}>Recent Words</Text> */}
            {userWords.length > 0 && (
              <Carousel
                ref={c => (this.carousel = c)}
                data={userWords}
                renderItem={({ item }) => {
                  return <SliderEntry data={item} even={false} />
                }}
                onSnapToItem={onSnap}
                //onLayout={onSnap}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                layout={'tinder'}
                loop={true}
              />
            )}
          </View>
          {wordComments && (
            <CommentList comments={wordComments} userType='curUser' />
          )}
        </ScrollView>
      </View>
      <Foooter />
    </SafeAreaView>
  )
}

export default RecentWords
