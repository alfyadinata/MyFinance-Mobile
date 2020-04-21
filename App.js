import React, { Fragment } from 'react';
import { StyleSheet, StatusBar, FlatList } from 'react-native';
import { ApplicationProvider, Button, Icon, IconRegistry, Layout, Text, Input } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as theme } from '@eva-design/eva';
import { connect } from 'react-redux';
import { addPlace } from './src/actions/places';
import { Provider } from 'react-redux';

import store from './src/store';

import Router from './src/Router';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Fragment>
					<IconRegistry icons={EvaIconsPack} />
					<ApplicationProvider mapping={mapping} theme={theme}>
						<StatusBar translucent backgroundColor="transparent" />
						<Router />
					</ApplicationProvider>
				</Fragment>
			</Provider>
		);
	}
}

export default App;
