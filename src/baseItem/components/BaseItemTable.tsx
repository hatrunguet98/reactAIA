import * as React from 'react'
import { Row, Table } from 'reactstrap'
import Modal from 'react-awesome-modal'
import { renderSwitchImg } from '../../utils/renderImg'
import point from '../../public/images/point.png'
import PropTypes from 'prop-types'
import Select from 'react-select'
import Gravatar from 'react-gravatar'

interface PageProps {
  changePage: any,
  deleteBaseItem: any,
  saveBaseItem: any,
  // sort: any
  dataList: any[]
}

interface PageState {
  activePage: number,
  visibleDelete: boolean,
  visibleEdit: boolean,
  id: string,
  name: string,
  type: string,
  sortField: string,
  sortDirection: string,
  typeBaseItem: any
}

export class BaseItemTable extends React.Component<PageProps, PageState> {
  constructor(props: PageProps, content: any) {
    super(props, content)

    this.handlePageChange = this.handlePageChange.bind(this)
    this.state = {
      typeBaseItem: [
        {
          value: 'POINT',
          label: <span className="someClass"><img src={renderSwitchImg('POINT').path} width="25"
                                                  height="25"/>  POINT</span>,
        },
        {
          value: 'COMMENT',
          label: <span className="someClass"><img src={renderSwitchImg('COMMENT').path} width="25" height="25"/>  COMMENT</span>,
        },
        {
          value: 'COMMENTREVIEW',
          label: <span className="someClass"><img src={renderSwitchImg('COMMENTREVIEW').path} width="25" height="25"/>  COMMENTREVIEW</span>,
        },
      ],
      activePage: 1,
      visibleDelete: false,
      visibleEdit: false,
      name: '',
      type: '',
      id: null,
      sortDirection: '',
      sortField: '',
    }
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber })
    const payload = {
      page: pageNumber,
      perPage: 10,
    }
    this.props.changePage(payload)
  }

  getInfoSave(e, title) {
    const obj = {}
    obj[title] = e.target.value
    this.setState(obj)
  }

  getInfoSelect(e, title) {
    const obj = {}
    obj[title] = e.value
    this.setState(obj)
  }

  // sortBy(sortField: string) {
  //   this.setState(prevState => ({
  //       sortField,
  //       sortDirection: prevState.sortDirection === SORT.ASC ? SORT.DESC : SORT.ASC,
  //     }),
  //     () => {
  //       this.props.sort(this.state)
  //     })
  // }

  render() {
    const placeholder = (this.state.type !== '') ?
      <span className="someClass"><img src={renderSwitchImg(this.state.type).path} width="25"
                                       height="25"/> {this.state.type}</span> : ''
    return (
      <div>
        <Table striped>
          <thead>
          <tr className="aia-body-font">
            <th scope="col" style={{ paddingLeft: '20px' }}>
              <label> ID</label>
            </th>
            <th scope="col" style={{ paddingLeft: '20px' }}>
              <label> Type</label>
            </th>
            <th scope="col" style={{ paddingLeft: '20px' }}>
              <label> Name
              </label>
            </th>
            <th scope="col" style={{ paddingLeft: '20px' }}>
              <button className="btn btn-primary submitBtn" onClick={() => this.openSavePopup('', '', '')}>Add Base
                item
              </button>
            </th>
          </tr>
          </thead>
          <tbody>
          {
            // this.props.dataList !== undefined && this.props.dataList.map((item, i) => this.renderRow(item, i))}
            this.props.dataList ? this.props.dataList.map((item, i) => this.renderRow(item, i)) : null
          }
          </tbody>
        </Table>
        <section>
          <div className="my-modal-wrapper">
            <Modal visible={this.state.visibleDelete} onClickAway={() => this.closeDeletePopup()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5> Delete base item.</h5>
                </div>
                <div className="modal-body">
                  <div className="form" style={{ width: 800 }}>
                    <div className="pt-1 text-center">
                      <p className={'h4'}>ARE YOU SURE YOU WANT TO DELETE THE BASE ITEM?</p>
                    </div>
                    <Row className="justify-content-center align-items-center  pl-3 pt-5">
                      <div className={'width50 pr-5'}>
                        <button className={'btn btn-primary '} onClick={() => this.deleteBaseItem()}>Yes
                        </button>
                      </div>
                      <div className={'width50 pr-5'}>
                        <button className={'btn btn-default'} onClick={() => this.closeDeletePopup()}>No
                        </button>
                      </div>
                    </Row>
                  </div>
                </div>
              </div>
            </Modal>
            <Modal visible={this.state.visibleEdit} onClickAway={() => this.closeSavePopup()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4> Base Item.</h4>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form" style={{ width: 600 }}>
                      <div className="row">
                        {this.state.id !== '' ?
                          <div className="form-group col-md-2">
                            <div className="input-group">
                              <label className="pr-1">Id</label>
                              <input type="number" className="form-control" id="id" value={this.state.id || ''}
                                     placeholder=" Id" onChange={e => this.getInfoSave(e, 'id')} readOnly={true}/>
                            </div>
                          </div> : ''
                        }
                        <div className="form-group col-md-9">
                          <span className="pr-2">Type </span>
                          <div style={{ display: 'inline-block', width: 250}}>
                            <Select
                              onChange={e => this.getInfoSelect(e, 'type')}
                              options={this.state.typeBaseItem}
                              value={this.state.type || ''}
                              placeholder={placeholder}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-12">
                          <div className="input-group">
                            <span className="pr-1">Name </span>
                            <input type="text" className="form-control" id="name" value={this.state.name || ''}
                                   placeholder=" Name" onChange={e => this.getInfoSave(e, 'name')}/>
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-primary submitBtn" onClick={() => this.saveBaseItem()}>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
        </section>
      </div>
    )
  }

  renderRow = (item, key) => {
    return (
      <tr key={key}>
        <td>{item.id}</td>
        <td><img src={renderSwitchImg(item.type).path} width="50" height="50"/></td>
        <td>{item.name}</td>
        <td>
    <span onClick={() => this.openSavePopup(item.id, item.name, item.type)}>
    <i className='fa fa-edit'/>
    </span>
        </td>
        <td>
    <span onClick={() => this.openDeletePopup(item.id)}>
    <i className='fa fa-trash'/>
    </span>
        </td>
      </tr>
    )
  }

  openDeletePopup = (id) => {
    this.setState({
      visibleDelete: true,
      id: id,
    })
  }

  openSavePopup = (id, name, type) => {
    this.setState({
      visibleEdit: true,
      id: id,
      name: name,
      type: type,
    })
  }

  closeSavePopup = () => {
    this.setState({
      visibleEdit: false,
      id: null,
      name: '',
      type: '',
    })
  }

  closeDeletePopup = () => {
    this.setState({
      visibleDelete: false,
      id: null,
    })
  }

  deleteBaseItem = () => {
    this.props.deleteBaseItem(this.state.id)
    this.setState({
      visibleDelete: false,
      id: null,
    })
  }

  saveBaseItem = () => {
    this.props.saveBaseItem(this.state)
    this.setState({
      visibleDelete: false,
      id: null,
      name: '',
      type: '',
    })
  }
}