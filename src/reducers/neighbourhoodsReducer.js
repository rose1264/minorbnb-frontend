import { FETCH_NEIGHBOURHOODS } from '../types'

const initialState = {
  neighbourhoods: []
}

const neighbourhoodsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_NEIGHBOURHOODS:
      return { ...state, neighbourhoods:action.payload}
    default:
      return state
  }
}

export default neighbourhoodsReducer
