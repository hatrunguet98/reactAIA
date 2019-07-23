import * as React from 'react'
import LoginPage from './login/containers/LoginPage'
import BaseItemPage from './baseItem/containers/BaseItemPage'
import { BrowserRouter as Router ,Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

const Root = ({ store }) => (
  <Router>
    <Provider store={store}>
      <div>
        <Route exact={true} path="/" component={LoginPage}/>
        <Route path="/baseItem" component={BaseItemPage}/>
      </div>
    </Provider>
  </Router>

)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root


