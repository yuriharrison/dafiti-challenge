/** Reducer */
export interface Action<T = any> {
  type: T
}

export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => S

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>
}

export type ContextProviderType = React.FC<{initialState:Context}>


/** Context Actions */
export enum ContextActions {
  ADD_COUNTER = 'ADD_COUNTER',

  // AUTH
  SET_USER = 'SET_USER',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT'
}

/** CONTEXT */
export type Context = {
  counter: number,
  auth: Auth
}

export type Auth = {
  isSignIn: boolean,
  isSignOut: boolean,
  isLogged: boolean,
  current: User | null
}

export type User = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  /**
   * The user's unique ID.
   */
  uid: string;
}


/** Product */
export type Product = {
  _id:string,
  slug:string,
  description:string,
  name:string,
  brand:string,
  price:number,
  image:string,
  sizes:string[],
  colors:string[]
}

export type FProductGrid = React.FC<{products:Product[]}>
export type FProductCard = React.FC<{product:Product}>


/** Style */
export type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning' | 'dark' | 'light'