import React, { Component } from 'react'

class SearchBar extends Component {

  render(){

    return (
      <center>
        <form style={{margin:20}}>
          <input
            style={{height: 30, width: 500}}
            value={this.props.searchTerm}
            onChange={this.props.handleChange}
            placeholder=" 🔍 Search for name, price, address or neighbourhood..."
          />
          <br/>
          <br/>
        </form>
      </center>
    )
  }
}

export default SearchBar
