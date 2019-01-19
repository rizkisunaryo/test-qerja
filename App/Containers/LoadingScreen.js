import React from 'react'
import {
  Button,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import NavCreators from '../Redux/NavReduxCreators'

export class LoadingScreen extends React.Component {
  render () {
    return (
      <View>
        <Text /><Text /><Text />
        <Text>Loading...</Text>
        <Button title='Home' onPress={() => this.props.onGoTabNav()} />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGoTabNav: () => {
      dispatch(NavCreators.goTabNav())
    }
  }
}

export default connect(() => ({}), mapDispatchToProps)(LoadingScreen)
