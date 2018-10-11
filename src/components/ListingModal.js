import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ListingDetail from './ListingDetail'
import withAuth from '../hocs/withAuth'


class ListingModal extends Component {
  render(){
    return (
      <Modal trigger={<Button>Show Detail</Button>}>
        <ListingDetail listing.host={this.props.user} listing={props.listing}/>
      </Modal>

    )
  }
}

function mapStateToProps(state){
  return {
    user: state.usersReducer.user,
  }
}

export default withAuth(connect(mapStateToProps)(ListingModal))
