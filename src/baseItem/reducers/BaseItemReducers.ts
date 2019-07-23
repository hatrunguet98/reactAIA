import { Reducer } from 'redux'
import { BaseItemModel } from '../model/baseItemModel'
import {
  GET_BASEITEM,
  GET_BASEITEM_LIST_SUCCESS,
  DELETE_BASEITEM,
  DELETE_BASEITEM_SUCCESS,
  POST_SAVE_BASEITEM,
  POST_SAVEE_BASEITEM_SUCCESS
} from '../actions/BaseItemAction'
import { toast } from 'react-toastify'

export interface BaseItemState {
  dataList: BaseItemModel[]
  totalPage: number,
  pager: {
    currentPage: number,
    pageSize: number,
    sortDirection: string,
    sortField: string,
    textSearch: string
  }
}

const initialState: BaseItemState = {
  dataList: [],
  totalPage: 0,
  pager: {
    currentPage: 1,
    pageSize: 10,
    sortDirection: 'DESC',
    sortField: '',
    textSearch: ''
  },
}

const reducer: Reducer<BaseItemState> = (state = initialState, action) => {
  switch (action.type) {
    case GET_BASEITEM: {
      return {
        ...state, loading: true,
        pager: {
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
          sortDirection: action.payload.sortDirection,
          sortField: action.payload.sortField,
          textSearch: action.payload.textSearch,
        },
        dataList: [],
      }
    }
    case GET_BASEITEM_LIST_SUCCESS: {
      return {
        ...state,
        totalPage: 10,
        dataList: action.payload.data,
      }
    }
    case DELETE_BASEITEM: {
      return {
        ...state,
      }
    }

    case DELETE_BASEITEM_SUCCESS: {
      let message = `SUCCESS`
      toast.success(message)
      return {
        ...state,
      }
    }
    case POST_SAVE_BASEITEM: {
      return {
        ...state,
      }
    }
    case POST_SAVEE_BASEITEM_SUCCESS: {
      let message = `SUCCESS`
      toast.success(message)
      return {
        ...state,
      }
    }

    default: {
      return state
    }
  }
}
export { reducer as baseItemReducer }