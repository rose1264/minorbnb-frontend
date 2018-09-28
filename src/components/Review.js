import React from 'react'
import { Feed, Segment } from 'semantic-ui-react'

const Review = props => {
  return (
    <Segment>
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Feed.Date>{props.review.description}</Feed.Date>
          </Feed.Summary>
          <Feed.Like>
            {props.review.rating} stars
          </Feed.Like>
        </Feed.Content>
      </Feed.Event>
    </Segment>
    
  )
}

export default Review
