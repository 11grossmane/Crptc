/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native'

import { Button } from '../components/index'

import UserContext from '../context/UserContext'
import Carousel from 'react-native-snap-carousel'

import { sliderWidth, itemWidth } from '../styles/SliderEntry.style'
import BusList from '../components/BusList'
import Foooter from '../components/Footer'
import SliderEntry from '../components/SliderEntry'
import styles from '../styles/index.style'
import NativeHeader from '../components/NativeHeader'
import WordForm from '../components/WordForm'
import CommentList from '../components/CommentList'
const RecentWords = ({ navigation }) => {
  const { curUser, setCurUser, userWords, queryWords } = useContext(UserContext)

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

  useEffect(() => {
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
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                layout={'tinder'}
                loop={true}
              />
            )}
          </View>
          {wordComments.length > 0 && <CommentList comments={wordComments} />}
        </ScrollView>
      </View>
      <Foooter />
    </SafeAreaView>
  )
}

export default RecentWords
