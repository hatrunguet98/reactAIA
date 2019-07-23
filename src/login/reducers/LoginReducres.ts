import {Reducer} from "redux"
import {LOGIN,LOGIN_SUCCESS} from '../actions/LoginActions'

export interface LoginState {
  username: string
  password: string
}

const initialState: LoginState = {
  username: "",
  password: "",
}

const reducer: Reducer<LoginState> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {...state}
    }
    case LOGIN_SUCCESS: {
      return {...state}
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export {reducer as loginReducer}