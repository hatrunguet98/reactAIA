import { BaseItemSearchModel,BaseItemModel } from '../model/baseItemModel'

export const GET_BASEITEM = '[TractActions] get base item'
export const GET_BASEITEM_LIST_SUCCESS = '[TractActions] get base success'
export const DELETE_BASEITEM = '[TractActions] delete base item'
export const DELETE_BASEITEM_SUCCESS = '[TractActions] delete base item succss'
export const POST_SAVE_BASEITEM = '[TractActions] delete base item'
export const POST_SAVEE_BASEITEM_SUCCESS = '[TractActions] delete base item succss'


export const getBaseItemList = (payload: BaseItemSearchModel) => ({ type: GET_BASEITEM, payload })
export const getBaseItemListSuccess = (payload: any) => ({ type: GET_BASEITEM_LIST_SUCCESS, payload })
export const deleteBaseItem = (payload: any) => ({ type: DELETE_BASEITEM, payload })
export const deleteBaseItemSuccess = (payload: any) => ({ type: DELETE_BASEITEM_SUCCESS, payload })
export const saveBaseItem = (payload: BaseItemModel) => ({ type: POST_SAVE_BASEITEM, payload })
export const saveBaseItemSuccess = (payload: any) => ({ type: POST_SAVEE_BASEITEM_SUCCESS, payload })