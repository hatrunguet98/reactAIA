import * as React from 'react'
import { ApplicationState, ConnectedReduxProps } from '../../MainStore'
import { LoginData } from '../model/Model'
import { Provider, connect, Dispatch } from 'react-redux'
import { login } from '../actions/LoginActions'
import { Store } from 'redux'
import { RouteComponentProps, Link } from 'react-router-dom'

interface OwnProps {
  store: Store<ApplicationState>
}

interface PropsFromState {
  username: string
}

interface PropsFromDispatch {
  login: typeof login
}

interface LoginFormState {
  username: string
  password: string
  active: boolean
}

type AllProps = RouteComponentProps<{}> & PropsFromState & PropsFromDispatch & ConnectedReduxProps & OwnProps

class LoginPage extends React.Component<AllProps, LoginFormState> {
  constructor(props: AllProps, context?: any) {
    super(props, context)
    this.state = { username: '', password: '', active: false }
  }

  getInfoLogin(e, title) {
    const obj = {}
    obj[title] = e.target.value
    this.setState(obj)
  }

  onLogin = () => {
    this.props.login(this.state)
  }

  render() {
    const user = this.state.active ? this.state.username : ' '
    const { store } = this.props
    return (
      <Provider store={store}>
        <div className={'container w-25'}>
          <div className={'justify-content-center '}>
            <p className={'h3 text-header-const'}>ADMIN PORTAL</p>
            <form>
              <div className="form-group">
                <label htmlFor="userId" className={'bt3'}>User ID</label>
                <input type="text" className="form-control "
                       id="userId"
                       onChange={e => this.getInfoLogin(e, 'username')}/>
              </div>
              <div className="form-group">
                <label htmlFor="password" className={'bt3'}>Password</label>
                <input type="password" className="form-control "
                       id="password" autoComplete="password"
                       onChange={e => this.getInfoLogin(e, 'password')}/>
              </div>
            </form>
            <div>
              <button className="btn btn-primary"
                      onClick={this.onLogin}>Submit
              </button>
            </div>
            <p>{user}</p>
          </div>
        </div>
      </Provider>
    )
  }
}

const mapStateToProps = ({ loginState }: ApplicationState) => ({
  username: loginState.username,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (payload: LoginData) => dispatch(login(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage)
