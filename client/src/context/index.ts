import React, {createContext, useContext as useReactContext, useReducer} from 'react';

import { combineReducers } from './combineReducers';
import { ContextProviderType, Context, Action } from '../types';

import { counter } from './counter'
import { auth } from './auth';


export const StateContext = createContext({})

const reducers = combineReducers({
  counter,
  auth
})

export const ContextProvider:ContextProviderType = ({children, initialState}) => {
  return React.createElement(StateContext.Provider, 
    { value:useReducer(reducers, initialState) },
    children)
}

export const useContext = () => useReactContext(StateContext) as unknown as [Context, React.Dispatch<Action>]

export const useDispatcher = () =>  {
  const [_, dispatcher] = useContext()
  return dispatcher
}