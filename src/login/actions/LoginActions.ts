import { LoginData } from '../model/Model'

export const LOGIN = '[LoginActions] login'
export const LOGIN_SUCCESS = '[LoginActions] login success'


export const login = (payload: LoginData) => ({ type: LOGIN, payload })
export const loginSuccess = (payload: any) => ({ type: LOGIN_SUCCESS, payload })