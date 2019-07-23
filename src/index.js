import * as ReactDOM from 'react-dom'
import * as React from 'react'
import LoginPage from './login/containers/LoginPage'
import BaseItemPage from './baseItem/containers/BaseItemPage'
import configureStore from './configureStore'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Root from './Router'

const initialState = window.initialReduxState
const store = configureStore(initialState)

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
