import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Card, CardSection } from '../components/index'
import { ListItem } from 'react-native-material-ui'

const WordComp = ({ word }) => {
  //use effect that get all comments associated with word
  const { allWords, setAllWords } = useContext(UserContext)
  console.log('TCL: word', word)

  return (
    <>
      <ListItem
        divider
        centerElement={{
          primaryText: `${word.value}`,
        }}
        onPress={() => {}}
      />
    </>
  )
}

export default WordComp
