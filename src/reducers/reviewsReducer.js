import { ADD_REVIEW, FETCH_REVIEWS, ADDING_REVIEW, ADDED_REVIEW } from '../types'

const initialState = {
  reviews:[],
  addingReview: false,
}

function reviewsReducer(state = initialState, action){
  switch(action.type){
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, action.payload] }
    case FETCH_REVIEWS:
      return { ...state, reviews: action.payload}
    case ADDING_REVIEW:
      return { ...state, addingReview:true}
    case ADDED_REVIEW:
      return { ...state, addingReview:false}
    default:
      return state;
  }
}

export default reviewsReducer
