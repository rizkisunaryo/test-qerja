import React from 'react'
import {
  Button,
  Text,
  TextInput,
  View
} from 'react-native'
import { connect } from 'react-redux'

import TestCreators from '../Redux/TestRedux'
import NavCreators from '../Redux/NavReduxCreators'

export const HomeScreenNavigationOptions = {
  title: 'Home',
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor }) => <Text style={{ color: tintColor }}>Home</Text>
}

export class HomeScreen extends React.PureComponent {
  static navigationOptions = HomeScreenNavigationOptions

  render () {
    return (
      <View>
        <Text /><Text /><Text />
        <Button title='Drawer' onPress={() => this.props.navigation.openDrawer()} />
        <TextInput onChangeText={txt => { this.textInputValue = txt }} />
        <Button title='Test Saga'
          onPress={() => this.props.onDoTest(this.textInputValue)} />
        <Text>{this.props.testData1} : {this.props.testData2}</Text>
        <Button title='Go Stack 2' onPress={() => this.props.onGoStack2()} />
      </View>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    testData1: state.test.testData1,
    testData2: state.test.testData2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDoTest: data => {
      dispatch(TestCreators.doTest(data))
    },
    onGoStack2: () => {
      dispatch(NavCreators.goStack2())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
