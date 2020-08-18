import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image, TouchableOpacity, Modal, Switch, Platform, TouchableHighlight } from 'react-native';
import  {Block, Block2, Card, Icon, Label, Card2, ModeCard, PreventionCard, Text, DeviceCard} from '../components'
import { PermissionsAndroid } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WifiManager from "react-native-wifi-reborn";
import { NetworkInfo } from "react-native-network-info";
import io from 'socket.io-client';
import TcpSocket from 'react-native-tcp-socket';
import base64 from 'react-native-base64';

import WifiList from '../components/WifiList';

export default class AddDevice extends Component{

    id=0;
    constructor(props){
        super(props);

        this.state= {
            wifi: [
                {
                    id:0,
                    wifiname:'WAP123',
                },
                
                
            ],
        }
    }
    

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

    
    handleCreate = (data) => {
        const { wifi } = this.state;
        this.setState({
            wifi: wifi.concat({ id: this.id++, ...data })
        })
    }

    render(){
        
        const client = TcpSocket.createConnection({
            port: 80,
            host: '192.168.4.100',
            tls: false,
            interface: 'wifi',
            localAddress: '192.168.4.101',
        }, () => {
            client.write('APPSETTING WIFI START');
        });
    
        client.on('data', function(data) {
            //console.log('message was received', data);
            var strData="";
            let dataLen = data.length;
            for(var i=0; i<dataLen; i++){
                strData+=String.fromCharCode(data[i]);
                //console.log('message is', String.fromCharCode(data[i]));
            }
            console.log('message is', strData);
            {this.handleCreate(strData)}
            
            //console.log('message is', data['data']);
            
        });
        
        client.on('error', function(error) {
        console.log(error);
        });
        
        client.on('close', function(){
        console.log('Connection closed!');
        });
        
        // Write on the socket
        
        
        /*
        // Get Local IP
        NetworkInfo.getIPAddress().then(ipAddress => {
        console.log(ipAddress);
        });
        
        // Get IPv4 IP (priority: WiFi first, cellular second)
        NetworkInfo.getIPV4Address().then(ipv4Address => {
        console.log(ipv4Address);
        });
        
        // Get Broadcast
        NetworkInfo.getBroadcast().then(broadcast => {
        console.log(broadcast);
        });
        
        // Get SSID
        NetworkInfo.getSSID().then(ssid => {
        console.log(ssid);
        });
        
        // Get BSSID
        NetworkInfo.getBSSID().then(bssid => {
        console.log(bssid);
        });
        
        // Get Subnet
        NetworkInfo.getSubnet().then(subnet => {
        console.log(subnet);
        });
        
        // Get Default Gateway IP
        NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
        
        console.log(defaultGateway);
        this.setState({
            connectIP: defaultGateway,
        })
        });
        
        // Get frequency (supported only for Android)
        NetworkInfo.getFrequency().then(frequency => {
        console.log(frequency);
        });*/

          
        
        
        return(
            <Block style={{marginHorizontal : 20}}>
                <Text caption style={{paddingTop: 40, marginBottom:5,}}>wifi List</Text>
                <ScrollView style={{paddingBottom:20}} showsVerticalScrollIndicator={false}>
                    <Block>
                        <WifiList data={this.state.wifi} />
                        
                    </Block>
                         
                </ScrollView>
            </Block>
        )
    }
}
