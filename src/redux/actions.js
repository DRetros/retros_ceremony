import { ADD_CARD } from "./actionTypes";

export const addCard = ({columnId, cardDescription}) => ({
  type: ADD_CARD,
  payload: {
    columnId,
    cardDescription
  }
});