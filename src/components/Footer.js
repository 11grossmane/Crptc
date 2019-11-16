import React, { Component } from 'react'
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base'
import { withNavigation } from 'react-navigation'
import { NavigationActions } from 'react-navigation'
class Foooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            onPress={() => {
              this.props.navigation.navigate('RecentWords')
            }}
            active
          >
            <Icon name='home' />
          </Button>
          <Button
            onPress={() => {
              this.props.navigation.navigate('FriendsList')
            }}
          >
            <Icon name='person' />
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

export default withNavigation(Foooter)
