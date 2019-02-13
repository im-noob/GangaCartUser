
import React, { Component } from "react";
import {
    View,
	TouchableOpacity,
	AsyncStorage
} from "react-native";
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Badge,  } from 'react-native-elements'
import Global from "../constants/Global";

export default class CartButton extends React.Component{
	constructor(props)
	

	render(){
		return(
			<View style={{backgroundColor:"#2874f0"}}>
				<TouchableOpacity onPress={() => { this.props.obj.navigate('MyCart') } }>
					<View style={{flexDirection:'row',marginLeft:5}}>
						<Icon name="cart" style={{color: 'white', padding: 10, marginLeft:5, fontSize: 25}}/>
						<Badge value='5' status="error"  containerStyle={{ position: 'absolute', top: -4, right: 1 }} />
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}