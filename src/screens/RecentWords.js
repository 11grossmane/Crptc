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
import FriendWords from './FriendWords'
const RecentWords = ({ navigation }) => {
 const {
  curWord,
  setCurWord,
  curUser,
  setCurUser,
  userWords,
  setUserWords,
  curComments,
  queryWords,
  queryComments,
  setCurFriend,
 } = useContext(UserContext)

 const [wordComments, setWordComments] = useState([])
 //const [curWord, setCurWord] = useState({})
 const [loading, setLoading] = useState(true)
 useEffect(() => {
  setLoading(true)
  setCurFriend({})
  if (curUser && curUser.id) {
   console.log('curUser is:', curUser)
  } else {
   let userData = navigation.getParam('curUser', 'NONE')

   setCurUser(userData)
  }
  queryWords(curUser, 0).then(() => setLoading(false))

  //return allWordsListener()
 }, [curUser])
 useEffect(() => {
  if (userWords.length) {
   setLoading(true)
   console.log('userWordsinside hooks wathcing userWords', userWords[0])
   setCurWord(userWords[0])
   queryComments(userWords[0].id).then(() => setLoading(false))
  }
 }, [userWords])
 console.log('curWord in recente words', curWord)
 console.log('curComments', curComments)
 const onSnap = async ind => {
  try {
   setLoading(true)
   console.log(ind)
   if (userWords.length) {
    setCurWord(userWords[ind])
    await queryComments(userWords[ind].id)
   }
   setLoading(false)
  } catch (e) {
   console.error(e)
  }
 }
 if (!curUser || !curUser.id || loading)
  return <ActivityIndicator size='large' />

 return (
  <View style={styles.safeArea}>
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
      <WordForm loading={loading} setLoading={setLoading} />
      {/* <Text style={styles.subtitle}>Recent Words</Text> */}
      {userWords.length > 0 && (
       <Carousel
        ref={c => (this.carousel = c)}
        data={userWords}
        renderItem={({ item }) => {
         return <SliderEntry loading={loading} data={item} even={false} />
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
      )}
     </View>
     {curWord && curWord.id && !loading ? (
      <CommentList curWord={curWord} userType='curUser' />
     ) : (
      <ActivityIndicator size='large' />
     )}
    </ScrollView>
   </View>
   <Foooter />
  </View>
 )
}

export default RecentWords
