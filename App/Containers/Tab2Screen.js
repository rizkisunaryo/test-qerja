import React from 'react'
import {
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'

export class Tab2Screen extends React.PureComponent {
  static navigationOptions = {
    title: 'Tab 2',
    tabBarLabel: 'Tab 2',
    tabBarIcon: ({ tintColor }) => <Text style={{ color: tintColor }}>Tab 2</Text>
  }

  render () {
    return (
      <View>
        <Text>Tab 2</Text>
      </View>
    )
  }
}

export default connect(() => ({}), () => ({}))(Tab2Screen)
