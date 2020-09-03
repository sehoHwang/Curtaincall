import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image, TouchableOpacity, Modal, Switch, Platform, TouchableHighlight, Button, TextInput, Alert, } from 'react-native';
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
import Geolocation from '@react-native-community/geolocation';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage'

var iconv = require('iconv-lite'); // 인코딩, 디코딩 변수

export default class AddDevice extends Component{ 

    
    constructor(props){
        super(props);
        /* 현재 위치 불러오기 */
        var that =this;
        // 컴포넌트 실행 직후 permission 체크
        if(Platform.OS === 'ios'){
            this.callLocation(that);
        }else{
            async function requestCameraPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                            'title': 'Location Access Required',
                            'message': 'This App needs to Access your location'
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        // 승인 시 이를 알림
                        that.callLocation(that);
                    } else {
                        alert("Permission Denied");
                    }
                } catch (err) {
                    alert("err",err);
                    console.warn(err)
                }
            }
            requestCameraPermission();
        }

        global.client=TcpSocket.createConnection({
            port: 80,
            host: '192.168.4.100',
            tls: false,
            interface: 'wifi',
            //localAddress: '192.168.4.101',
        }, () => {
            global.client.write('APPSETTING CONNECTED \nAPPSETTING INITIALIZINGSTART \n');
            //global.client.write('APPSETTING INITIALIZINGSTART \n');
        });

        this.state= {
            value: '',
            list: [],
            
            modalVisible: false, // 와이파이 비밀번호 입력 모달창
            topsettingVisible: false, // 커튼 상단 높이 설정 모달창
            settingVisible: false, // 커튼 하단 높이 설정 모달창
            inputNameVisible: false, // 디바이스 이름 모달창
            ssid: '',
            wifiPassword: '',
            currentLongitude: '',
            currentLatitude: '',

        }
        

        /* 커튼 높이 설정 변수 */

        this.settingUpTimer = null;
        this.settingDownTimer = null;
        this.settingCurtainUp = this.settingCurtainUp.bind(this);
        this.settingStopCurtainUp = this.settingStopCurtainUp.bind(this);
        
        this.settingCurtainDown = this.settingCurtainDown.bind(this);
        this.settingStopCurtainDown = this.settingStopCurtainDown.bind(this);
    }

    componentDidMount = async()=>{  
        
        const DB = await AsyncStorage.getItem('@lucete:devices');
        console.log(DB+'를 불러옴');
        if(DB == null){
            let initializeJSON = {'device' : []};
            await AsyncStorage.setItem('@lucete:devices', JSON.stringify(initializeJSON));
            console.log('새로운 DB가 생성되었습니다.');
        }
        
        global.client.on('data', async(data) => {
            //console.log('message was received', data);
            
            var strData="";
            var tokenData="";
            let dataLen = data.length;
            for(var i=0; i<dataLen; i++){
                strData+=String.fromCharCode(data[i]);
                //console.log('message is', String.fromCharCode(data[i]));
            }
            console.log('message is', strData);
            this.onChagneValue(strData);
            tokenData = this.state.value.split(' ');
            
            if(tokenData[0] == 'APPSETTINGENDED'){
                
                this.setState({
                    deviceID: tokenData[1],
                })
                console.log('Device ID 수신 확인!')
                  
                var deviceDB = await AsyncStorage.getItem('@lucete:devices');
                var deviceDBJSON = JSON.parse(deviceDB);
                var deviceDuplicated = false;
                if(deviceDBJSON.device != null){
                    for(let singleDevice of deviceDBJSON.device){
                        if(singleDevice.deviceID == this.state.deviceID){
                            console.log('이미 등록된 아이디');
                            //error 문구(중복아이디 존재)
                            deviceDuplicated = true;
                            break;
                        }
                    }
                }
                if(!deviceDuplicated){
                    deviceDBJSON.device.push({
                        'deviceID' : this.state.deviceID,
                        'deviceName' : this.state.deviceName,
                        'firstMode' : '',
                        'secondMode' : '',
                        'alarm' : '',
                        'autoGap' : '',
                        //넣고싶은 컬럼 추가
                    });
                    await AsyncStorage.setItem('@lucete:devices',JSON.stringify(deviceDBJSON));
                    console.log('DB에 새로운 아이디 등록 성공');
                }
                global.client.write('APPSETTING CLOSED \n');
                global.client.end();
            }

            else if(tokenData[1] == 'WIFISUCCESSED'){
                this.setState({
                    modalVisible: false,
                    topsettingVisible: true,
                });
                global.client.write('APPSETTING TOPSETTINGSTART \n')
            }

            else if(tokenData[1] == 'WIFIFAILED'){
                alert('일치하지 않는 비밀번호 입니다.')
                /*this.setState({
                    modalVisible:true,
                })*/
            }

            else if(tokenData[0] == 'APPSETTINGINITIALIZATION'){
                alert('와이파이 목록을 불러옵니다...');
                global.client.write('APPSETTING WIFILIST \n');
            }

            else{
                this.onAddItem();
            }

            
        
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


    /* 현재 위치 불러오는 함수 */
    callLocation(that){
        //alert("callLocation Called");
            Geolocation.getCurrentPosition(
            // 현재 위치 받아옴
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                
                const currentLatitude = JSON.stringify(position.coords.latitude);
                
                that.setState({ currentLongitude:currentLongitude });
                
                that.setState({ currentLatitude:currentLatitude });
                
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 100000, maximumAge: 1000 }
        );
        that.watchID = Geolocation.watchPosition((position) => {
            
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            
            const currentLatitude = JSON.stringify(position.coords.latitude);
            
            that.setState({ currentLongitude:currentLongitude });
            
            that.setState({ currentLatitude:currentLatitude });
            
        });
    }

    componentWillUnmount = () => {
        const {db} = this.state;
        Geolocation.clearWatch(this.watchID);
        
    }
        
    /* 커튼 높이 설정 */
    settingCurtainUp = () => {
        this.settingUpTimer = setTimeout(this.settingCurtainUp, 500);
        Toast2.show('(재설정)커튼이 올라갑니다.');
        global.client.write('APPSETTING UP \n')
    }

    settingStopCurtainUp = () => {
        clearTimeout(this.settingUpTimer);
    }

    settingCurtainDown = () => {
        this.settingDownTimer = setTimeout(this.settingCurtainDown, 500);
        Toast2.show('(재설정)커튼이 내려갑니다.');
        global.client.write('APPSETTING DOWN \n')
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
            //const value_decode = iconv.decode(state.value, 'EUC-KR').toString();
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
        /*this.setState({
            modalVisible: false,
            topsettingVisible: true,
        });*/
        global.client.write('APPSETTING SSID '+'\"'+this.state.ssid+'\"\nAPPSETTING PW '+'\"'+this.state.wifiPassword+'\"\nAPPSETTING LOCATION '+this.state.currentLatitude+' '+this.state.currentLongitude+' \nAPPSETTING TOPSETTINGSTART \n');
        //global.client.write('APPSETTING PW '+'\"'+this.state.wifiPassword+'\"\n');
        //global.client.write('APPSETTING LOCATION '+this.state.currentLatitude+' '+this.state.currentLongitude+' \n');
        //global.client.write('APPSETTING TOPSETTINGSTART \n');
        //global.client.write(this.state.wifiPassword + ' ' + this.state.currentLongitude + ' ' + this.state.currentLatitude);
        //global.client.write(this.state.currentLongitude);
       //global.client.write(this.state.currentLatitude);
       
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
    /* 커튼 상단 설정완료 함수 */
    topSettingEnd = () => {
        this.setState({
            topsettingVisible: false,
            settingVisible: true,
        })
        global.client.write('APPSETTING BOTTOMSETTINGSTART \n');
    }

    /* 디바이스 이름 설정 */

    showInputNameModal = () => {
        this.setState({
            inputNameVisible: true,
            settingVisible: false,
        })
        global.client.write('APPSETTING CURTAINSETTINGENDED \n');
    }

    handleDeviceName = (text) => {
        this.setState({
            deviceName: text
        })
        console.log('기기 이름이 '+this.state.deviceName+'로 설정되었습니다.')
    }

    saveDeviceInfo = () => {
        //const {navigation} = this.props;
        global.client.write('APPSETTING CURTAINSETTINGENDED \n');
        global.client.write('APPSETTING INITIALIZINGCOMPLETE \n');
        this.setState({
            inputNameVisible:false,
        })
        //navigation.navigate('Dashboard')
    }

    /* AsyncStorage */
    saveDevice = async () => {
        
        await AsyncStorage.setItem('@lucete:devices', JSON.stringify(this.state.devices));
        
        console.log('Async db 저장 성공적!')
    }

    /*addDevice = () => {
        
        const newDevice = { deviceID: 'lucete4', deviceName: '안방', firstMode: '방범 모드', secondMode: '알람 모드'}
        this.setState({
            deviceID: '',
            deviceName: '',
            firstMode: '',
            secondMode: '',
            devices: this.state.devices.concat(newDevice),
        }, this.saveDevice)
    }*/
    render(){
        const { wifi } = this.state;
        const {navigation} = this.props;
        //const {navigation} = this.props;
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
                    visible={this.state.topsettingVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 60, marginVertical:100, padding:20, flex:1}}>
                            <View style={{flexDirection:"row-reverse", marginBottom: 20}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeCurtainSettingModal}/>
                            </View>
                            <View style={{flex:1, flexDirection:'column-reverse', alignItems:'center'}}>
                                
                                <TouchableOpacity style={{flex:0.15, flexDirection:'column-reverse', marginBottom: 10, width:100, height:20}}
                                    onPress={this.topSettingEnd}
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
                                <Text>커튼을 최상단으로 이동시켜 주세요!</Text>
                            </View>
                        </View>
                    
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.settingVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 60, marginVertical:100, padding:20, flex:1}}>
                            <View style={{flexDirection:"row-reverse", marginBottom: 20}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeCurtainSettingModal}/>
                            </View>
                            <View style={{flex:1, flexDirection:'column-reverse', alignItems:'center'}}>
                                
                                <TouchableOpacity style={{flex:0.15, flexDirection:'column-reverse', marginBottom: 10, width:100, height:20}}
                                    onPress={this.showInputNameModal}
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
                                <Text>커튼을 최하단으로 이동시켜 주세요!</Text>
                            </View>
                        </View>
                    
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.inputNameVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 50, marginVertical: 200 ,padding:20, flex:1}}>
                            
                            <Block middle center flex={1}>
                                <Text bold style={{marginBottom: 20}}>{this.state.ssid}</Text>
                                <TouchableOpacity style={styles.settingList}>  
                                    <WifiCard>
                                        <TextInput 
                                            placeholder="기기의 이름을 입력하세요"
                                            onChangeText= {this.handleDeviceName}
                                            value={this.state.deviceName}
                                        />
                                    </WifiCard>
                                    
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:0.15, flexDirection:'column-reverse', marginBottom: 10, width:100, height:20}}
                                    onPress={this.saveDeviceInfo}
                                >
                                        <WifiCard style={{backgroundColor: '#f7c7b5', borderRadius: 20}}>                            
                                            <Text center bold style={{color:'#fff', size:30}}>완료</Text>
                                        </WifiCard>
                                </TouchableOpacity>
                            </Block>
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