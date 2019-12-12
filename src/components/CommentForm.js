import React, { useState, useContext } from 'react'
import {
 Form,
 Item,
 Button,
 Label,
 Input,
 Text,
 Content,
 Container,
} from 'native-base'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import UserContext from '../context/UserContext'
import { addComment } from '../context/store'
import { connect } from 'react-redux'
const CommentForm = ({ curWord, user, friend, addComment, submitComment }) => {
 const [newComment, setNewComment] = useState('')
 // const submitComment = async () => {
 //  //setLoading(true)
 //  await addComment(newComment, user, curWord)
 //  setNewComment('')
 //  //setLoading(false)
 // }
 return (
  <>
   <ScrollView>
    <Form>
     <Text style={{ color: 'black' }}>
      {friend.name} is feeling {curWord.value} because...
     </Text>
     <Item fixedLabel>
      <Input
       style={{ color: 'black' }}
       placeholder='comment here'
       autoCorrect={false}
       value={newComment}
       onChangeText={val => setNewComment(val)}
      />
      <KeyboardAvoidingView behavior='padding' />
      <Button
       onPress={() => {
        submitComment(newComment)
        setNewComment('')
       }}
      >
       <Text style={{ color: 'white' }}>Post</Text>
      </Button>
     </Item>
    </Form>
   </ScrollView>
  </>
 )
}

export default connect(({ user, friend }) => ({ user, friend }), {
 addComment,
})(CommentForm)
