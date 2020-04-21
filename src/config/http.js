import React from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = Axios.create({
	baseURL: 'http://192.168.43.136:8888'
});

async function getToken() {
	const token = await AsyncStorage.getItem('token');

	if (token) {
		instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
	}
}

getToken();

export default instance;
