import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react'

const Marker = props => {
  return <Icon name='map marker alternate'/>
}

class ListingMap extends Component {
  static defaultProps = {
      center: {
        lat: 40.7128,
        lng: -74.0060
      },
      zoom: 14
    };

    render() {
      let lat = this.props.listing.lat
      let lng = this.props.listing.lng
      let center = {lat, lng}
      return (
        <center>
          <div style={{ height: '80vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: `${process.env.REACT_APP_API_KEY}` }}
              defaultCenter={center}
              defaultZoom={this.props.zoom}
            >
            <Marker lat={lat} lng={lng} />
            </GoogleMapReact>
          </div>
        </center>
    );
    }

}



function mapStateToProps(state) {
  return {
    listing: state.listingsReducer.currentListing
  }
}

export default connect(mapStateToProps)(ListingMap)
