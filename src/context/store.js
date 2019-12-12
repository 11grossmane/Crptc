import firebase from 'firebase'
import { db } from '../../firebase-config'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
const SETUSERWORDS = 'SETUSERWORDS'
export const setLoggedIn = bool => {
 return { type: 'SETLOGGEDIN', bool }
}
export const setUserWords = words => {
 console.log('words inside setUserWirds', words)
 return { type: SETUSERWORDS, words: words }
}
export const setFriends = friends => {
 return { type: 'SETFRIENDS' }
}
export const setCurUser = user => {
 return { type: 'SETCURUSER', user }
}
export const setCurFriend = friend => {
 return { type: 'SETCURFRIEND', friend }
}
export const setCurComments = comments => {
 return { type: 'SETCURCOMMENTS', comments }
}
export const setSingleWord = word => {
 return { type: 'SETSINGLEWORD', word }
}
export const addLike = (commentId, curWordId) => {
 return async dispatch => {
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
}
export const querySingleWord = id => {
 return async dispatch => {
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
   dispatch(setSingleWord(data))
  } catch (error) {
   console.error('messed up in querySingleWord: ', error)
  }
 }
}
export const addWord = (newWord, user) => {
 return async dispatch => {
  const newWordData = {
   value: newWord,
   userId: user.id,
  }
  try {
   await db
    .collection('words')
    .add({ ...newWordData, timestamp: firebase.firestore.Timestamp.now() })
   await dispatch(await queryWords(user))
  } catch (e) {
   console.error(e)
   console.log('messed up in addWord query')
  }
 }
}
export const addComment = (com, user, word) => {
 return async dispatch => {
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
}
export const queryFriends = curUser => {
 return async dispatch => {
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
  dispatch(setFriends(friendsArray))
 }
}
export const queryComments = (id, returning = false) => {
 return async dispatch => {
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
   dispatch(setCurComments(updated))
  } catch (e) {
   console.error(e)
   console.log('messed up in queryFriends')
  }
 }
}

export const queryWords = user => {
 return async dispatch => {
  try {
   console.log(user.id)
   const words = await db
    .collection('words')
    .where('userId', '==', user.id)
    .orderBy('timestamp', 'desc')
    .get()
   //call map to create an array of promises

   //use await promise.all to make sure they are resolved before setting user words
   // eslint-disable-next-line no-undef
   const wordsArray = await Promise.all(
    words.docs.map(async doc => {
     const commentList = await queryComments(doc.id, true)()
     console.log('commentList', commentList)
     return { ...doc.data(), id: doc.id, comments: commentList || [] }
    })
   )

   dispatch(setUserWords(wordsArray))

   //return wordsArray
  } catch (e) {
   console.error(e)
  }
 }
}
const initial = {
 user: {
  email: 'brigitte.maggio@gmail.com',
  friendIds: [
   'annetta.hagenes60-voluptatem',
   'jordyn.williamson-molestiae',
   'jacey20-in',
   'brigitte.maggio-illo',
  ],
  id: 'brigitte.maggio-illo',
  name: 'brigitte.maggio-illo',
  password: 'yolo123',
 },
 words: [],
 friends: [],
 friend: {},
 comments: [],
 word: {},
}
const reducer = (state = initial, action) => {
 console.log('action inside reducer', action)
 switch (action.type) {
  case 'SETLOGGEDIN':
   return { ...state, loggedIn: action.bool }

  case SETUSERWORDS:
   console.log('words inside reducer', action.words)
   return { ...state, words: action.words }
  case 'SETFRIENDS':
   return { ...state, friends: action.friends }

  case 'SETCURUSER':
   console.log('setcuruser', action.user)
   return { ...state, user: action.user }
  case 'SETCURFRIEND':
   return { ...state, friend: action.friend }

  case 'SETCURCOMMENTS':
   return { ...state, comments: action.comments }
  case 'SETSINGLEWORD':
   return { ...state, word: action.word }
  default:
   return state
 }
}

const middleware = compose(
 applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
export default createStore(reducer, applyMiddleware(thunkMiddleware))
