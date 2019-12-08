import React, { useState, useContext } from 'react'
import { Form, Item, Button, Label, Input, Text } from 'native-base'
import UserContext from '../context/UserContext'
const WordForm = props => {
 const { curUser, queryWords, addWord, setCurWord } = useContext(UserContext)
 const [newWord, setNewWord] = useState('')
 const submitWord = async () => {
  props.setLoading(true)
  addWord(newWord, curUser)
  await queryWords(curUser)
  //setCurWord(newWord)
  setNewWord('')
  props.setLoading(false)
 }
 return (
  <Form>
   <Item fixedLabel>
    <Label>Im feeling...</Label>
    <Input
     style={{ color: 'white' }}
     placeholder='word'
     autoCorrect={false}
     value={newWord}
     onChangeText={val => setNewWord(val)}
    />
    <Button
     onPress={() => {
      submitWord()
     }}
    >
     <Text style={{ color: 'white' }}>Post</Text>
    </Button>
   </Item>
  </Form>
 )
}

export default WordForm
