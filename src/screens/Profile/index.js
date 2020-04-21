import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Dimensions, ToastAndroid, TouchableOpacityBase, Alert } from 'react-native';
import { ScrollView, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { Layout, Card, Icon, List, ListItem, Text, Button } from '@ui-kitten/components';
import { Image } from 'react-native';
import http from '../../config/http';
import store from '../../store';
import { connect } from 'react-redux';

class Profile extends React.Component {
	static navigationOptions = () => ({
		title: 'Profile'
	});

	handleLogout = async () => {
		Alert.alert(
			'Sign Out ?',
			'See you in next sign in:D',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: 'OK', onPress: () => this.logoutProcess() }
			],
			{ cancelable: false }
		);
	};

	logoutProcess = async () => {
		http
			.post('api/signout')
			.then(async () => {
				await AsyncStorage.clear();
				this.props.navigation.navigate('Auth');
			})
			.catch((err) => {
				console.warn(err);
			});
	};

	render() {
		return (
			<Layout style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
					<Layout style={styles.row}>
						<Image
							style={{ width: 50, height: 50 }}
							source={require('../../../public/avatar.png')}
							resizeMode={'cover'}
						/>
						<Text style={styles.name} category="h2">
							Alfy Adinata {store.getState().auth}
						</Text>
					</Layout>
					<Layout style={styles.profile}>
						<Text style={{ opacity: 0.5 }} category="h4">
							Info
						</Text>
						<Layout style={styles.field}>
							<Text style={styles.label}>Email</Text>
							<TextInput editable={false} style={styles.input} value="alfy@gmail.com" />
						</Layout>
						<Layout style={styles.field}>
							<Text style={styles.label}>Full Name</Text>
							<TextInput editable={false} style={styles.input} value="alfy adinata" />
						</Layout>
						<Layout style={styles.field}>
							<Text style={styles.label}>Registered at</Text>
							<TextInput editable={false} style={styles.input} value="05-10-2020" />
						</Layout>
					</Layout>
					<TouchableOpacity style={styles.btn} onPress={this.handleLogout}>
						<Text style={{ fontWeight: 'bold' }} status="danger">
							Sign Out
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</Layout>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center'
	},
	row: {
		flexDirection: 'row',
		padding: 15
	},
	name: {
		padding: 10,
		color: '#4287f5'
	},
	label: {
		opacity: 0.5,
		color: 'white'
	},
	field: {
		backgroundColor: '#4287f5',
		padding: 15,
		borderRadius: 40,
		margin: '2%'
	},
	input: {
		color: 'white'
	},
	btn: {
		padding: 20
	},
	avatar: {
		flex: 1,
		width: '100%',
		height: '100%',
		borderRadius: 50
	},
	profile: {
		padding: 20,
		backgroundColor: 'white'
	}
});

const mapStateToProps = (state) => {
	return {
		Auth: state.Auth
	};
};

export default connect(mapStateToProps)(Profile);
