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
import { addLike, setSingleWord, singleWord } from '../context/store'
import { connect } from 'react-redux'
const CommentList = ({
 user,
 curWord,
 userType,
 curComments,
 addLike,
 setSingleWord,
 singleWord,
}) => {
 // const wordsToWatch = userType === 'curUser' ? userWords : friendWords
 const [myWord, setMyWord] = useState({ curWord })
 const submitLike = async commentId => {
  await addLike(commentId, curWord.id)
  setMyWord(w => {
   const newComs = w.comments.map(cur => {
    if (cur.id === commentId) {
     cur.likes++
     return cur
    }
    return cur
   })
   const updated = { ...w, comments: newComs }
   return updated
  })
 }
 useEffect(() => {
  if (!myWord.id) {
   setMyWord(curWord)
  }
 }, [])
 // useEffect(() => {
 //   const query = async () => {
 //     await queryComments(curWord.id)
 //   }
 //   if (!curComments.length) {
 //     query()
 //   }
 // }, [])

 if (myWord.id && !myWord.comments.length) {
  console.log('no comments')
  return (
   <View>
    {userType === 'user' ? (
     <Text style={{ color: 'black' }}>This word has no comments yet</Text>
    ) : (
     <Text style={{ color: 'black' }}>
      Be the first to comment on this word!
     </Text>
    )}
   </View>
  )
 }
 if (myWord.id) console.log('myComs', myWord.id, accordionize(myWord.comments))

 return (
  !!myWord.id && (
   <>
    {console.log('here')}
    <Text style={{ color: 'white' }}>People said...</Text>
    {myWord.comments.length && (
     <Accordion
      style={{ padding: 5 }}
      dataArray={accordionize(myWord.comments)}
      renderContent={item => {
       console.log('item in accordion', item)
       return (
        <View style={textStyle}>
         <Text style={textStyle}>{item.content.title}</Text>
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
     ></Accordion>
    )}
   </>
  )
 )
}

const textStyle = {
 backgroundColor: '#e3f1f1',
 color: 'black',
 padding: 10,
 fontStyle: 'italic',
}

export default withNavigation(
 connect(({ singleWord }) => ({ singleWord }), { setSingleWord, addLike })(
  CommentList
 )
)
