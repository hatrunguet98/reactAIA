import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { LoginState, loginReducer } from './login/reducers/LoginReducres'
import { all, fork } from 'redux-saga/effects'
import loginSaga from './login/sagas/LoginSagas'
import baseItemSagas from './baseItem/sagas/BaseItemSagas'
import { BaseItemState, baseItemReducer } from './baseItem/reducers/BaseItemReducers'

export interface ApplicationState {
  loginState: LoginState
  baseItemState: BaseItemState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const rootReducer = combineReducers<ApplicationState>({
  loginState: loginReducer,
  baseItemState: baseItemReducer,
})

export function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(baseItemSagas),
  ])
}