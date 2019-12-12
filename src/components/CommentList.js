import React, { Component, useState, useContext, useEffect } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { View } from 'react-native'
import { db } from '../../firebase-config'
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

import { withNavigation } from 'react-navigation'
import Foooter from '../components/Footer'
import NativeHeader from '../components/NativeHeader'
import { accordionize } from '../utils/random'
import {
 addLike,
 setSingleWord,
 singleWord,
 addComment,
} from '../context/store'
import { connect } from 'react-redux'
import CommentForm from '../components/CommentForm'

const CommentList = ({
 user,
 curWord,
 userType,
 curComments,
 addLike,
 addComment,
 setSingleWord,
 singleWord,
 navigation,
}) => {
 // const wordsToWatch = userType === 'curUser' ? userWords : friendWords
 const [myWord, setMyWord] = useState({ curWord })
 const submitLike = async commentId => {
  // if (!commentId) {
  //  queried = await db.collection('comments').where('value','==','')
  // }
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
 const submitComment = async comment => {
  const word = await addComment(comment, user, myWord)
  // setMyWord(w => {
  //  const commentData = {
  //   value: comment,
  //   userId: user.id,
  //   wordId: `${myWord.id}`,
  //   likes: 0,
  //   timestamp: new Date(),
  //  }
  //  const newComs = [commentData, ...w.comments]
  //  const updated = { ...w, comments: newComs }
  //  return updated
  // })
  setMyWord(word)
 }
 if (navigation.getParam('curWord')) {
  curWord = navigation.getParam('curWord')
  curComments = navigation.getParam('curComments')
  user = navigation.getParam('user')
  userType = navigation.getParam('userType')
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
     <>
      <Text style={{ color: 'black' }}>
       Be the first to comment on this word!
      </Text>
      {userType === 'friend' && (
       <CommentForm
        // loading={props.loading}
        // setLoading={props.setLoading}
        curWord={myWord}
        submitComment={submitComment}
       />
      )}
     </>
    )}
   </View>
  )
 }
 if (myWord.id) console.log('myComs', myWord.id, accordionize(myWord.comments))

 return (
  !!myWord.id && (
   <>
    {userType === 'friend' && (
     <CommentForm
      // loading={props.loading}
      // setLoading={props.setLoading}
      curWord={myWord}
      submitComment={submitComment}
     />
    )}
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
 connect(({ singleWord, user }) => ({ singleWord, user }), {
  setSingleWord,
  addLike,
  addComment,
 })(CommentList)
)
