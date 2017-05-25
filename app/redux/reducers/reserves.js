import createReducer from '../createReducer';
import * as types from '../actions/types';

export const reserves = createReducer([], {
	[types.SET_RESERVES]: function(state, action){
		return action.reserves;
	},
})

export const filtered_reserves = createReducer([], {
	[types.SET_FILTERED_RESERVES]: function(state, action){
		return action.filtered_reserves;
	},
	[types.ON_CHANGE_MONTH_FILTER]: function(state, action){
		return action.reserves;
	},
})

export const isReservesLoading = createReducer(true, {
	[types.IS_RESERVES_LOADING]: function(state, action){
		return action.isLoading;
	}
})

export const isReservesRefreshing = createReducer(false, {
	[types.IS_RESERVES_REFRESHING]: function(state, action){
		return action.isLoading;
	}
})

export const isReservesError = createReducer(false, {
	[types.IS_RESERVES_ERROR]: function(state, action){
		return action.isError;
	}
})

export const isFilterLoading = createReducer(false, {
	[types.IS_FILTER_LOADING]: function(state, action){
		return action.isLoading;
	}
})

export const isFilterError = createReducer(false, {
	[types.IS_FILTER_ERROR]: function(state, action){
		return action.isError;
	}
})

//?? это что такое тут висит ненужное?
export const changeMonthFilter = createReducer(true, {
	[types.ON_CHANGE_MONTH_FILTER]: function(state, action){
		console.log('!!! ON_CHANGE_MONTH_FILTER  !!!')
		return state;
	}
})


export const filter = createReducer({}, {
	[types.SET_FILTER]: function(state, action){
		return action.filter;
	}
})

export const usersDict = createReducer({}, {
	[types.SET_USERS_DICT]: function(state, action){
		return action.dict;
	}
})

export const statesDict = createReducer({}, {
	[types.SET_STATES_DICT]: function(state, action){
		return action.dict;
	}
})
