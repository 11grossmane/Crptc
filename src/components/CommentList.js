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
import UserContext from '../context/UserContext'
import { db } from '../../firebase-config'
import { withNavigation } from 'react-navigation'
import Foooter from '../components/Footer'
import NativeHeader from '../components/NativeHeader'
import { accordionize } from '../utils/random'
const CommentList = ({ comments, userType }) => {
  const {
    curUser,
    addLike,
    queryWords,
    userWords,
    friendWords,
    curWord,
    curFriend,
  } = useContext(UserContext)
  const [accorComs, setAccorComs] = useState([])
  const [localComments, setLocalComments] = useState([])
  const wordsToWatch = userType === 'curUser' ? userWords : friendWords
  useEffect(() => {
    if (localComments.length) {
      setAccorComs(accordionize(localComments))
    } else {
      setAccorComs(accordionize(comments))
    }
    console.log('word and comments', curWord, comments)
  }, [comments, localComments, wordsToWatch])

  const submitLike = async commentId => {
    await addLike(commentId)
    setLocalComments(
      comments.map(cur => {
        if (commentId === cur.id) {
          return { ...cur, likes: cur.likes + 1 }
        }
        return cur
      })
    )
    if (userType === 'curUser') queryWords(curUser)
    else queryWords(curFriend)
  }

  if (!comments.length && !localComments.length) {
    console.log('no comments')
    return (
      <>
        {userType === 'curUser' ? (
          <Text style={{ color: 'white' }}>This word has no comments yet</Text>
        ) : (
          <Text style={{ color: 'white' }}>
            Be the first to comment on this word!
          </Text>
        )}
      </>
    )
  }

  return (
    <>
      <Text style={{ color: 'white' }}>People said...</Text>
      <Accordion
        style={{ padding: 5 }}
        dataArray={accorComs}
        renderContent={item => {
          return (
            <View style={textStyle}>
              <Text style={textStyle}>{item.content.value}</Text>
              <Text style={textStyle}>Likes: {item.content.likes}</Text>
              <Button
                onPress={() => submitLike(item.content.id)}
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
    </>
  )
}

const textStyle = {
  backgroundColor: '#e3f1f1',
  padding: 10,
  fontStyle: 'italic',
}

export default withNavigation(CommentList)
