import {
  BackHandler,
  Platform
} from 'react-native'

import { NavigationActions, StackActions } from 'react-navigation'

import { AppNavigator } from '../Navigation/AppNavigation'
import { NavTypes } from './NavReduxCreators'

/* ------------- Initial State ------------- */

const defaultAction = AppNavigator.router.getActionForPathAndParams('LoadingScreen')
const initialNavState = AppNavigator.router.getStateForAction(defaultAction)

/* ------------- Map Types to Route Name ------------- */

// NOTE: We used this for those simpler routes,
// so that we don't have to bother writing the standard navigate code
const ROUTE_NAMES = {}
ROUTE_NAMES[NavTypes.GO_STACK2] = 'Stack2Screen'
ROUTE_NAMES[NavTypes.GO_STACK3] = 'Stack3Screen'

/* ------------- Reducers and Hookup Reducers to Types ------------- */

export const reducer = (state = initialNavState, action) => {
  let nextState
  let routeName
  switch (action.type) {
    case NavTypes.GO_TAB_NAV:
      nextState = AppNavigator.router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'TabNav', params: action.params })]
        }),
        state
      )
      break

    case 'Navigation/OPEN_DRAWER':
    case 'Navigation/CLOSE_DRAWER':
      nextState = AppNavigator.router.getStateForAction(action, state)
      break
    case NavTypes.CLOSE_DRAWER:
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DrawerClose' }), state)
      break

    case 'Navigation/BACK':
    case NavTypes.GO_BACK:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state)

      if (Platform.OS === 'android') {
        const nextRoute = getRoute(nextState)
        const prevRoute = getRoute(state)
        if (nextRoute.key === prevRoute.key) {
          BackHandler.exitApp()
        }
      }
      break

    case 'Navigation/NAVIGATE':
      routeName = action.routeName
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: routeName, params: action.params }),
        state)
      break

    default:
      if (ROUTE_NAMES.hasOwnProperty(action.type)) {
        const routeName = ROUTE_NAMES[action.type]
        nextState = AppNavigator.router.getStateForAction(
          StackActions.push({ routeName: routeName, params: action.params }),
          // NavigationActions.navigate({ routeName: routeName, params: action.params }),
          state
        )
      }
      break
  }

  return nextState || state
}

export const getRoute = (navState) => {
  if (navState.index != null) {
    return getRoute(navState.routes[navState.index])
  }
  return navState
}
