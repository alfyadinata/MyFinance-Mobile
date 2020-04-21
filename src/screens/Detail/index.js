import React from 'react';
import { Layout, Button, Input, Text, Datepicker, Icon, Spinner } from '@ui-kitten/components';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { StyleSheet, Picker, Modal, Alert, ToastAndroid } from 'react-native';
import Label from '../../components/Label';
import http from '../../config/http';
import Rupiah from 'rupiah-format';

class Detail extends React.Component {
	static navigationOptions = () => ({
		title: `Finance Detail`
	});

	constructor(props) {
		super(props);
		this.state = {
			isSubmit: false,
			isEdit: false,
			price: '',
			income: '',
			description: '',
			date: new Date(),
			category: this.props.navigation.getParam('category')
		};
	}

	async componentDidMount() {
		await this.setState({
			income: this.props.navigation.getParam('income'),
			category: this.props.navigation.getParam('category')
		});
	}

	handleDelete = async () => {
		this.setState({ isSubmit: true });
		await http
			.delete(`/api/finance/delete/${this.props.navigation.getParam('id')}`)
			.then((res) => {
				ToastAndroid.show('deleted', ToastAndroid.LONG, ToastAndroid.CENTER);
				this.props.navigation.navigate('HistoryScreen');
			})
			.catch((err) => {
				console.info(err);
			});
		this.setState({ isSubmit: false });
	};

	handleSubmit = async () => {
		this.setState({ isSubmit: true });

		await http
			.post('/api/finance/Detail', this.state.form, {
				headers: {
					Authorization: `Bearer ${this.state.token}`
				}
			})
			.then((res) => {
				console.info(res);
				if (res.data.code == 200) {
					Alert.alert(
						'Success',
						'Finance  has been Detaild.',
						[
							{
								text: 'Ok',
								onPress: () => this.props.navigation.navigate('History')
							}
						],
						{
							cancelable: false
						}
					);
				}
			})
			.catch((err) => {
				console.info(err);
			});

		this.setState({ isSubmit: false });
	};
	render() {
		return (
			<ScrollView showsVerticalScrollIndicator={false} style={{ alignSelf: 'stretch', backgroundColor: 'white' }}>
				<Layout style={styles.container}>
					<Layout
						style={{
							backgroundColor: '#426ae3',
							height: 200,
							width: '100%',
							borderBottomLeftRadius: 100,
							borderBottomRightRadius: 100
						}}
					>
						<Layout style={{ alignItems: 'center', marginTop: 40, backgroundColor: 'transparent' }}>
							<Text category="h4" status="control">
								Info
							</Text>
							<Text category="h6" status="control">
								{this.props.navigation.getParam('income') == 1 ? 'Income' : 'Spending'}
							</Text>
							<Text category="h2" status="success">
								{Rupiah.convert(this.props.navigation.getParam('price'))}
							</Text>
						</Layout>
					</Layout>
					<Layout style={{ borderBottomWidth: 2, borderBottomColor: '#426ae3', margin: 4 }} />
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
							<Label text="Category" />
							<Picker
								enabled={this.state.isEdit == false ? false : true}
								onValueChange={(category) =>
									this.setState((prevState) => ({
										form: {
											...prevState.form,
											category: category
										}
									}))}
								selectedValue={this.state.category}
								style={styles.select}
							>
								<Picker.Item label="Cash" value={1} />
								<Picker.Item label="Go-pay" value={2} />
								<Picker.Item label="Ovo" value={3} />
								<Picker.Item label="Bank" value={4} />
								<Picker.Item label="Dana" value={5} />
							</Picker>
							<Label text="Description" />
							<Text status="info" style={styles.text}>
								{this.props.navigation.getParam('desc')}
							</Text>
							<Label text="Date" />
							<Text status="info" style={styles.text}>
								22/02/2020
							</Text>
						</Layout>
						<Layout style={{ marginTop: 20 }}>
							<Button
								appearance="outline"
								style={{ margin: 10 }}
								onPress={() =>
									this.props.navigation.navigate('EditScreen', {
										id: this.props.navigation.getParam('id'),
										income: this.props.navigation.getParam('income'),
										desc: this.props.navigation.getParam('desc'),
										price: this.props.navigation.getParam('price'),
										category: this.props.navigation.getParam('category'),
										date: this.props.navigation.getParam('date')
									})}
								icon={(style) => <Icon {...style} name="edit-outline" width="32" height="32" />}
							>
								Edit
							</Button>
							<Button
								style={{ margin: 10 }}
								appearance="outline"
								status="danger"
								icon={(style) => <Icon {...style} name="trash-outline" width="32" height="32" />}
								onPress={() =>
									Alert.alert(
										'Are you sure ?',
										'Deleted data cannot be recovered',
										[
											{
												text: 'Cancel',
												style: 'cancel'
											},
											{ text: 'Yes', onPress: () => this.handleDelete() }
										],
										{ cancelable: false }
									)}
							>
								Delete
							</Button>
						</Layout>
					</Layout>
				</Layout>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flex: 1
	},
	text: {
		opacity: 0.5,
		fontWeight: 'bold',
		fontFamily: 'arial'
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		marginTop: '50%',
		alignSelf: 'center',
		padding: 20,
		borderRadius: 20
	},
	formInput: {
		padding: 20,
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

export default Detail;
