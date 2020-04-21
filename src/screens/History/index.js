import React from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Layout, Card, Icon, Button, List, ListItem, Text } from '@ui-kitten/components';
import http from '../../config/http';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation, NavigationEvents } from 'react-navigation';
import Rupiah from 'rupiah-format';

class History extends React.Component {
	static navigationOptions = () => ({
		title: 'History'
	});

	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			data: []
		};
	}

	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('didFocus', () => {
			this.getData();
		});
	}

	componentWillUnmount() {
		this._unsubscribe.remove;
	}

	getData = async () => {
		await http
			.get('/api/finance')
			.then((res) => {
				this.setState({ data: res.data.data, isLoading: false });
				console.info(res);
			})
			.catch((err) => {
				console.info(err);
			});
	};

	onRefresh() {
		this.setState({
			data: [],
			isLoading: true
		});
		this.getData();
	}

	render() {
		const renderItem = ({ item, index }) => (
			<Card style={styles.card}>
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate('DetailScreen', {
							id: item.id,
							income: item.income,
							desc: item.description,
							price: item.price,
							category: item.category,
							date: item.date
						})}
				>
					<ListItem
						title={`${item.income == 1 ? 'Income' : 'Spending'}`}
						description={`${item.description}`}
						icon={() => (
							<Button
								status={item.income != 1 ? 'danger' : 'success'}
								icon={(style) => (
									<Icon
										{...style}
										name={item.income !== 1 ? 'trending-down-outline' : 'trending-up-outline'}
									/>
								)}
							/>
						)}
						accessory={() => (
							<Text status={item.income !== 1 ? 'danger' : 'success'}>
								{item.income == 1 ? (
									`+ ${Rupiah.convert(item.price)}`
								) : (
									`- ${Rupiah.convert(item.price)}`
								)}
							</Text>
						)}
					/>
				</TouchableOpacity>
			</Card>
		);
		return (
			<List
				refreshControl={
					<RefreshControl refreshing={this.state.isLoading} onRefresh={this.onRefresh.bind(this)} />
				}
				style={{ padding: 10, backgroundColor: 'white' }}
				showsVerticalScrollIndicator={false}
				maximumZoomScale={1}
				contentContainerStyle={{ paddingBottom: '20%' }}
				data={this.state.data}
				renderItem={renderItem}
				maxToRenderPerBatch={7}
				style={{ alignSelf: 'stretch', backgroundColor: 'white' }}
			/>
		);
	}
}

const styles = StyleSheet.create({
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

export default History;
