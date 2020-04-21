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
import Label from '../Label';
import http from '../../config/http';

class Chart extends React.Component {
	render() {
		const chartConfig = {
			backgroundGradientFrom: '#1E2923',
			backgroundGradientFromOpacity: 0,
			backgroundGradientTo: '#08130D',
			backgroundGradientToOpacity: 0.5,
			color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
			strokeWidth: 2, // optional, default 3
			barPercentage: 0.5
		};
		return (
			<Layout style={styles.container}>
				<Layout style={styles.chart}>
					<Label text={this.props.title} category="h4" />
					<PieChart
						data={this.props.data}
						width={350}
						height={220}
						chartConfig={chartConfig}
						accessor="population"
						backgroundColor="transparent"
						paddingLeft="15"
						absolute
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
		alignItems: 'center'
	}
});

export default Chart;
