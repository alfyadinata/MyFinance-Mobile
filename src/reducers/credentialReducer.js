import { LOGIN } from '../actions/types';

const initialState = {
	user: {
		name: '',
		email: '',
		token: '',
		isLoggedIn: false
	}
};

const credentialReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token
			};
		default:
			return state;
	}
};

export default credentialReducer;
