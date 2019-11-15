import React, { Component } from 'react'
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel'
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style'
import SliderEntry from '../components/SliderEntry'
import styles, { colors } from '../styles/index.style'
import { ENTRIES1, ENTRIES2 } from '../static/entries'
import { scrollInterpolators, animatedStyles } from '../utils/animations'

const IS_ANDROID = Platform.OS === 'android'
const SLIDER_1_FIRST_ITEM = 1

export default class example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    }
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    )
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />
  }

  _renderDarkItem({ item, index }) {
    return <SliderEntry data={item} even={true} />
  }

  //   layoutExample(number, title, type) {
  //     return (
  //       <View style={styles.exampleContainer}>
  //         <Text style={styles.title}>{`Example ${number}`}</Text>
  //         <Text style={styles.subtitle}>Recent Words</Text>
  //         <Carousel
  //           data={ENTRIES2}
  //           renderItem={this._renderLightItem}
  //           sliderWidth={sliderWidth}
  //           itemWidth={itemWidth}
  //           containerCustomStyle={styles.slider}
  //           contentContainerCustomStyle={styles.sliderContentContainer}
  //           layout={type}
  //           loop={true}
  //         />
  //       </View>
  //     )
  //   }

  render() {
    // const example4 = this.layoutExample(
    //   4,
    //   'Title',
    //   'tinder'
    // )

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={'rgba(0, 0, 0, 0.3)'}
            barStyle={'light-content'}
          />

          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
          >
            <View style={styles.exampleContainer}>
              <Text style={styles.title}>{`Example `}</Text>
              <Text style={styles.subtitle}>Recent Words</Text>
              <Carousel
                data={ENTRIES2}
                renderItem={this._renderLightItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                layout={'tinder'}
                loop={true}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}
