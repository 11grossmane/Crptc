import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'

export const random = () => {
  return Math.floor(Math.random() * 200 + 200)
}

export const loadFont = async () => {
  await Font.loadAsync({
    Roboto: require('../../fonts/Roboto.ttf'),
    Roboto_medium: require('../../fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  })
}

export const accordionize = comments => {
  return comments.map(cur => {
    return {
      title: `${cur.userId} says: ${cur.value.slice(0, 8)}...`,
      content: cur,
    }
  })
}
