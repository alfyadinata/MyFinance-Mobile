import React from 'react';
import { StyleSheet, Alert, AsyncStorage, ToastAndroid } from 'react-native';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { TouchableHighlight, ScrollView, TextInput } from 'react-native-gesture-handler';
import Wave from 'react-native-waveview';
import http from '../../config/http';

class SignUp extends React.Component {
	state = {
		isSubmit: false,
		email: '',
		password: '',
		name: '',
		isError: false
	};

	handleSubmit = async () => {
		this.setState({ isSubmit: true });

		await http
			.post('/api/signup', this.state)
			.then(async (res) => {
				this.setState({ isSubmit: false });

				if (res.data.code !== 200) {
					this.setState({ isError: true });

					return Alert.alert('Failed', 'Email already used', [ { text: 'Ok' } ], {
						cancelable: false
					});
				}

				ToastAndroid.show('Success', ToastAndroid.LONG, ToastAndroid.CENTER);
				this.props.navigation.navigate('SignIn');
			})
			.catch((err) => {
				console.info(err.message);
			});
	};
	render() {
		const { email, password, name, isError, isSubmit } = this.state;
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
								icon={(style) => <Icon {...style} name="person-outline" width="32" height="32" />}
							/>
							<TextInput
								style={styles.input}
								value={name}
								onChangeText={(name) => this.setState({ name: name, isError: false })}
								placeholder="Your Name"
								underlineColorAndroid={this.state.isError == true ? 'red' : 'white'}
								placeholderTextColor="white"
							/>
						</Layout>
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
								onChangeText={(email) => this.setState({ email: email, isError: false })}
								autoCapitalize="none"
								placeholder="example@mail.com"
								underlineColorAndroid={this.state.isError == true ? 'red' : 'white'}
								placeholderTextColor="white"
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
								placeholderTextColor="white"
							/>
						</Layout>
						<Button
							disabled={this.state.isSubmit == true ? true : false}
							status="control"
							appearance="outline"
							style={{ marginTop: 25, borderRadius: 20 }}
							onPress={this.handleSubmit}
						>
							Sign Up
						</Button>
					</Layout>
					<Layout style={styles.btnGroup}>
						<Button
							status="control"
							appearance="ghost"
							style={styles.btn}
							onPress={() => this.props.navigation.replace('SignIn')}
						>
							Sign In
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

export default SignUp;
