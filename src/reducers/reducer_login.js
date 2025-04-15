import { LOGIN_USER } from "../actions/types";


const initialState = {
    accessToken: "",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, accessToken: action.payload.data.access_token};
        default:
            return state;
    }
}