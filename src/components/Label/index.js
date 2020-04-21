import React from 'react';
import { Text } from '@ui-kitten/components';

function Label(props) {
	return (
		<Text style={{ color: 'rgba(0,0,0,0.5)' }} category={props.category}>
			{props.text}
		</Text>
	);
}

export default Label;
