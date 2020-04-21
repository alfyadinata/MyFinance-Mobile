import React from 'react';
import { SafeAreaView } from 'react-native';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import History from '../screens/History';
import Create from '../screens/Create';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Text } from '@ui-kitten/components';
import AuthLoading from '../screens/AuthLoading';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Detail from '../screens/Detail';
import Edit from '../screens/Edit';

const HomeIcon = (style) => <Icon {...style} name="layout-outline" />;

const HistoryIcon = (style) => <Icon {...style} name="flip-2-outline" />;

const ProfileIcon = (style) => <Icon {...style} name="person-outline" />;

const TabBarComponent = ({ navigation }) => {
	const onSelect = (index) => {
		const selectedTabRoute = navigation.state.routes[index];
		navigation.navigate(selectedTabRoute.routeName);
	};

	return (
		<SafeAreaView>
			<BottomNavigation selectedIndex={navigation.state.index} onSelect={onSelect}>
				<BottomNavigationTab title="Home" icon={HomeIcon} />
				<BottomNavigationTab title="History" icon={HistoryIcon} />
				<BottomNavigationTab title="Profile" icon={ProfileIcon} />
			</BottomNavigation>
		</SafeAreaView>
	);
};

const HomeStack = createStackNavigator(
	{
		HomeScreen: {
			screen: Home,
			navigationOptions: {
				headerShown: false
			}
		},
		CreateScreen: Create
	},
	{
		mode: 'card',
		defaultNavigationOptions: {
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#426ae3'
			},
			gestureEnabled: true,
			cardOverlayEnabled: true,
			...TransitionPresets.ScaleFromCenterAndroid
		}
	}
);

HomeStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.index > 0) {
		tabBarVisible = false;
	}

	return {
		tabBarVisible
	};
};

const HistoryStack = createStackNavigator(
	{
		HistoryScreen: {
			screen: History
		},
		DetailScreen: {
			screen: Detail
		},
		EditScreen: {
			screen: Edit
		}
	},
	{
		mode: 'card',
		defaultNavigationOptions: {
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#426ae3'
			},
			gestureEnabled: true,
			cardOverlayEnabled: true,
			...TransitionPresets.ScaleFromCenterAndroid
		}
	}
);

HistoryStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true;
	if (navigation.state.index > 0) {
		tabBarVisible = false;
	}

	return {
		tabBarVisible
	};
};

const ProfileStack = createStackNavigator(
	{
		ProfileScreen: Profile
	},
	{
		mode: 'card',
		defaultNavigationOptions: {
			headerTintColor: 'white',
			headerTitleStyle: {
				alignSelf: 'center'
			},
			headerStyle: {
				backgroundColor: '#426ae3'
			},
			gestureEnabled: true,
			cardOverlayEnabled: true,
			...TransitionPresets.ScaleFromCenterAndroid
		}
	}
);

const AuthStack = createStackNavigator(
	{
		Auth: {
			screen: AuthLoading,
			navigationOptions: {
				headerShown: false
			}
		},
		SignIn: SignIn,
		SignUp: SignUp
	},
	{
		mode: 'card',
		defaultNavigationOptions: {
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#426ae3'
			},
			gestureEnabled: true,
			cardOverlayEnabled: true,
			...TransitionPresets.ModalSlideFromBottomIOS
		}
	}
);

const TabNavigator = createBottomTabNavigator(
	{
		Home: HomeStack,
		History: HistoryStack,
		Profile: ProfileStack
	},
	{
		tabBarComponent: TabBarComponent
		// defaultNavigationOptions: {
		// 	headerMode: 'none'
		// }
	}
);

const AppStack = createSwitchNavigator({
	Auth: AuthStack,
	App: TabNavigator
});

const Router = createAppContainer(AppStack);

export default Router;
