import React, { Component, useState, useContext, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import {
 Container,
 Header,
 Content,
 List,
 ListItem,
 Text,
 Accordion,
 Button,
 Icon,
} from 'native-base'
import { SingleWordContext } from '../context/UserContext'
import { db } from '../../firebase-config'
import { withNavigation } from 'react-navigation'
import Foooter from '../components/Footer'
import NativeHeader from '../components/NativeHeader'
import { accordionize } from '../utils/random'
const CommentList = ({ user, curWord, userType, curComments }) => {
 const { addLike, singleWord, setSingleWord } = useContext(SingleWordContext)

 // const wordsToWatch = userType === 'curUser' ? userWords : friendWords

 const submitLike = async commentId => {
  await addLike(commentId, curWord.id)
 }
 useEffect(() => {
  setSingleWord(curWord)
 }, [])
 console.log('single word', curWord)
 console.log('curWord after curWord', curWord)

 // useEffect(() => {
 //   const query = async () => {
 //     await queryComments(curWord.id)
 //   }
 //   if (!curComments.length) {
 //     query()
 //   }
 // }, [])

 if (curWord.id && !curWord.comments.length) {
  console.log('no comments')
  return (
   <View>
    {userType === 'curUser' ? (
     <Text style={{ color: 'black' }}>This word has no comments yet</Text>
    ) : (
     <Text style={{ color: 'black' }}>
      Be the first to comment on this word!
     </Text>
    )}
   </View>
  )
 }

 return (
  curWord.id === true && (
   <>
    <Text style={{ color: 'white' }}>People said...</Text>
    {curWord.comments && (
     <Accordion
      style={{ padding: 5 }}
      dataArray={accordionize(curWord.comments)}
      renderContent={item => {
       console.log('item in accordion', item)
       return (
        <View style={textStyle}>
         <Text style={textStyle}>{item.content.value}</Text>
         <Text style={textStyle}>Likes: {item.content.likes}</Text>
         <Button
          onPress={() => {
           submitLike(item.content.id)
          }}
          danger
          rounded
         >
          <Icon name='heart' />
          <Text>Like</Text>
         </Button>
        </View>
       )
      }}
      onAccordionOpen
     ></Accordion>
    )}
   </>
  )
 )
}

const textStyle = {
 backgroundColor: '#e3f1f1',
 padding: 10,
 fontStyle: 'italic',
}

export default withNavigation(CommentList)
