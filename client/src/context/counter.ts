// CHANGING OBJECT STATE EXAMPLE

// import _ from 'lodash'

// _.assign(state, {
//   IDCLS: { id:action.document.id, cls:action.document.cls },
//   document:action.document
// })
// END EXAMPLE

import { Reducer, ContextActions } from '../types'

export const counter:Reducer<number> = (state, action) => {
  switch (action.type) {
    case ContextActions.ADD_COUNTER:
      return ++state
    default:
      return state
  }
}
