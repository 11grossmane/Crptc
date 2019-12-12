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
import { connect } from 'react-redux'
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
import {
 queryWords,
 setCurFriend,
 setCurUser,
 setSingleWord,
} from '../context/store'
const RecentWords = ({
 navigation,
 queryWords,
 setCurFriend,
 setCurUser,
 user,
 friends,
 friend,
 words,
 setSingleWord,
 singleWord,
}) => {
 let person, comments, setPerson
 const isFriend = navigation.getParam('friend', false) ? true : false
 if (isFriend) {
  person = friend

  setPerson = setCurFriend
 } else {
  person = user

  setPerson = setCurUser
 }
 const [wordComments, setWordComments] = useState([])
 //const [singleWord, setSingleWord] = useState({})
 const [loading, setLoading] = useState(true)
 useEffect(() => {
  setLoading(true)
  if (person && person.id) {
   console.log('person is:', person)
   if (isFriend) queryWords(person).then(() => setLoading(false))
   else queryWords(person).then(() => setLoading(false))
  } else {
   let userData = navigation.getParam('user', 'NONE')
   if (isFriend) {
    userData = navigation.getParam('friend', 'No Friend')
   }

   setPerson(userData)
  }
 }, [person])
 useEffect(() => {
  if (words.length) {
   setLoading(true)
   console.log('personWordsinside hooks wathcing words', words[0])
   setSingleWord(words[0])
   queryComments(words[0].id).then(() => setLoading(false))
  }
 }, [words])
 console.log('singleWord in recent words', singleWord)

 const onSnap = async ind => {
  try {
   setLoading(true)
   console.log(ind)
   if (words.length) {
    setSingleWord(words[ind])
    await queryComments(words[ind].id)
   }
   setLoading(false)
  } catch (e) {
   console.error(e)
  }
 }
 if (!person || !person.id || loading) return <ActivityIndicator size='large' />

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
            user={person}
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

export default connect(
 ({ user, friends, words, friend, singleWord }) => ({
  user,
  friends,
  words,
  friend,
  singleWord,
 }),
 { queryWords, setCurFriend, setCurUser, setSingleWord }
)(RecentWords)
