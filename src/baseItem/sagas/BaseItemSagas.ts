import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects'
import { API_METHODS, callApi, callApiGet } from '../../utils/AppAPI'
import { GET_BASEITEM_API, DELETE_BASEITEM_API,POST_BASEITEM_API } from '../../utils/AppUrl'
import {
  GET_BASEITEM,
  DELETE_BASEITEM_SUCCESS,
  DELETE_BASEITEM,
  POST_SAVE_BASEITEM,
  POST_SAVEE_BASEITEM_SUCCESS,
  getBaseItemListSuccess,
  deleteBaseItemSuccess, getBaseItemList
} from '../actions/BaseItemAction'

export const getStore = (state) => state.baseItemState

function* getBaseItemListSagas(action: any) {
  try {
    const res = yield call(callApiGet, API_METHODS.GET, GET_BASEITEM_API, [])
    if (true) {
      yield put(getBaseItemListSuccess(res))
    }
  } catch (e) {
    console.log(e)
  }
}

function* deleteBaseItemSagas(action: any) {
  try {
    const listId = [action.payload]
    const res = yield call(callApi, API_METHODS.DELETE, DELETE_BASEITEM_API, listId)
    if (res.messge != null) {
      yield put(deleteBaseItemSuccess(res))
    }
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}

function* saveBaseItemSagas(action: any) {
  try {
    yield call(callApi, API_METHODS.POST, POST_BASEITEM_API, action.payload)
  } catch (e) {
    console.log(e)
  }
}

function* reloadDataList(action: any) {
  const baseItemStore = yield select(getStore)
  yield put(getBaseItemList(baseItemStore.pager))
}

function* watchFetchRequest() {
  yield takeEvery(GET_BASEITEM, getBaseItemListSagas)
  yield takeEvery(DELETE_BASEITEM, deleteBaseItemSagas)
  yield takeEvery(DELETE_BASEITEM_SUCCESS, reloadDataList)
  yield takeEvery(POST_SAVE_BASEITEM, saveBaseItemSagas)
  yield takeEvery(POST_SAVEE_BASEITEM_SUCCESS, reloadDataList)
}

function* baseItemSagas() {
  yield all([fork(watchFetchRequest)])
}

export default baseItemSagas