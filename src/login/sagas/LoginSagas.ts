import { API_METHODS, callLoginApi } from '../../utils/AppAPI'
import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { POST_LOGIN } from '../../utils/AppUrl'
import { LOGIN, LOGIN_SUCCESS, loginSuccess } from '../actions/LoginActions'
import { saveToken, removeActivePage } from '../../utils/LocalStorageService'

function* getDashboard() {
  try {
    removeActivePage()
    window.location.href = '/baseItem'
  } catch (e) {
    console.log(e)
  }
}

function* doLoginAction(action: any) {
  try {
    const res = yield call(callLoginApi, API_METHODS.POST, POST_LOGIN, action.payload)
    if (res.accessToken != null) {
      saveToken(res.accessToken)
      yield put(loginSuccess('aaa'))
    }
  } catch (e) {
    console.log(e)
  }
}

function* watchFetchRequest() {
  yield takeEvery(LOGIN, doLoginAction)
  yield takeEvery(LOGIN_SUCCESS, getDashboard)
}

function* loginSaga() {
  yield all([fork(watchFetchRequest)])
}

export default loginSaga