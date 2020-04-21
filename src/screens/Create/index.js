import React from 'react';
import { Layout, Button, Input, Text, Datepicker, Icon, Spinner } from '@ui-kitten/components';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { StyleSheet, Picker, Modal, Alert, ToastAndroid } from 'react-native';
import { LinearGradient, Image } from 'react-native-svg';
import Label from '../../components/Label';
import http from '../../config/http';

class Create extends React.Component {
	static navigationOptions = () => ({
		title: 'Create Finance'
	});

	constructor(props) {
		super(props);
		this.state = {
			isSubmit: false,
			form: {
				price: '',
				income: 1,
				description: '',
				date: new Date(),
				category: 1
			}
		};
	}

	handleSubmit = async () => {
		this.setState({ isSubmit: true });

		await http
			.post('/api/finance/create', this.state.form)
			.then((res) => {
				console.info(res);
				if (res.data.code == 201) {
					ToastAndroid.showWithGravity('Success', ToastAndroid.LONG, ToastAndroid.CENTER);
					this.props.navigation.goBack();
					setTimeout(() => {
						this.props.navigation.navigate('HistoryScreen');
					}, 200);
				} else {
					ToastAndroid.showWithGravity('Invalid Input', ToastAndroid.LONG, ToastAndroid.CENTER);
				}
			})
			.catch((err) => {
				ToastAndroid.showWithGravity('Error', ToastAndroid.LONG, ToastAndroid.CENTER);

				return console.info(err);
			});

		this.setState({ isSubmit: false });
	};
	render() {
		const { price, description, income, category, date } = this.state.form;
		return (
			<Layout style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false} style={{ alignSelf: 'stretch' }}>
					<Modal
						animationincome="slide"
						backdropStyle={styles.backdrop}
						transparent={true}
						visible={this.state.isSubmit}
					>
						<Layout style={styles.backdrop}>
							<Spinner size="giant" status="info" />
							<Text status="control">Load..</Text>
						</Layout>
					</Modal>
					<Layout style={styles.formContainer}>
						<Layout style={styles.formInput}>
							<Label text="Price" />
							<TextInput
								placeholder="5,000"
								value={price}
								onChangeText={(price) =>
									this.setState((prevState) => ({
										form: {
											...prevState.form,
											price: price
										}
									}))}
								keyboardincome={'numeric'}
								label="Hola"
							/>
						</Layout>
						<Layout style={styles.formInput}>
							<Label text="income" />
							<Picker
								style={styles.select}
								onValueChange={(income) =>
									this.setState((prevState) => ({
										form: {
											...prevState.form,
											income: income
										}
									}))}
								selectedValue={income}
							>
								<Picker.Item label="Income" value="1" />
								<Picker.Item label="Spending" value="2" />
							</Picker>
						</Layout>
						<Layout style={styles.formInput}>
							<Label text="Category" />
							<Picker
								onValueChange={(category) =>
									this.setState((prevState) => ({
										form: {
											...prevState.form,
											category: category
										}
									}))}
								selectedValue={category}
								style={styles.select}
							>
								<Picker.Item label="Cash" value={1} />
								<Picker.Item label="Go-pay" value={2} />
								<Picker.Item label="Ovo" value={3} />
								<Picker.Item label="Bank" value={4} />
								<Picker.Item label="Dana" value={5} />
							</Picker>
						</Layout>
						<Layout style={styles.formInput}>
							<Label text="Description" />
							<TextInput
								placeholder="Top-up Gopay"
								value={description}
								onChangeText={(description) =>
									this.setState((prevState) => ({
										form: {
											...prevState.form,
											description: description
										}
									}))}
							/>
						</Layout>
						<Layout style={styles.formInput}>
							<Label text="Date" />
							<Datepicker
								icon={(style) => <Icon {...style} name="calendar" width="32" height="32" />}
								date={date}
								onSelect={(date) =>
									this.setState((prevState) => ({
										form: {
											...prevState.form,
											date: date
										}
									}))}
								placeholderTextColor="black"
							/>
						</Layout>
						<Button
							onPress={this.handleSubmit}
							disabled={this.state.isSubmit === true ? true : false}
							style={styles.btn}
						>
							Submit
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
		backgroundColor: '#fcf8f7'
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		marginTop: '50%',
		alignSelf: 'center',
		padding: 20,
		borderRadius: 20
	},
	formInput: {
		padding: 5,
		borderRadius: 10,
		marginBottom: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 7
		},
		shadowOpacity: 0.43,
		shadowRadius: 9.51,

		elevation: 15
	},
	formContainer: {
		margin: '4%',
		paddingTop: 15,
		backgroundColor: 'transparent'
	},
	select: {
		color: 'black',
		opacity: 0.6
	},
	btn: {
		borderRadius: 15
	}
});

export default Create;
