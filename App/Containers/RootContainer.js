import React, { Component } from 'react'
import {
  BackHandler,
  View
} from 'react-native'
import { connect } from 'react-redux'

import AppNavigation from '../Navigation/AppNavigation'
import NavCreators from '../Redux/NavReduxCreators'

class RootContainer extends Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.props.onHardwareBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.props.onHardwareBackPress)
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigation />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  onHardwareBackPress: () => {
    dispatch(NavCreators.goBack())
    return true
  }
})

export default connect(() => ({}), mapDispatchToProps)(RootContainer)
