'use strict';

import { createStore, applyMiddleware, combineReduxers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
console.disableYellowBox = ['Warning: Failed prop type'];

function configureStore(initialState){
	const enhancer = compose(
		// applyMiddleware(thunk),
		applyMiddleware(loggerMiddleware, thunk),
	);
	return createStore(reducer, initialState, enhancer)
}

export const store = configureStore({});


