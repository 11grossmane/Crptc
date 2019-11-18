/* eslint-disable no-undef */
import React, { useState } from 'react'
import { db } from '../../firebase-config'
import firebase from 'firebase'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [allWords, setAllWords] = useState([])
  const [curWord, setCurWord] = useState('')
  const [curUser, setCurUser] = useState({})
  const [curFriend, setCurFriend] = useState({})
  const [friends, setFriends] = useState({})
  const [userWords, setUserWords] = useState([])
  const [friendWords, setFriendWords] = useState([])
  const [curComments, setCurComments] = useState([])

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
  const queryComments = async id => {
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
      } else {
        setCurComments(updated)
      }
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
      const wordsPromiseArray = words.docs.map(async doc => {
        console.log('words dave', doc.id)
        const comArray = await queryComments(doc.id, true)
        return { ...doc.data(), id: doc.id, comments: comArray || [] }
      })

      //use await promise.all to make sure they are resolved before setting user words
      const wordsArray = await Promise.all(wordsPromiseArray)
      if (ind === 0) setCurWord(wordsArray[0])
      console.log('wordsArray', wordsArray)
      if (curUser.id === user.id) {
        setUserWords(wordsArray)
      } else {
        setFriendWords(wordsArray)
      }
    } catch (e) {
      console.error(e)
    }
  }

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

  const addLike = async (commentId, curWordId) => {
    try {
      await db
        .collection('comments')
        .doc(`${commentId}`)
        .update({
          likes: firebase.firestore.FieldValue.increment(1),
        })
      await queryComments(curWordId)
    } catch (e) {
      console.error(e)
      console.log('messed up in addLike')
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
        friendWords,
        queryWords,
        addWord,
        curComments,
        queryComments,
        addComment,
        addLike,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
