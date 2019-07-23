import * as React from 'react'
import { ApplicationState, ConnectedReduxProps } from '../../MainStore'
import { RouteComponentProps } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'
import { BaseItemTable } from '../components/BaseItemTable'
import { getBaseItemList, deleteBaseItem, saveBaseItem } from '../actions/BaseItemAction'
import { BaseItemModel, BaseItemSearchModel, SORT } from '../model/baseItemModel'

interface PropsFromState {
  loading: boolean
  dataList: BaseItemModel[]
  orderType: string
  direction: string
  errors: string
  totalPage: number
  addUserSuccess: boolean
}

interface PropsFromDispatch {
  getBaseItemList: typeof getBaseItemList,
  deleteBaseItem: typeof deleteBaseItem,
  saveBaseItem: typeof saveBaseItem
}

interface BaseItemState {
  searchRequest: BaseItemSearchModel,
}

type AllProps = RouteComponentProps<{}> & PropsFromState & PropsFromDispatch & ConnectedReduxProps

class BaseItemPage extends React.Component<AllProps, BaseItemState> {
  constructor(props: AllProps, content: any) {
    super(props, content)
    this.state = {
      searchRequest: {
        currentPage: 1,
        pageSize: 10,
        textSearch: '',
        sortDirection: SORT.DESC,
        sortField: '',
      },
    }
  }

  componentDidMount() {
    this.props.getBaseItemList(this.state.searchRequest)
  }

  goPage = (page: any) => {
    const searchRequest = { ...{}, ...this.state.searchRequest, ...page }
    this.setState({ searchRequest }, () => {
      this.props.getBaseItemList(this.state.searchRequest)
    })
  }

  deleteBaseItem = (payload) => {
    this.props.deleteBaseItem(payload)
  }

  saveBaseItem = (payload) => {
    this.props.saveBaseItem(payload)
  }

  render() {
    return (
      <div>
        <BaseItemTable dataList={this.props.dataList} changePage={this.goPage} deleteBaseItem={this.deleteBaseItem}
                       saveBaseItem={this.saveBaseItem}/>
      </div>
    )

  }
}

const mapStateToProps = ({ baseItemState }: ApplicationState) => ({
  dataList: baseItemState.dataList,
  totalPage: baseItemState.totalPage,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getBaseItemList: (payload: BaseItemSearchModel) => dispatch(getBaseItemList(payload)),
  deleteBaseItem: (id: string) => dispatch(deleteBaseItem(id)),
  saveBaseItem: (payload: BaseItemModel) => dispatch(saveBaseItem(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaseItemPage)
