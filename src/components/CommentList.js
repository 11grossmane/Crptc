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
  const { addLike, curWord, queryComments, curComments } = useContext(
    UserContext
  )

  // const wordsToWatch = userType === 'curUser' ? userWords : friendWords

  const submitLike = async commentId => {
    await addLike(commentId, curWord.id)
  }

  useEffect(() => {
    queryComments(curWord.id)
  }, [])

  if (!curComments.length) {
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
      {curComments.length && (
        <Accordion
          style={{ padding: 5 }}
          dataArray={accordionize(curComments)}
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
      )}
    </>
  )
}

const textStyle = {
  backgroundColor: '#e3f1f1',
  padding: 10,
  fontStyle: 'italic',
}

export default withNavigation(CommentList)
