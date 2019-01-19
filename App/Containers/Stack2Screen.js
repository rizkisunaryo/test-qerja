import React from 'react'
import {
  Button,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import NavCreators from '../Redux/NavReduxCreators'

export class Stack2Screen extends React.Component {
  render () {
    return (
      <View>
        <Text /><Text /><Text />
        <Text>Stack 2</Text>
        <Button title='Go Stack 3' onPress={() => this.props.onGoStack3()} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onGoStack3: () => dispatch(NavCreators.goStack3())
})

export default connect(() => ({}), mapDispatchToProps)(Stack2Screen)
