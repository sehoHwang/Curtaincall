import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image, TouchableOpacity, Modal, Switch, Platform, TouchableHighlight, Button, TextInput } from 'react-native';
import  {Block, Block2, Card, Icon, Label, Card2, ModeCard, PreventionCard, Text, DeviceCard, WifiCard} from '../components'
import { PermissionsAndroid } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WifiManager from "react-native-wifi-reborn";
import { NetworkInfo } from "react-native-network-info";
import io from 'socket.io-client';
import TcpSocket from 'react-native-tcp-socket';
import base64 from 'react-native-base64';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import WifiList from '../components/WifiList';
import Toast2 from 'react-native-simple-toast';



export default class AddDevice extends Component{

    
    constructor(props){
        super(props);

        global.client=TcpSocket.createConnection({
            port: 80,
            host: '192.168.4.100',
            tls: false,
            interface: 'wifi',
            //localAddress: '192.168.4.101',
        }, () => {
            global.client.write('APPSETTING CONNECTED');
            
        });

        this.state= {
            value: '',
            list: [],
            
            modalVisible: false,
            settingVisible: false,
            ssid: '',
            wifiPassword: '',
            
        }
        

        /* 커튼 높이 설정 변수 */

        this.settingUpTimer = null;
        this.settingDownTimer = null;
        this.settingCurtainUp = this.settingCurtainUp.bind(this);
        this.settingStopCurtainUp = this.settingStopCurtainUp.bind(this);
        
        this.settingCurtainDown = this.settingCurtainDown.bind(this);
        this.settingStopCurtainDown = this.settingStopCurtainDown.bind(this);
    }
    
    componentDidMount(){
        
        /*const client = TcpSocket.createConnection({
            port: 80,
            host: '192.168.4.100',
            tls: false,
            interface: 'wifi',
            //localAddress: '192.168.4.101',
        }, () => {
            client.write('APPSETTING CONNECTED');
            
        });*/

        global.client.on('data', (data) => {
            //console.log('message was received', data);
            var strData="";
            let dataLen = data.length;
            for(var i=0; i<dataLen; i++){
                strData+=String.fromCharCode(data[i]);
                //console.log('message is', String.fromCharCode(data[i]));
            }
            console.log('message is', strData);
            this.onChagneValue(strData);
            this.onAddItem();
            

            //this.handleCreate(strData)

            //client.end();
            //console.log('message is', data['data']);
            
        });
        
        global.client.on('error', function(error) {
        console.log(error);
        });
        
        global.client.on('close', (id) => {
            console.log('Connection closed!');
            for(var i=0; i<id; i++){
                this.handleRemove(id);
            }
        });

        //client.setTimeout(30000);
        global.client.on('timeout', () => {
            console.log('socket timeout');
            global.client.end();
        })

        global.client.on('end', function(){
            console.log('disConnection from server!')
        })
        
        
    }

    /*componentWillUnmount(){
        this.setState({
            client: TcpSocket.createConnection({
                port: 80,
                host: '192.168.4.100',
                tls: false,
                interface: 'wifi',
                //localAddress: '192.168.4.101',
            }, () => {
                client.write('APPSETTING CONNECTED');
                
            }),
        })
    }*/
        
    /* 커튼 높이 설정 */
    settingCurtainUp = () => {
        this.settingUpTimer = setTimeout(this.settingCurtainUp, 200);
        Toast2.show('(재설정)커튼이 올라갑니다.');
        global.client.write('APPSETTING UP ~')
    }

    settingStopCurtainUp = () => {
        clearTimeout(this.settingUpTimer);
    }

    settingCurtainDown = () => {
        this.settingDownTimer = setTimeout(this.settingCurtainDown, 200);
        Toast2.show('(재설정)커튼이 내려갑니다.');
        global.client.write('APPSETTING DOWN ~')
    }

    settingStopCurtainDown = () => {
        clearTimeout(this.settingDownTimer);
    }


    handlePassword = (text) => {
        this.setState({
            wifiPassword: text
        })
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

    /* 와이파이 목록 생성 함수 */
    /*handleCreate = (data) => {
        //const { wifi } = this.state;
        this.setState({
            wifi: this.state.wifi.concat({ id: this.id++, ...data })
        })
    }*/

    /* 와이파이 생성 함수2 */

    onChagneValue = (data) =>{
        this.setState({
            value: data
        })
    }

    onAddItem = () => {
        
        this.setState(state => {
            const list = state.list.concat(state.value);

            return {
                list,
                value: '',
            }
        })
    }

    /* 와이파이 목록 제거 함수 */

    handleRemove = (id) => {
        const { wifi } = this.state;
        this.setState({
            wifi: wifi.filter(wifi => wifi.id !== id)
        })
    }

    /*componentDidMount(){
        this.handleCreate();
    }*/

    /* 와이파이 비밀번호 입력 모달창 */
    openInputPassword = (item) => {
        this.setState({
            modalVisible: true,
            ssid: item,
        })
    }

    closeInputPassword = () => {
        this.setState({
            modalVisible: false,
        })
    }

    /* 와이파이 전송 함수 */
    sendPassword = () => {
        this.setState({
            modalVisible: false,
            settingVisible: true,
        });
        global.client.write(this.state.wifiPassword)
    }

    /* 커튼 높이 설정 함수 */
    showSettingModal = () => {
        this.setState({
            settingVisible: true,
        })
    }

    closeSettingMode = () => {
        this.setState({
            settingVisible: false,
        })
    }

    render(){
        const { wifi } = this.state;
        /*const client = TcpSocket.createConnection({
            port: 80,
            host: '192.168.4.100',
            tls: false,
            interface: 'wifi',
            //localAddress: '192.168.4.101',
        }, () => {
            client.write('APPSETTING CONNECTED');
            
        });*/

        
        
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
                        
                            {this.state.list.map(item=>(
                                <WifiCard>
                                    <TouchableOpacity key={item} onPress={(e) => this.openInputPassword(item)}>
                                        <Text key={item} style={{marginLeft: 10, fontSize: 20, fontWeight: '600'}}>
                                            {item}
                                        </Text> 
                                    </TouchableOpacity>
                                </WifiCard>
                            ))}
                        
                    </Block>
                         
                </ScrollView>

                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 50, marginVertical: 200 ,padding:20, flex:1}}>
                            
                            <Block middle center flex={1}>
                                <Text bold style={{marginBottom: 20}}>{this.state.ssid}</Text>
                                <TouchableOpacity style={styles.settingList}>  
                                    <WifiCard>
                                        <TextInput 
                                            placeholder="와이파이 비밀번호를 입력하세요"
                                            onChangeText= {this.handlePassword}
                                            value={this.state.wifiPassword}
                                        />
                                    </WifiCard>
                                    
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:0.15, flexDirection:'column-reverse', marginBottom: 10, width:100, height:20}}
                                    onPress={this.sendPassword}
                                >
                                        <WifiCard style={{backgroundColor: '#f7c7b5', borderRadius: 20}}>                            
                                            <Text center bold style={{color:'#fff', size:30}}>완료</Text>
                                        </WifiCard>
                                </TouchableOpacity>
                            </Block>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.settingVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 60, marginVertical:160, padding:20, flex:1}}>
                            <View style={{flexDirection:"row-reverse", marginBottom: 20}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeCurtainSettingModal}/>
                            </View>
                            <View style={{flex:1, flexDirection:'column-reverse', alignItems:'center'}}>
                                
                                <TouchableOpacity style={{flex:0.15, flexDirection:'column-reverse', marginBottom: 10, width:100, height:20}}
                                    onPress={this.sendPassword}
                                >
                                        <WifiCard style={{backgroundColor: '#f7c7b5', borderRadius: 20}}>                            
                                            <Text center bold style={{color:'#fff', size:30}}>완료</Text>
                                        </WifiCard>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={{flex:0.4}} onPressIn={this.settingCurtainDown} onPressOut={this.settingStopCurtainDown}>
                                    <Ionicons name="chevron-down-circle-sharp" size={90} color={'#f7a88b'}/>
                                </TouchableOpacity>

                                <TouchableOpacity style={{flex:0.4}} onPressIn={this.settingCurtainUp} onPressOut={this.settingStopCurtainUp}>
                                    <Ionicons name="chevron-up-circle-sharp" size={90} color={'#f7a88b'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    
                    </View>
                </Modal>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    settingList: {
        marginBottom: 10,
        height:60,
        justifyContent:'center',
    },
    
})