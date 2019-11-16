import React, { Component } from 'react'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base'
export default class NativeHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name='md-contact' />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          {/* <Button transparent>
              <Icon name='menu' />
            </Button> */}
        </Right>
      </Header>
    )
  }
}
