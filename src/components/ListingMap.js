import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class ListingMap extends Component {
  static defaultProps = {
      center: {
        lat: 40.7128,
        lng: -74.0060
      },
      zoom: 12
    };

    render() {
      let lat = this.props.listing.lat
      let lng = this.props.listing.lng
      return (
        <div style={{ height: '50vh', width: '50%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: `${process.env.REACT_APP_API_KEY}` }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={lat}
              lng={lng}
              text={this.props.listing.name}
            />
          </GoogleMapReact>
        </div>
      );
    }

}

function mapStateToProps(state) {
  return {
    listing: state.listingsReducer.currentListing
  }
}

export default connect(mapStateToProps)(ListingMap)
