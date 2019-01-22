import {
  createStackNavigator
} from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'

import { connect } from 'react-redux'

import HomeScreen from '../Containers/HomeScreen'

import NewsDetailScreen from '../Containers/NewsDetailScreen'

const MainNav = createStackNavigator({
  NewsDetailScreen: { screen: NewsDetailScreen },
  HomeScreen: { screen: HomeScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen'
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
