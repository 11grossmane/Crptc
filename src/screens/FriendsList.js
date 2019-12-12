import React, { Component, useState, useContext, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { Container, Header, Content, List, ListItem, Text } from 'native-base'
import UserContext from '../context/UserContext'
import { db } from '../../firebase-config'
import { withNavigation } from 'react-navigation'
import Foooter from '../components/Footer'
import NativeHeader from '../components/NativeHeader'
const FriendsList = ({ navigation }) => {
 const { curUser, friends, queryFriends, setCurFriend } = useContext(
  UserContext
 )

 useEffect(() => {
  const query = async () => {
   await queryFriends()
  }

  console.log('curUser and friends', curUser, curUser.friendIds)
  if (curUser.friendIds && curUser.friendIds.length && !friends.length) {
   query()
  }
 }, [])

 return (
  <Container style={{ backgroundColor: 'black' }}>
   <Content style={{ backgroundColor: 'black' }}>
    <List style={{ backgroundColor: 'black' }}>
     {friends.length &&
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

export default withNavigation(FriendsList)
