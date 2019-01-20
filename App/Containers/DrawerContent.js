import React from 'react'
import {
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'

export class DrawerContent extends React.Component {
  render () {
    return (
      <View>
        <Text>Drawer</Text>
      </View>
    )
  }
}

export default connect(() => ({}), () => ({}))(DrawerContent)
