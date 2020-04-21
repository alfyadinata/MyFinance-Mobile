import React, { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Layout, Button, Text, Card, List, ListItem, Icon } from '@ui-kitten/components';
import Chart from '../../components/Chart';
import { connect } from 'react-redux';
import http from '../../config/http';
import Rupiah from 'rupiah-format';
import store from '../../store';
import { authenticate, getUser } from '../../actions/Auth';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			income: 0,
			spending: 0,
			isLoading: true,
			lastRecord: [],
			total: 0
		};
	}

	getLastRecord = async () => {
		http.get('/api/finance/last').then((res) => {
			this.setState({ lastRecord: res.data.data });
		});
	};

	async checkAuth() {
		await http.get('/api/profile').then((res) => {
			this.props.dispatch(
				authenticate({
					email: res.data.data.email,
					name: res.data.data.name
				})
			);
			this.setState({
				isLoading: false,
				spending: res.data.spending,
				income: res.data.income,
				total: res.data.total
			});
		});
	}

	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('didFocus', () => {
			this.checkAuth();
			this.getLastRecord();
		});
	}

	componentWillUnmount() {
		this._unsubscribe.remove;
	}

	render() {
		if (this.state.isLoading) {
			return <Text>Loading ...</Text>;
		}
		const MyList = (props) => {
			return (
				<Card style={styles.card}>
					<TouchableOpacity
					// onPress={() =>
					// 	this.props.navigation.navigate('DetailScreen', {
					// 		id: props.id,
					// 		income: props.income,
					// 		desc: props.description,
					// 		price: props.price,
					// 		category: props.category,
					// 		date: props.date
					// 	})}
					>
						<ListItem
							title={`${props.income == 1 ? 'Income' : 'Spending'}`}
							description={`${props.desc}`}
							icon={() => (
								<Button
									status={props.income != 1 ? 'danger' : 'success'}
									icon={(style) => (
										<Icon
											{...style}
											name={props.income !== 1 ? 'trending-down-outline' : 'trending-up-outline'}
										/>
									)}
								/>
							)}
							accessory={() => (
								<Text status={props.income !== 1 ? 'danger' : 'success'}>
									{props.income == 1 ? (
										`+ ${Rupiah.convert(props.price)}`
									) : (
										`- ${Rupiah.convert(props.price)}`
									)}
								</Text>
							)}
						/>
					</TouchableOpacity>
				</Card>
			);
		};
		const data = [
			{
				name: 'Income',
				population: parseInt(this.state.income),
				color: '#45d14e',
				legendFontColor: '#7F7F7F',
				legendFontSize: 13
			},
			{
				name: 'Spending',
				population: parseInt(this.state.spending),
				color: '#c95c1c',
				legendFontColor: '#7F7F7F',
				legendFontSize: 13
			}
		];
		return (
			<ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
				<Layout style={styles.container}>
					<Layout style={styles.header}>
						<Text category="h4" style={styles.title}>
							My Finance
						</Text>
						<Card style={styles.card}>
							<Layout style={styles.row}>
								<Layout style={styles.col}>
									<Text status="info" category="h4">
										Hi, {this.props.Auth.user.name}
									</Text>
								</Layout>
								<Layout style={styles.col}>
									<Button
										appearance="ghost"
										onPress={() => this.props.navigation.navigate('CreateScreen')}
										status="basic"
										size="giant"
										icon={(style) => <Icon {...style} name="plus-outline" width="32" height="32" />}
									/>
								</Layout>
							</Layout>
							<Text style={{ opacity: 0.5 }}>
								Total &nbsp;&nbsp; : {Rupiah.convert(this.state.total)}
							</Text>
						</Card>
					</Layout>
					<Chart data={data} title="Summary" />
					<Text status="info" category="h6" style={{ margin: '2%' }}>
						Last Records
					</Text>
					{this.state.lastRecord.map((data, index) => {
						return (
							<MyList
								key={index}
								price={data.price}
								desc={data.description}
								id={data.id}
								category={data.category}
								income={data.income}
							/>
						);
					})}
				</Layout>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	app: {
		width: '100%',
		backgroundColor: 'white'
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center'
	},
	row: {
		// flex: 1,
		flexDirection: 'row'
	},
	col: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	header: {
		padding: 25,
		backgroundColor: '#426ae3'
	},
	title: {
		color: 'white',
		marginTop: '3%'
	},
	card: {
		margin: 10,
		borderRadius: 20,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		elevation: 11
	}
});

const mapStateToProps = (state) => {
	return {
		Auth: state.Auth
	};
};

export default connect(mapStateToProps)(Home);
