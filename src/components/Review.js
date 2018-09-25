import React from 'react'

const Review = props => {
  return (
    <p>{props.review.rating} | {props.review.description}</p>
  )
}

export default Review
