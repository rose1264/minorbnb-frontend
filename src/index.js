import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'


import store from './store'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

// touch src/components/SearchBar.js
// touch src/components/Listings.js
// touch src/components/Listing.js
// touch src/components/ListingDetail.js
// touch src/components/ListingInfo.js
// touch src/components/ListingMap.js
// touch src/components/CreateReservationForm.js
//
// touch src/components/CreateListingForm.js
// touch src/components/MyReservations.js
// touch src/components/MyReviews.js
//
// touch src/components/MyTrips.js
// touch src/components/PostReviewForm.js


//thinking in React
//App <==state : {
  // guest_id: user_id
  // host_id: user_id
  // listings: []
  // reservations:[]
  // trips:[]
  // current_listing: {}
  // current_reservation: {}
  // current_trip:{}
  // reviews:[]
//}
//  Form <== local state
