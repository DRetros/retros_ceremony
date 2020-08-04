import { ADD_CARD, ADD_SETTINGS_3BOX } from "./actionTypes";

export const addCard = ({ columnId, cardDescription }) => ({
    type: ADD_CARD,
    payload: {
        columnId,
        cardDescription
    }
});

export const addSettings3Box = settings => ({
    type: ADD_SETTINGS_3BOX,
    payload: settings
});