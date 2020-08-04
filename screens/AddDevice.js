import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image, TouchableOpacity, Modal, Switch, Platform, TouchableHighlight } from 'react-native';
import  {Block, Block2, Card, Icon, Label, Card2, ModeCard, PreventionCard, Text, DeviceCard} from '../components'

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class AddDevice extends Component{

    static navigationOptions = ({navigation}) => ({
        title: <Text h4 style={{color:'black'}}>LUCETE 등록</Text>,
        headerStyle: {
            elevation:0,
        },
        headerTitleStyle: {
            paddingLeft: 80,
            color: 'royalblue',
            fontWeight: 'bold',
           
        },
        headerLeft: ({onPress}) => (
            <Block style={{paddingLeft: 10}}>
                <TouchableWithoutFeedback onPress={() => onPress()}>
                    <FontAwesome size={20} color={'#ff7f50'} name='arrow-left' />
                </TouchableWithoutFeedback>
            </Block>
        ),

    })

    render(){
        return(
            <Block>
                <Text caption style={{paddingTop: 40, marginBottom:5,}}>기기 등록</Text>
                <ScrollView style={{paddingBottom:20}}>
                    <Block><DeviceCard><Text>1</Text></DeviceCard></Block>
                    <Block><DeviceCard><Text>1</Text></DeviceCard></Block>
                    <Block><DeviceCard><Text>1</Text></DeviceCard></Block>
                    <Block><DeviceCard><Text>1</Text></DeviceCard></Block>
                    <Block><DeviceCard><Text>1</Text></DeviceCard></Block>
                    <Block><DeviceCard><Text>1</Text></DeviceCard></Block>
                    <Block><DeviceCard><Text>1</Text></DeviceCard></Block>
                    <Block><DeviceCard><Text>1</Text></DeviceCard></Block>
                    <Block><DeviceCard><Text>1</Text></DeviceCard></Block>
                    <Block><DeviceCard><Text>1</Text></DeviceCard></Block>
                </ScrollView>
            </Block>
        )
    }
}