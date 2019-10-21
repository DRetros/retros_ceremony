import { ADD_CARD } from '../actionTypes'

const initialState = {
  columns: [
    {
      id: 0,
      title: 'What went well?',
      cards: []
    },
    {
      id: 1,
      title: 'What didn\'t go well?',
      cards: []
    },
    {
      id: 2,
      title: 'What can be improved?',
      cards: []
    }
  ]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CARD:
      const { columnId, cardDescription } = action.payload
      state.columns[columnId].cards.push({
        description: cardDescription
      })
      return {
        columns: [...state.columns]
      }
    default:
      return state
  }
}
