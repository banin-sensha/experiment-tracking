import { GET_PROJECTS, GET_PROJECTS_REQUEST } from "../actions/types";


const initialState = {
    projectData: [],
    fetchingProjects:false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS_REQUEST:
            return {...state, fetchingProjects: true};
        case GET_PROJECTS:
            return { ...state, projectData: action.payload.data, fetchingProjects:false };
        default:
            return state;
    }
}