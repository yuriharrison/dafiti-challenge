import _ from 'lodash'

import { Reducer, ContextActions, Auth } from '../types'


export const auth:Reducer<Auth> = (state, action) => {
  switch (action.type) {
    case ContextActions.SET_USER:
      return _.assign(state, {
        current: action.user,
        isLogged: action.user != null,
        isSignIn: false,
        isSignOut: false,
      })
    case ContextActions.SIGN_IN:
      return _.assign(state, {
        isSignIn: true
      })
    case ContextActions.SIGN_OUT:
      return _.assign(state, {
        isSignOut: true
      })
    default:
      return state
  }
}
