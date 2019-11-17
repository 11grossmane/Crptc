import React, { useState, useContext } from 'react'
import { Form, Item, Button, Label, Input, Text, Content } from 'native-base'
import { KeyboardAvoidingView } from 'react-native'
import UserContext from '../context/UserContext'
const CommentForm = props => {
  const { curUser, curFriend, curWord, queryWords, addComment } = useContext(
    UserContext
  )
  const [newComment, setNewComment] = useState('')
  const submitComment = async () => {
    await addComment(newComment, curUser, curWord)
    await queryWords(curFriend)
    setNewComment('')
  }
  return (
    // <KeyboardAvoidingView behavior='padding' enabled>
    <Content>
      <Form>
        <Text style={{ color: 'white' }}>
          {curUser.name} is feeling {curWord.value} because...
        </Text>
        <Item fixedLabel>
          <Input
            style={{ color: 'white' }}
            placeholder='comment here'
            autoCorrect={false}
            value={newComment}
            onChangeText={val => setNewComment(val)}
          />
          <Button
            onPress={() => {
              submitComment()
            }}
          >
            <Text style={{ color: 'white' }}>Post</Text>
          </Button>
        </Item>
      </Form>
    </Content>
    // </KeyboardAvoidingView>
  )
}

export default CommentForm
