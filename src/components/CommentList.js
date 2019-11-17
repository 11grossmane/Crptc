import React, { Component, useState, useContext, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Accordion,
} from 'native-base'
import UserContext from '../context/UserContext'
import { db } from '../../firebase-config'
import { withNavigation } from 'react-navigation'
import Foooter from '../components/Footer'
import NativeHeader from '../components/NativeHeader'
import { accordionize } from '../utils/random'
const CommentList = ({ comments }) => {
  const { curUser, friends, queryFriends } = useContext(UserContext)
  const [accorComs, setAccorComs] = useState([])
  useEffect(() => {
    if (comments.length && curUser.id) {
      setAccorComs(accordionize(comments, userId))
    }
  }, [])
  //   console.log('timestamp', timestamp, timestamp.toDate())
  if (!comments || !comments.length) {
    return <Text>Be the first to comment on this word!</Text>
  }

  return (
    <Content style={{ backgroundColor: 'black' }}>
      <Accordion dataArray={accorComs}></Accordion>
      {/* <List >
          {comments.length &&
            comments.map(com => {
              return (
                <ListItem key={com.id}>
                  
                </ListItem>
              )
            })}
        </List> */}
    </Content>
  )
}

export default withNavigation(CommentList)
