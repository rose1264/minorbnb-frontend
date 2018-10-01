import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class SearchBar extends Component {

  render(){

    return (
      <center>
        <form style={{margin:20}}>

          <input
            style={{height: 30, width: 500}}
            value={this.props.searchTerm}
            onChange={this.props.handleChange}
            placeholder="Search for name, price, address or neighbourhood..."
          />
          <Button style={{margin:20}}><Icon name='search'/></Button>
        </form>
      </center>
    )
  }
}

export default SearchBar
