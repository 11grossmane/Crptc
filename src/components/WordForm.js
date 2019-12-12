import React, { useState, useContext } from 'react'
import { Form, Item, Button, Label, Input, Text } from 'native-base'
import UserContext from '../context/UserContext'
import { queryWords, addWord } from '../context/store'
import { connect } from 'react-redux'
import Spinner from '../components/Spinner'
const WordForm = props => {
 const [newWord, setNewWord] = useState('')
 const [loading, setLoading] = useState(false)
 const submitWord = async () => {
  setLoading(true)
  await props.addWord(newWord, props.user)
  //setCurWord(newWord)
  setNewWord('')
  setLoading(false)
 }
 if (loading)
  return (
   <>
    <Spinner />
   </>
  )
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

export default connect(({ user }) => ({ user }), { addWord, queryWords })(
 WordForm
)
