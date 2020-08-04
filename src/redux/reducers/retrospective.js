import { ADD_CARD, ADD_SETTINGS_3BOX } from '../actionTypes'

const initialState = {
    settings3box: {
        account: null,
        profile: null,
        box: null,
        space: null,
        thread: null,
    },
    columns: [{
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

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_CARD:
            const { columnId, cardDescription } = action.payload
            state.columns[columnId].cards.push({
                description: cardDescription
            })
            return {
                ...state,
                columns: [...state.columns]
            }
        case ADD_SETTINGS_3BOX:
            return {
                ...state,
                settings3box: action.payload
            }
            break;
        default:
            return state
    }
}