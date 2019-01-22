import React, { Component } from 'react'
import {
  StatusBar,
  BackHandler,
  View,
  Modal,
  ActivityIndicator,
  Platform
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
        <StatusBar translucent />
        <View style={{ height: Platform.OS === 'ios' ? 40 : 30 }} />
        <AppNavigation />
        <Modal visible={this.props.isLoading} transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <ActivityIndicator size='large' color='white' />
          </View>
        </Modal>
      </View>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    isLoading: state.window.windowLoading
  }
}

const mapDispatchToProps = (dispatch) => ({
  onHardwareBackPress: () => {
    dispatch(NavCreators.goBack())
    return true
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
