import React from 'react'
import { Icon, Feed, Segment } from 'semantic-ui-react'

const Reservation = props => {
  return (
    <Segment>
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Feed.Date>Check in date: {props.reservation.check_in}</Feed.Date>
            <Feed.Date> Check out date: {props.reservation.check_out}</Feed.Date><br/>
            <Feed.Extra>
              {props.reservation.file.url ?
                <a href={`${process.env.REACT_APP_API_ENDPOINT}/${props.reservation.file.url}`} download><Icon name="download"/> Download & Sign the school release form</a>
              : null}
            </Feed.Extra>
            </Feed.Summary>
          </Feed.Content>
      </Feed.Event>
    </Segment>
  )
}

export default Reservation
