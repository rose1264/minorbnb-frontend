import React from 'react'
import { Feed, Segment } from 'semantic-ui-react'
import StarRatingComponent from 'react-star-rating-component';

const Review = props => {
  return (
    <Segment>
      <Feed.Event>
        <Feed.Content>
          <Feed.Like>
            <StarRatingComponent
              name="rate"
              editing={false}
              starCount={5}
              value={props.review.rating}
            />
          </Feed.Like>
          <Feed.Summary>
            <Feed.Date>{props.review.description}</Feed.Date>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    </Segment>

  )
}

export default Review
