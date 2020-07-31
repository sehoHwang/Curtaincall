import React, { PureComponent, Children } from 'react';
import { View, Text } from 'react-native';
import { Image } from 'react-native';

const distanceIcon = (
    <Image
        source={require('../assets/images/icons/distance.png')}
        style={{height: 50, width: 50}}/>
);

const vehicleIcon = (
    <Image
        source={require('../assets/images/icons/vehicle.png')}
        style={{height: 50, width: 50}}/>
);

const optionIcon = (
    <Image
        source={require('../assets/images/icons/options2.png')}
        style={{height: 16, width: 16}}/>
)

export default class Icon extends PureComponent{
    render(){
        const { distance, vehicle, children, option } = this.props;
        if(distance) return distanceIcon;
        if(vehicle) return vehicleIcon;
        if(option) return optionIcon;
        return children || null;
    }
}