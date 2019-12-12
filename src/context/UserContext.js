/* eslint-disable no-undef */
import React, { useState } from 'react'
import { db } from '../../firebase-config'
import firebase from 'firebase'

const UserContext = React.createContext()
export const SingleWordContext = React.createContext()

export const SingleWordProvider = ({ children }) => {
 const [singleWord, setSingleWord] = useState({})
 const addLike = async (commentId, curWordId) => {
  try {
   await db
    .collection('comments')
    .doc(`${commentId}`)
    .update({
     likes: firebase.firestore.FieldValue.increment(1),
    })
   //await queryComments(curWordId)
   await querySingleWord(curWordId)
  } catch (e) {
   console.error(e)
   console.log('messed up in addLike')
  }
 }
 const querySingleWord = async id => {
  try {
   const word = await db
    .collection('words')
    .doc(`${id}`)
    .get()
   const comments = await queryComments(id, true)
   console.log('comments inside querysingle word')
   const data = {
    ...word.data(),
    id: word.id,
    comments: comments,
   }
   setSingleWord(data)
  } catch (error) {
   console.error('messed up in querySingleWord: ', error)
  }
 }

 return (
  <SingleWordContext.Provider
   value={{
    addLike,
    singleWord,
    setSingleWord,
    querySingleWord,
   }}
  >
   {children}
  </SingleWordContext.Provider>
 )
}

export const UserProvider = ({ children }) => {
 const [loggedIn, setLoggedIn] = useState(false)
 const [allWords, setAllWords] = useState([])
 const [curWord, setCurWord] = useState({})
 const [curUser, setCurUser] = useState({})
 const [curFriend, setCurFriend] = useState({})
 const [friends, setFriends] = useState({})
 const [userWords, setUserWords] = useState([])
 const [friendWords, setFriendWords] = useState([])
 const [curComments, setCurComments] = useState([])
 const addWord = async (newWord, user) => {
  const newWordData = {
   value: newWord,
   userId: user.id,
  }
  try {
   await db
    .collection('words')
    .add({ ...newWordData, timestamp: firebase.firestore.Timestamp.now() })
  } catch (e) {
   console.error(e)
   console.log('messed up in addWord query')
  }
 }
 const addComment = async (com, user, word) => {
  console.log('TCL: word inside add comment', word)

  const commentData = {
   value: com,
   userId: user.id,
   wordId: `${word.id}`,
   likes: 0,
  }
  try {
   await db.collection('comments').add({
    ...commentData,
    timestamp: firebase.firestore.Timestamp.now(),
   })
   queryComments(word.id)
  } catch (e) {
   console.error(e)
   console.log('messed up in addComment query')
  }
 }
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
  let friendsArray = await Promise.all(friends)
  friendsArray = friendsArray.filter(cur => cur.id !== curUser.id)
  console.log('friendArray', friendsArray)
  setFriends(friendsArray)
 }
 const queryComments = async (id, returning = false) => {
  try {
   const comments = await db
    .collection('comments')
    .where('wordId', '==', id)
    .orderBy('timestamp', 'desc')
    .get()
   const updated = comments.docs.map(doc => {
    console.log('docs data', doc.data(), doc.id)
    return { ...doc.data(), id: doc.id }
   })
   if (returning) {
    return updated
   }
   setCurComments(updated)
  } catch (e) {
   console.error(e)
   console.log('messed up in queryFriends')
  }
 }

 const queryWords = async (user, ind) => {
  if (!user.id) return
  try {
   console.log(user.id)
   const words = await db
    .collection('words')
    .where('userId', '==', user.id)
    .orderBy('timestamp', 'desc')
    .get()
   //call map to create an array of promises

   //use await promise.all to make sure they are resolved before setting user words
   const wordsArray = await Promise.all(
    words.docs.map(async doc => {
     const commentList = await queryComments(doc.id, true)
     return { ...doc.data(), id: doc.id, comments: commentList }
    })
   )
   console.log('curUser in side qerwords', curUser)
   console.log('wordsArray', wordsArray)
   if (wordsArray.length) {
    if (curUser.id === user.id) {
     await setUserWords([...wordsArray])
    } else {
     await setFriendWords([...wordsArray])
    }
   }
   console.log('friendwords', friendWords, 'userWords', userWords)
   return wordsArray
  } catch (e) {
   console.error(e)
  }
 }
 return (
  <UserContext.Provider
   value={{
    loggedIn,
    setLoggedIn,
    curWord,
    setCurWord,
    allWords,
    setAllWords,
    curUser,
    setCurUser,
    curFriend,
    setCurFriend,
    friends,
    queryFriends,
    userWords,
    setUserWords,
    friendWords,
    queryWords,
    addWord,
    queryComments,
    curComments,
    addComment,
   }}
  >
   {children}
  </UserContext.Provider>
 )
}

export default UserContext
