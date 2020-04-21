import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import http from '../../config/http';
import AsyncStorage from '@react-native-community/async-storage';
import { authenticate } from '../../actions/Auth';
import { connect } from 'react-redux';

class AuthLoading extends React.Component {
	async checkAuth() {
		await http.get('/api/profile').then((res) => {
			this.props.dispatch(
				authenticate({
					email: res.data.email,
					name: res.data.name
				})
			);
		});
	}

	async componentDidMount() {
		await this.checkAuth();
		let check = await AsyncStorage.getItem('token');
		if (check !== null) {
			this.props.navigation.navigate('App');
		}
	}
	render() {
		return (
			<Layout style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Layout style={styles.formContainer}>
						<Text status="control" category="h2" style={styles.title}>
							Track Your Money
						</Text>
						<Button
							onPress={() => this.props.navigation.navigate('SignIn')}
							status="control"
							appearance="outline"
							style={styles.btn}
						>
							Sign In
						</Button>
						<Button
							onPress={() => this.props.navigation.navigate('SignUp')}
							status="control"
							appearance="outline"
							style={styles.btn}
						>
							Sign Up
						</Button>
					</Layout>
				</ScrollView>
			</Layout>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#426ae3'
	},
	title: {
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	formContainer: {
		padding: 15,
		paddingBottom: 45,
		marginTop: '50%',
		margin: '5%',
		backgroundColor: '#385ac2',
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 11
		},
		shadowOpacity: 0.57,
		shadowRadius: 15.19,
		elevation: 23
	},
	input: {
		flex: 1,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 0,
		backgroundColor: 'transparent',
		color: 'white'
	},
	icon: {
		marginRight: '2%'
	},
	formControl: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	btn: {
		borderRadius: 15,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 15
	},
	btnGroup: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'row'
	}
});

const mapStateToProps = (state) => {
	return {
		Auth: state.Auth
	};
};

export default connect(mapStateToProps)(AuthLoading);
