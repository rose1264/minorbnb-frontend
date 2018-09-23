const initialState = {
  neighbourhoods: [
    {
      id:1,
      name:"BPC",
      city_id: 1,
      listing: []
    },
    {
      id:2,
      name:"Tribeca",
      city_id: 1,
      listing: []
    }
  ]
}

const neighbourhoodsReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default neighbourhoodsReducer
