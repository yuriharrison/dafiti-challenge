import { Reducer } from "react"

import { ReducersMapObject, Action } from "../types"


export function combineReducers<S, A extends Action>(reducers:ReducersMapObject<S, A>):Reducer<S, A> {
  return (state, action) => {
    const newState:any = {}
    Object.keys(reducers).forEach(k => {
      newState[k] = (reducers as any)[k]((state as any)[k], action)
    })
    return newState as S
  }
}