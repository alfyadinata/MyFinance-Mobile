import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Layout, Card, Icon, Button, List, ListItem, Text } from '@ui-kitten/components';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from 'react-native-chart-kit';
import Label from '../components/Label';

class Summary extends React.Component {
	static navigationOptions = () => ({
		title: 'Summary'
	});
	render() {
		return (
			<Layout style={styles.container}>
				<Layout style={styles.chart}>
					<Label text="Income Charts" />
					<LineChart
						data={{
							labels: [ 'January', 'February', 'March', 'April', 'May', 'June' ],
							datasets: [
								{
									data: [
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100
									]
								}
							]
						}}
						width={Dimensions.get('window').width} // from react-native
						height={220}
						yAxisLabel="$"
						yAxisSuffix="k"
						yAxisInterval={1} // optional, defaults to 1
						chartConfig={{
							backgroundColor: '#182a52',
							backgroundGradientFrom: '#6872b3',
							backgroundGradientTo: '#97ccf7',
							decimalPlaces: 2, // optional, defaults to 2dp
							color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
							style: {
								borderRadius: 16
							},
							propsForDots: {
								r: '6',
								strokeWidth: '2',
								stroke: '#ffa726'
							}
						}}
						bezier
						style={{
							marginVertical: 8,
							borderRadius: 16
						}}
					/>
				</Layout>
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
	},
	chart: {
		padding: 10,
		// margin: '4%'
		alignItems: 'center'
	}
});

export default Summary;
