import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Alert, ToastAndroid } from 'react-native';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import http from '../../config/http';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/Auth';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSubmit: false,
			email: '',
			password: '',
			isError: false
		};
	}

	handleSubmit = async () => {
		this.setState({ isSubmit: true });
		await http
			.post('/api/signin', this.state)
			.then(async (res) => {
				this.setState({ isSubmit: false });

				if (res.data.code !== 200) {
					this.setState({ isError: true });

					return Alert.alert('Failed', 'Invalid Email or Password', [ { text: 'Ok' } ], {
						cancelable: false
					});
				}

				let token = res.data.token;
				let user = res.data.user;

				this.props.dispatch(
					authenticate({
						email: user.email,
						name: user.name
					})
				);

				await AsyncStorage.setItem('token', JSON.stringify(token));

				ToastAndroid.show('Success', ToastAndroid.LONG, ToastAndroid.CENTER);
				this.props.navigation.navigate('App');
			})
			.catch((err) => {
				console.info(err.message);
			});
	};

	onChangeEmail(value) {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (reg.test(value) === false) {
			this.setState({
				email: value,
				isError: true
			});
		} else {
			this.setState({
				email: value,
				isError: false
			});
		}
	}

	render() {
		const { email, password } = this.state;
		return (
			<Layout style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Layout style={styles.formContainer}>
						<Text status="control" category="h2" style={styles.title}>
							My Finance
						</Text>
						<Layout style={styles.formControl}>
							<Button
								status="control"
								appearance="ghost"
								style={styles.icon}
								icon={(style) => <Icon {...style} name="email-outline" width="32" height="32" />}
							/>
							<TextInput
								style={styles.input}
								value={email}
								onChangeText={(value) => this.onChangeEmail(value)}
								autoCapitalize="none"
								placeholder="example@mail.com"
								underlineColorAndroid={this.state.isError == true ? 'red' : 'white'}
								placeholderTextColor="#dfdfdf"
							/>
						</Layout>
						<Layout style={styles.formControl}>
							<Button
								status="control"
								appearance="ghost"
								style={styles.icon}
								icon={(style) => <Icon {...style} name="lock-outline" width="32" height="32" />}
							/>
							<TextInput
								style={styles.input}
								onChangeText={(password) => this.setState({ password: password, isError: false })}
								value={password}
								secureTextEntry={true}
								placeholder="******"
								underlineColorAndroid={this.state.isError == true ? 'red' : 'white'}
								placeholderTextColor="#dfdfdf"
							/>
						</Layout>
						<Button
							disabled={this.state.isSubmit == true ? true : false}
							status="control"
							appearance="outline"
							style={{ marginTop: 25, borderRadius: 20 }}
							onPress={this.handleSubmit}
						>
							Sign In
						</Button>
					</Layout>
					<Layout style={styles.btnGroup}>
						<Button
							status="control"
							appearance="ghost"
							style={styles.btn}
							onPress={() => this.props.navigation.replace('SignUp')}
						>
							Sign Up
						</Button>
						<Button status="control" appearance="ghost" style={styles.btn}>
							Forgot Password ?
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
		margin: 15,
		alignSelf: 'center'
	},
	formContainer: {
		padding: 15,
		paddingBottom: 45,
		marginTop: '20%',
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
		alignItems: 'center'
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

export default connect(mapStateToProps)(SignIn);
