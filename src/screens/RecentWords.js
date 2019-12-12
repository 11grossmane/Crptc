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
import CommentForm from '../components/CommentForm'
import FriendWords from './FriendWords'
const RecentWords = ({ navigation }) => {
 const {
  queryWords,
  friendWords,
  curFriend,
  setCurFriend,
  curWord,
  setCurWord,
  curUser,
  setCurUser,
  userWords,
  setUserWords,
  curComments,
  queryComments,
 } = useContext(UserContext)
 let person, words, comments, setPerson
 const isFriend = navigation.getParam('friend', false) ? true : false
 if (isFriend) {
  user = curFriend
  words = userWords
  setPerson = setCurFriend
 } else {
  user = curUser
  words = userWords
  setPerson = setCurUser
 }
 const [wordComments, setWordComments] = useState([])
 //const [curWord, setCurWord] = useState({})
 const [loading, setLoading] = useState(true)
 useEffect(() => {
  setLoading(true)
  if (user && user.id) {
   console.log('user is:', user)
   if (isFriend) queryWords(user).then(() => setLoading(false))
   else queryWords(user).then(() => setLoading(false))
  } else {
   let userData = navigation.getParam('user', 'NONE')
   if (isFriend) {
    userData = navigation.getParam('friend', 'No Friend')
   }

   setPerson(userData)
  }
 }, [user])
 useEffect(() => {
  if (words.length) {
   setLoading(true)
   console.log('userWordsinside hooks wathcing words', words[0])
   setCurWord(words[0])
   queryComments(words[0].id).then(() => setLoading(false))
  }
 }, [words])
 console.log('curWord in recent words', curWord)

 const onSnap = async ind => {
  try {
   setLoading(true)
   console.log(ind)
   if (words.length) {
    setCurWord(words[ind])
    await queryComments(words[ind].id)
   }
   setLoading(false)
  } catch (e) {
   console.error(e)
  }
 }
 if (!user || !user.id || loading) return <ActivityIndicator size='large' />

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
      {navigation.getParam('friend', false) === false && (
       <WordForm loading={loading} setLoading={setLoading} />
      )}
      {/* <Text style={styles.subtitle}>Recent Words</Text> */}
      {words.length > 0 && (
       <Carousel
        ref={c => (this.carousel = c)}
        data={words}
        renderItem={({ item }) => {
         console.log('item inside carousel', item)
         return (
          <React.Fragment>
           <SliderEntry
            loading={loading}
            setLoading={setLoading}
            data={item}
            user={user}
            even={false}
            userType={navigation.getParam('friend') ? 'friend' : 'user'}
           />
          </React.Fragment>
         )
        }}
        //onBeforeSnapToItem={onSnap}
        //onLayout={onSnap}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        layout={'stack'}
        loop={true}
       />
      )}
     </View>
    </ScrollView>
   </View>
   <Foooter />
  </View>
 )
}

export default RecentWords
