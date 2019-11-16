import React, { Component, useState, useContext, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Container, Header, Content, List, ListItem, Text } from 'native-base'
import UserContext from '../context/UserContext'
import { db } from '../../firebase-config'
import { withNavigation } from 'react-navigation'
import Foooter from '../components/Footer'
const FriendsList = ({ navigation }) => {
  const {
    loggedIn,
    setLoggedIn,
    allWords,
    setAllWords,
    curUser,
    setCurUser,
    friends,
    setFriends,
  } = useContext(UserContext)

  const queryFriends = async () => {
    const friends = curUser.friendIds.map(async cur => {
      const friend = await db
        .collection('users')
        .doc(`${cur}`)
        .get()
      console.log('one friend', friend.data())
      return { ...friend.data(), id: friend.id }
    })
    // eslint-disable-next-line no-undef
    const friendsArray = await Promise.all(friends)
    console.log('friendArray', friendsArray)
    setFriends(friendsArray)
  }

  useEffect(() => {
    console.log('curUser and friends', curUser, curUser.friendIds)
    if (curUser.friendIds && curUser.friendIds.length && !friends.length) {
      queryFriends()
    }
  }, [])

  return (
    <Container>
      <Header />
      <Content>
        <List>
          {friends.length &&
            friends.map(friend => {
              return (
                <ListItem key={friend.id}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('FriendWords', {
                        friend: friend,
                      })
                    }}
                  >
                    <Text>{friend.name}</Text>
                  </TouchableOpacity>
                </ListItem>
              )
            })}
        </List>
      </Content>
      <Foooter />
    </Container>
  )
}

export default withNavigation(FriendsList)
