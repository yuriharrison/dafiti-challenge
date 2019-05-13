import { ContextActions, User, Action } from "../../types";


export const ClearUser = (dispatcher:React.Dispatch<Action<any>>) => {
  dispatcher(SetUser(null))
  dispatcher(SignOut())
}

export const SetUser = (user:User|null) => ({
  type: ContextActions.SET_USER,
  user: user
})

export const SignIn = () => ({
  type: ContextActions.SIGN_IN,
})


export const SignOut = () => ({
  type: ContextActions.SIGN_OUT,
})