import React, { Component, useContext } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { ParallaxImage } from 'react-native-snap-carousel'
import styles from '../styles/SliderEntry.style'
import { random } from '../utils/random'
import UserContext from '../context/UserContext'
import Spinner from '../components/Spinner'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import { SingleWordProvider } from '../context/UserContext'
const SliderEntry = props => {
 //const { curComments } = useContext(UserContext)

 const {
  data: { value, image },
  even,
  loading,
 } = props
 const uppercaseTitle = (
  <Text style={styles.titleEven} numberOfLines={2}>
   {value}
  </Text>
 )
 if (loading) {
  return (
   <TouchableOpacity
    activeOpacity={1}
    style={styles.slideInnerContainer}
    onPress={() => {}}
   ></TouchableOpacity>
  )
 }
 if (!loading)
  return (
   <TouchableOpacity
    activeOpacity={1}
    style={styles.slideInnerContainer}
    onPress={() => {}}
   >
    <View style={styles.shadow} />
    <View
     style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
    >
     <Image
      source={{
       uri: `http://lorempixel.com/${random()}/${random()}/abstract/`,
      }}
      style={styles.image}
     />
     <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
    </View>
    <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
     <Text style={styles.title}>{value}</Text>
     <Text style={styles.subtitle} numberOfLines={2}>
      Posted: recent
     </Text>
     {props.userType === 'friend' && (
      <CommentForm
       loading={props.loading}
       setLoading={props.setLoading}
       curWord={props.data}
      />
     )}
     <SingleWordProvider>
      <CommentList
       curComments={props.data.comments}
       curWord={props.data}
       user={props.user}
       userType={props.userType}
      />
     </SingleWordProvider>
    </View>
   </TouchableOpacity>
  )
}
export default SliderEntry
