const initialState = {
	isAuthenticate: false,
	user: {
		email: '',
		name: ''
	}
};

const auth = (state = initialState, action) => {
	console.log('reducers is run');
	switch (action.type) {
		case 'GET_USER':
			return {
				...state,
				user: state.user
			};
		case 'AUTHENTICATED':
			return {
				...state,
				isAuthenticate: true,
				user: action.payload
			};
		default:
			return state;
	}
};

export default auth;
