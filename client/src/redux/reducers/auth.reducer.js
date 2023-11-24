import { getData, setData, ClearStorage } from "../../utils/storage";

const initialState = {
    token: null,
    id: null,
    userName: null,
    email: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            setData('token', action?.data?.token);
            setData('id', action?.data?.userId);
            setData('userName', action?.data?.name);
            setData('email', action?.data?.email);
            return {
                ...state,
                token: action?.data?.token,
                id: action?.data?.id,
                userName: action?.data?.userName,
                email: action?.data?.email
            };
        case 'RESETUSER':
            console.log("Redux RESETUSER");
            return {
                ...state,
                userName: getData('userName'),
                token: getData('token'),
                id: getData('id'),
                email: getData('email'),
            };
        case 'LOGOUT':
            ClearStorage();
            return {
                ...state,
                token: null,
                id: null,
                userName: null,
                email: null,
            };
        default:
            return state;
    }
};

export default authReducer;