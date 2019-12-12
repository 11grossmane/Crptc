import React, { Component, useState, useContext, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Container, Header, Content, List, ListItem, Text } from 'native-base'
import UserContext from '../context/UserContext'
import { db } from '../../firebase-config'
import { withNavigation } from 'react-navigation'
import Foooter from '../components/Footer'
import NativeHeader from '../components/NativeHeader'
import { connect } from 'react-redux'
import { queryFriends, setCurFriend } from '../context/store'
const FriendsList = ({
 navigation,
 user,
 friends,
 queryFriends,
 setCurFriend,
}) => {
 useEffect(() => {
  const query = async () => {
   await queryFriends(user)
  }

  console.log('user and friends', user, user.friendIds)
  if (user.friendIds && user.friendIds.length && !friends.length) {
   query()
  }
 }, [])
 console.log('friends in list', friends)
 return (
  <Container style={{ backgroundColor: 'black' }}>
   <Content style={{ backgroundColor: 'black' }}>
    <List style={{ backgroundColor: 'black' }}>
     {!!friends &&
      !!friends.length &&
      friends.map(friend => {
       return (
        <ListItem key={friend.id}>
         <TouchableOpacity
          onPress={() => {
           setCurFriend(friend)
           navigation.navigate('RecentWords', {
            friend: friend,
           })
          }}
         >
          <Text style={{ color: 'white' }}>{friend.name}</Text>
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

export default withNavigation(
 connect(({ user, friends }) => ({ user, friends }), {
  queryFriends,
  setCurFriend,
 })(FriendsList)
)
