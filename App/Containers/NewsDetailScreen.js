import React from 'react'
import {
  Button,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { WebView } from 'react-native-webview'

import NavCreators from '../Redux/NavReduxCreators'

export class NewsDetailScreen extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <Button title='Close' onPress={() => this.props.onClose()} />
        <TheWebView uri={this.props.navigation.state.params.url} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(NavCreators.goBack()),
  onGoStack2: () => dispatch(NavCreators.goStack2())
})

export default connect(() => ({}), mapDispatchToProps)(NewsDetailScreen)

class TheWebView extends React.Component {
  render () {
    return (
      <WebView source={{ uri: this.props.uri }} />
    )
  }
}
