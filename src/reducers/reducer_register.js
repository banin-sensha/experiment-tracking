import { REGISTER_USER } from "../actions/types";


const initialState = {
    apiKey: "",
    userID: 0,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {...state, apiKey: action.payload.data.api_key, userId: action.payload.data.user_id};
        default:
            return state;
    }
}