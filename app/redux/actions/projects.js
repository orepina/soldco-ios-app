import * as types from './types';
import Api from '../../services/api';

function _getProjectsTotal(projects){
	var total = {amount: 0, sum: 0};
	projects.forEach(function(project){
		total.amount += project.reserves.all.amount;
		total.sum += project.reserves.all.sum;
	});
	return total;
};

export function setProjectsInfo(info){
	return {
		type: types.SET_PROJECTS_INFO,
		projects: info,
		total: _getProjectsTotal(info)
	}
}

export function isProjectsLoadingSet(isLoading){
	return {
		type: types.IS_PROJECTS_LOADING,
		isLoading: isLoading
	}
}

export function isProjectsRefreshingSet(isLoading){
	return {
		type: types.IS_PROJECTS_REFRESHING,
		isLoading: isLoading
	}
}

export function isProjectsErrorSet(isError){
	return {
		type: types.IS_PROJECTS_ERROR,
		isError: isError
	}
}

function _isLoading(isInitial){
	return (isInitial) ? isProjectsLoadingSet : isProjectsRefreshingSet;
}

export function fetchProjectsInfo(isInitial){
	return (dispatch) => {
		var isLoading  = _isLoading(isInitial);
		dispatch(isLoading(true));
		dispatch(isProjectsErrorSet(false));
		Api.getProjects(
			(info) => {
				dispatch(isLoading(false));
				dispatch(setProjectsInfo(info))
				console.log('i setState ');
			},
			(error) => {
				console.log('error  ', error)
				dispatch(isProjectsErrorSet(true));
				dispatch(isLoading(false));
			}
		)
	}
}