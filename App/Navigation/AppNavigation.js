import React from 'react'
import {
  TabBarBottom,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'

import { connect } from 'react-redux'

import Stack2Screen from '../Containers/Stack2Screen'
import Stack3Screen from '../Containers/Stack3Screen'
import DrawerContent from '../Containers/DrawerContent'
import Tab2Screen from '../Containers/Tab2Screen'
import LoadingScreen from '../Containers/LoadingScreen'
import HomeScreen, { HomeScreenNavigationOptions } from '../Containers/HomeScreen'

import Colors from '../Themes/Colors'

const HomeScreenWithDrawer = createDrawerNavigator(
  {
    HomeScreenInternal: { screen: HomeScreen }
  }, {
    contentComponent: props => <DrawerContent contentProps={props} />
  }
)
HomeScreenWithDrawer.navigationOptions = HomeScreenNavigationOptions

// Navigator for the Main Tabs
const TabNav = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreenWithDrawer
  },
  Tab2Screen: {
    screen: Tab2Screen
  }
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  backBehavior: 'none',
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: Colors.A1
    },
    activeTintColor: 'white',
    inactiveTintColor: 'rgb(201, 201, 201)'
  }
})

const MainNav = createStackNavigator({
  LoadingScreen: { screen: LoadingScreen },
  Stack2Screen: { screen: Stack2Screen },
  Stack3Screen: { screen: Stack3Screen },
  TabNav: { screen: TabNav }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoadingScreen',
  navigationOptions: {
    headerStyle: { backgroundColor: Colors.B2 }
  }
})

export const AppNavigator = MainNav

export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

const App = reduxifyNavigator(AppNavigator, 'root')
const mapStateToProps = (state) => ({
  state: state.nav
})
export default connect(mapStateToProps)(App)
