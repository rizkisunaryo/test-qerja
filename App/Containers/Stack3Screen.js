import React from 'react'
import {
  Button,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import NavCreators from '../Redux/NavReduxCreators'

export class Stack3Screen extends React.Component {
  render () {
    return (
      <View>
        <Text /><Text /><Text />
        <Text>Stack 3</Text>
        <Button title='Go Stack 2' onPress={() => this.props.onGoStack2()} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onGoStack2: () => dispatch(NavCreators.goStack2())
})

export default connect(() => ({}), mapDispatchToProps)(Stack3Screen)
