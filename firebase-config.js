import firebase from 'firebase'
import 'firebase/firestore'
const app = firebase.initializeApp({
  apiKey: 'AIzaSyD1MD8yfr5sFF-i75uwoY7C9RPv5xDli2c',
  authDomain: 'crptc-b8ee4.firebaseapp.com',
  databaseURL: 'https://crptc-b8ee4.firebaseio.com',
  projectId: 'crptc-b8ee4',
  storageBucket: 'crptc-b8ee4.appspot.com',
  messagingSenderId: '888787169491',
  appId: '1:888787169491:web:1a796afe207fc139d76426',
})

const db = app.firestore()

export { db, app }
