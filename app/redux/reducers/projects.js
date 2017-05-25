import createReducer from '../createReducer';
import * as types from '../actions/types';

export const projectsInfo = createReducer({total: {}, projects: []}, {
	[types.SET_PROJECTS_INFO]: function(state, action){
		return {'total': action.total, 'projects': action.projects};
	}
})

export const isProjectsLoading = createReducer(false, {
	[types.IS_PROJECTS_LOADING]: function(state, action){
		return action.isLoading;
	}
})

export const isProjectsRefreshing = createReducer(false, {
	[types.IS_PROJECTS_REFRESHING]: function(state, action){
		return action.isLoading;
	}
})

export const isProjectsError = createReducer(false, {
	[types.IS_PROJECTS_ERROR]: function(state, action){
		return action.isError;
	}
})

