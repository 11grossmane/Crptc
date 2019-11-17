import React, { useState, useContext } from 'react'
import { Form, Item, Button, Label, Input, Text } from 'native-base'
import UserContext from '../context/UserContext'
const WordForm = props => {
  const { curUser, queryWords, addWord } = useContext(UserContext)
  const [newWord, setNewWord] = useState('')
  const submitWord = async () => {
    addWord(newWord, curUser)
    queryWords(curUser)
    setNewWord('')
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
