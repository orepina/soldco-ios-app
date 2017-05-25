import { combineReducers } from 'redux';
import * as projectsReducer from './projects';
import * as reservesReducer from './reserves';

export default combineReducers(Object.assign(projectsReducer, reservesReducer));