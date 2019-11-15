import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { ParallaxImage } from 'react-native-snap-carousel'
import styles from '../styles/SliderEntry.style'

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
  }

  render() {
    const {
      data: { value, image },
      even,
    } = this.props

    const uppercaseTitle = (
      <Text style={styles.titleEven} numberOfLines={2}>
        {value}
      </Text>
    )

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
          <Image source={{ uri: image }} style={styles.image} />
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}
        >
          <Text style={styles.title}>{value}</Text>
          <Text style={styles.subtitle} numberOfLines={2}>
            Posted: recent
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
