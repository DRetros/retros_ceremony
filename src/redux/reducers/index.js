import { combineReducers } from "redux";
import retrospective from "./retrospective";
import firebase from './firebase'

export default combineReducers({ firebase, retrospective });