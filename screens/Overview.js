import React, { Component, } from 'react';
import { TextInput, View, StyleSheet, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image, TouchableOpacity, Modal, Switch, Platform, TouchableHighlight, Alert} from 'react-native';
import * as theme from '../theme'
import  {Block, Block2, Card, Icon, Label, Card2, ModeCard, PreventionCard, WifiCard} from '../components'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text} from '../components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated from 'react-native-reanimated';
import BottomPopup from './BottomPopup';
import LinearGradient from 'react-native-linear-gradient';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ToggleSwitch from 'toggle-switch-react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast, {DURATION} from 'react-native-easy-toast';
import ModalSelector from 'react-native-modal-selector';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Toast2 from 'react-native-simple-toast';
import TcpSocket from 'react-native-tcp-socket';

let currentDevice;
let currentDeviceNumber;
let Info;
let deviceTitle;
const styles = StyleSheet.create({
    overview: {
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: '#faf7f7',
    },
    card: {
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.shadow,
        borderWidth: 1 ,
        padding: 25,
        
        shadowColor: theme.colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 20,
        shadowOffset: {width: -20, height: 10},
        elevation: 1,
        // box-shadow: 0 10px 20px 0 rgba(46, 91, 255, 0.07);
    },
    margin: {
        marginHorizontal: 25,
    },
    driver: {
        marginBottom: 11,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,

    },
    settingList: {
        marginBottom: 10,
        height:60,
        justifyContent:'center',
    },
    ButtonStyle: {
 
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#ff7f50',
        borderRadius:30,
        borderWidth: 1,
        borderColor: '#fff'
      },
    
})

const popupList = [
    {
        id:1,
        name: 'Task'
    },
    {
        id:2,
        name: 'Setting'
    },
    {
        id:3,
        name: 'Message'
    },
]


class Overview extends Component{
    
    constructor() {
        super()

        

        this.state = {
            isVisible: false,
            powerStatus: false,
            modalVisible: false, // setting 모달 visible
            curtainSettingVisible: false,
            bottomSettingVisible: false,
            textInputValue: '',

            frequent1: '',
            frequent2: '',

            frequentModalVisible: false,
            modeFirstListVisible: false,
            modeSecondListVisible: false,

            firstFrequent: false,
            secondFrequent:false,

            deviceTitle: '',

            wifiManualVisible: false,
            wifiListVisible: false,

            passwordVisible: false,

            value: '',
            list: [],
            ssid: '',
            wifiPassword:'',

            currentLongitude: '',
            currentLatitude: '',
            
        }
        /* 커튼 컨트롤 변수 */

        this.upTimer = null;
        this.downTimer = null;

        this.curtainUp = this.curtainUp.bind(this);
        this.stopcurtainUp = this.stopcurtainUp.bind(this);

        this.curtainDown = this. curtainDown.bind(this);
        this.stopcurtainDown = this.stopcurtainDown.bind(this);

        /* 커튼 재설정 변수 */

        this.settingUpTimer = null;
        this.settingDownTimer = null;
        this.settingCurtainUp = this.settingCurtainUp.bind(this);
        this.settingStopCurtainUp = this.settingStopCurtainUp.bind(this);
        
        this.settingCurtainDown = this.settingCurtainDown.bind(this);
        this.settingStopCurtainDown = this.settingStopCurtainDown.bind(this);

    }
    
    /* 전원 버튼 */
    powerOff = () => {
        this.setState({powerStatus: !this.state.powerStatus})
    }

    powerOn = () => {
        this.setState({powerStatus: !this.state.powerStatus})
        if(!this.state.powerStatus){
            this.refs.toast.show('Power On!', DURATION.LENGTH_LONG);
        }
        else{
            this.refs.toast.show('Power Off!', DURATION.LENGTH_LONG);
        }
    }

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

    openMenu = () => {
        this.setState({
            setmenuVisible: true
        })
    }

    closeMenu = () => {
        this.setState({
            setmenuVisible: false
        })
    }

    handlePicker= () => {
        this.setState({
            isVisible: false
        })
    }

    hidePicker = () => {
        this.setState({
            isVisible: false
        })
    }

    showPicker = () => {
        this.setState({
            isVisible: true
        })
    }

    popupRef = React.createRef();

    onShowPopup = () => {   
        this.popupRef.show()
    }
    
    onClosePopup = () => {
        this.popupRef.close()
    }

    showModal = () => {
        this.setState({
            modalVisible: true,
        })
    }

    closeModal = () => {
        this.setState({
            modalVisible:false,
        })
    }

    showFrequentModal = () => {
        this.setState({
            frequentModalVisible: true,
        })
    }

    closeFrequentModal = () => {
        this.setState({
            frequentModalVisible: false,
        })
    }

    showFirstModeListModal = () => {
        this.setState({
            modeFirstListVisible: true,
        })
    }

    showSecondModeListModal = () => {
        this.setState({
            modeSecondListVisible: true,
        })
    }

    closeFirstModeListModal = () => {
        this.setState({
            modeFirstListVisible: false,
        })
    }

    closeSecondModeListModal = () => {
        this.setState({
            modeSecondListVisible: false,
        })
    }

    showCurtainSettingModal = () => {
        this.setState({
            curtainSettingVisible: true,
        })
        global.client=TcpSocket.createConnection({
            port: 80,
            host: '192.168.4.100',
            tls: false,
            interface: 'wifi',
            //localAddress: '192.168.4.101',
        }, () => {
            global.client.write('APPSETTING CONNECTED \nAPPSETTING TOPSETTINGSTART \n');
            //global.client.write('APPSETTING INITIALIZINGSTART \n');
        });
    }

    closeCurtainSettingModal = () =>{
        global.client.write('APPSETTING BOTTOMSETTINGSTART \n');
        this.setState({
            curtainSettingVisible: false,
            bottomSettingVisible: true,
        })
        
    }

    completeCurtainSetting = () => {
        this.setState({
            bottomSettingVisible: false,
            modalVisible: false,
        })
        global.client.write('APPSETTING CURTAINSETTINGENDED \nAPPSETTING CLOSED \n');
        global.client.end();
    }

    closeUpSettingModal = () => {
        this.setState({
            curtainSettingVisible: false,
        })
    }

    closeBottomSettingModal = () => {
        this.setState({
            bottomSettingVisible: false,
        })
    }

    /* 데이터 저장 */

    saveFrequent1Enery= async()=>{
        Info.device[currentDeviceNumber].firstMode = '에너지 효율 모드';
        await AsyncStorage.setItem('@lucete:devices', JSON.stringify(Info));
        Info = JSON.parse(await AsyncStorage.getItem('@lucete:devices'));
        currentDevice = Info.device[currentDeviceNumber];
        alert('첫번째 우선순위가 저장되었습니다.');
    }
    saveFrequent1Landscape= async()=>{
        Info.device[currentDeviceNumber].firstMode = '조경 모드';
        await AsyncStorage.setItem('@lucete:devices', JSON.stringify(Info));
        Info = JSON.parse(await AsyncStorage.getItem('@lucete:devices'));
        currentDevice = Info.device[currentDeviceNumber];
        alert('첫번째 우선순위가 저장되었습니다.');
    }
    saveFrequent1Prevention= async()=>{
        Info.device[currentDeviceNumber].firstMode = '방범 모드';
        await AsyncStorage.setItem('@lucete:devices', JSON.stringify(Info));
        Info = JSON.parse(await AsyncStorage.getItem('@lucete:devices'));
        currentDevice = Info.device[currentDeviceNumber];
        alert('첫번째 우선순위가 저장되었습니다.');
    }
    saveFrequent1Alarm= async()=>{
        Info.device[currentDeviceNumber].firstMode = '알람 모드';
        await AsyncStorage.setItem('@lucete:devices', JSON.stringify(Info));
        Info = JSON.parse(await AsyncStorage.getItem('@lucete:devices'));
        currentDevice = Info.device[currentDeviceNumber];
        alert('첫번째 우선순위가 저장되었습니다.');
    }

    saveFrequent2Enery= async()=>{
        Info.device[currentDeviceNumber].secondMode = '에너지 효율 모드';
        await AsyncStorage.setItem('@lucete:devices', JSON.stringify(Info));
        Info = JSON.parse(await AsyncStorage.getItem('@lucete:devices'));
        currentDevice = Info.device[currentDeviceNumber];
        alert('두번째 우선순위가 저장되었습니다.');
    }
    saveFrequent2Landscape= async()=>{
        Info.device[currentDeviceNumber].secondMode = '조경 모드';
        await AsyncStorage.setItem('@lucete:devices', JSON.stringify(Info));
        Info = JSON.parse(await AsyncStorage.getItem('@lucete:devices'));
        currentDevice = Info.device[currentDeviceNumber];
        alert('두번째 우선순위가 저장되었습니다.');
    }
    saveFrequent2Prevention= async()=>{
        Info.device[currentDeviceNumber].secondMode = '방범 모드';
        await AsyncStorage.setItem('@lucete:devices', JSON.stringify(Info));
        Info = JSON.parse(await AsyncStorage.getItem('@lucete:devices'));
        currentDevice = Info.device[currentDeviceNumber];
        alert('두번째 우선순위가 저장되었습니다.');
    }
    saveFrequent2Alarm= async()=>{
        Info.device[currentDeviceNumber].secondMode = '알람 모드';
        await AsyncStorage.setItem('@lucete:devices', JSON.stringify(Info));
        Info = JSON.parse(await AsyncStorage.getItem('@lucete:devices'));
        currentDevice = Info.device[currentDeviceNumber];
        alert('두번째 우선순위가 저장되었습니다.');
    }

    /* 데이터 불러오기 */

    loadFrequent1Data = async() => {
        this.setState({
            frequent1: currentDevice.firstMode,
        })
    }

    loadFrequent2Data = async() => {
        this.setState({
            frequent2: currentDevice.secondMode,
        })
    }

    /* 첫번째 우선순위 모드 최종 변경 */

    addFirstFrequentFinal = () => {
        
        this.loadFrequent1Data();
        this.closeModal();
        this.closeFrequentModal();
        this.closeFirstModeListModal();
    }

    addSecondFrequentFinal = () => {
        
        this.loadFrequent2Data();
        this.closeModal();
        this.closeFrequentModal();
        this.closeSecondModeListModal();
    }


    state = {
        swtichValue: false,
        inOnEnergySwitch: false,
        isOnLandScapeSwitch: false,
        isOnPreventionSwitch: false,
        isOnAlarmSwitch: false,
        isOnFrequent1: false,
        isOnFrequent2: false,
        menuVisible: false,
        setmenuVisible: false,
        
       
    }

    selectFrequentMode1 = () =>{
        
        this.showFirstModeListModal()
        
    }

    selectFrequentMode2 = () =>{
        
        this.showSecondModeListModal()
    }

    addFirstFrequentMode1 = () => {
        
        this.saveFrequent1Enery();
        this.addFirstFrequentFinal();
    }

    addFirstFrequentMode2 = () => {
        this.saveFrequent1Landscape();
        this.addFirstFrequentFinal()
    }

    addFirstFrequentMode3 = () => {
        this.saveFrequent1Prevention()
        this.addFirstFrequentFinal()
    }

    addFirstFrequentMode4 = () => {
        this.saveFrequent1Alarm()
        this.addFirstFrequentFinal()
    }

    addSecondFrequentMode1 = () => {
        this.saveFrequent2Enery()
        this.addSecondFrequentFinal()
    }

    addSecondFrequentMode2 = () => {
        this.saveFrequent2Landscape()
        this.addSecondFrequentFinal()
    }

    addSecondFrequentMode3 = () => {
        this.saveFrequent2Prevention()
        this.addSecondFrequentFinal()
    }

    addSecondFrequentMode4 = () => {
        this.saveFrequent2Alarm()
        this.addSecondFrequentFinal()
    }

    onToggle(isOn) {
        console.log("Changed to " + isOn);
      }

    toggleSwitch = (value) => {
        this.setState({swtichValue: value})
    }

    /* 커튼 재설정 */
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

    /* 커튼 컨트롤 */

    curtainUp = () => {
        this.upTimer = setTimeout(this.curtainUp, 200);
        Toast2.show('커튼이 올라갑니다.');
    }

    stopcurtainUp = () => {
        clearTimeout(this.upTimer);
    }

    curtainDown = () => {
        this.downTimer = setTimeout(this.curtainDown, 200);
        Toast2.show('커튼이 내려갑니다.');
    }

    stopcurtainDown = () => {
        clearTimeout(this.downTimer);
    }

    /* 기기 삭제 후 홈 화면으로 돌아가기 */
    deleteDevice = async({navigation}) => {
        {Alert.alert(
            "기기 삭제",
            "정말로 기기를 삭제하시겠습니까?",
            [
                {
                    text:'삭제',
                    onPress: () => this.props.navigation.navigate('Dashboard'),
                }
            ]
        )}
        Info.device.splice(currentDeviceNumber, 1);
        await AsyncStorage.setItem('@lucete:devices', JSON.stringify(Info));
        console.log(await AsyncStorage.getItem('@lucete:devices'));
        navigation.navigate('Dashboard');
    }

    static navigationOptions = ({navigation}) => ({
        title: <Text h4 style={{color:'black'}}>LUCETE</Text>,
        headerTitleStyle: {
            paddingLeft: 110,
            color: 'royalblue'
        },
        headerLeft: ({onPress}) => (
            <Block>
                <TouchableWithoutFeedback onPress={() => onPress()}>
                    <FontAwesome size={20} color={'#ff7f50'} name='arrow-left' />
                </TouchableWithoutFeedback>
            </Block>
        ),
        headerRight: navigation.state.params && navigation.state.params.headerRight,
        headerLeftContainerStyle: {
            paddingLeft: theme.sizes.base
        },
        headerRightContainerStyle: {
            paddingRight: theme.sizes.base-10
        },
        headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
        }
    });

    /*
        header 부분 onPress 구현을 위한 navigation.params 사용
    */

    async componentDidMount(){ 
        console.log('didmount진입')
        const {navigation} = this.props;
        const deviceID = navigation.getParam('id');
        const DB = await AsyncStorage.getItem('@lucete:devices');
        Info = JSON.parse(DB);
        var i = 0;
        
        for(let singleDevice of Info.device){
            console.log('for문 실행')
            if(singleDevice.deviceID === deviceID){
                console.log('현재 기기 ID는' + singleDevice.deviceID)
                currentDevice = singleDevice;
                currentDeviceNumber = i;
                break;
                
            }
            i++;
        }
        this.setState({
            frequent1: currentDevice.firstMode,
            frequent2: currentDevice.secondMode,
        })
        
        this.props.navigation.setParams({
               headerRight: ( 
               <Block>
                    <TouchableWithoutFeedback onPress={this.showModal}>
                        <MaterialCommunityIcons  name='dots-vertical' size={20} color={'#ff7f50'}>
                            
                        </MaterialCommunityIcons>
                    </TouchableWithoutFeedback>
                </Block>
                )
        });
        this.loadFrequent1Data();
        this.loadFrequent2Data();

        deviceTitle = currentDevice.deviceName;

        
   }

   resettingWifi = () => {
       this.setState({
           modalVisible:false, // 시발 이거 변수 바꿔라 개새끼야!
           wifiManualVisible: true,
       })
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
   }

   /* 와이파이 재설정 매뉴얼 모달창 종료 */
   closeWifiManualModal = () => {
       this.setState({
           wifiManualVisible: false,
       })
   }

   closeWifiListModal = () => {
       this.setState({
           wifiListVisible: false,
       })
   }

   onChagneValue = (data) =>{
        this.setState({
            value: data
        })
    }

   startWifiSetting = () => {
        global.client=TcpSocket.createConnection({
            port: 80,
            host: '192.168.4.100',
            tls: false,
            interface: 'wifi',
            //localAddress: '192.168.4.101',
        }, () => {
            global.client.write('APPSETTING CONNECTED \nAPPSETTING WIFILIST \n');
            //global.client.write('APPSETTING INITIALIZINGSTART \n');
        });
        
       this.setState({
           wifiManualVisible: false,
           wifiListVisible: true,
       })
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
        

        if(tokenData[1] == 'WIFISUCCESSED'){
            alert('와이파이 재설정이 완료되었습니다.')
            this.setState({
                wifiListVisible: false,
            });
            global.client.write('APPSETTING CLOSED \n');
            global.client.end();
        }

        else if(tokenData[1] == 'WIFIFAILED'){
            alert('일치하지 않는 비밀번호 입니다.')
            /*this.setState({
                modalVisible:true,
            })*/
        }

        else{
            this.onAddItem();
        }
    });

       //alert('와이파이 목록을 불러옵니다...');
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

    openInputPassword = (item) => {
        this.setState({
            modalVisible: true,
            ssid: item,
        })
    }

    /* 와이파이 비밀번호 입력 모달창 */
    openInputPassword = (item) => {
        
        this.setState({
            passwordVisible: true,
            ssid: item,
        })
        
    }

    handlePassword = (text) => {
        this.setState({
            wifiPassword: text
        })
    }

    /* 와이파이 전송 함수 */
    sendPassword = () => {
        this.setState({
            passwordVisible: false,
            
        });
        //Toast2.show('와이파이 비밀번호 확인 후 커튼설정 창으로 이동됩니다.')
        global.client.write('APPSETTING SSID '+'\"'+this.state.ssid+'\"\nAPPSETTING PW '+'\"'+this.state.wifiPassword+'\"\nAPPSETTING LOCATION '+this.state.currentLatitude+' '+this.state.currentLongitude+' \nAPPSETTING TOPSETTINGSTART \n');
       
    }

    render(){
        const translateY = new Animated.Value(0);
        const {navigation} = this.props;
        return(
            <View style={{flex:1}}>
                <Toast ref="toast" />
                <TouchableWithoutFeedback onPress={() => {}}>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 50, marginVertical: 200 ,padding:20, flex:1}}>
                            <View style={{flexDirection:"row-reverse", marginBottom: 20}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeModal}/>
                            </View>
                            <Block middle flex={1}>
                                <TouchableOpacity style={styles.settingList} onPress={this.showCurtainSettingModal}>
                                        <WifiCard style={{backgroundColor: '#f7c7b5'}}>                            
                                            <Text center bold style={{color:'#fff'}}>커튼 재설정</Text>
                                        </WifiCard>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.settingList} onPress={this.showFrequentModal}>
                                    <WifiCard>
                                        <Text center bold>우선모드 등록하기</Text>
                                    </WifiCard>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.settingList} onPress={this.resettingWifi}>
                                    <WifiCard>                            
                                        <Text center bold>와이파이 재설정</Text>
                                    </WifiCard>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.settingList} onPress={this.deleteDevice}>
                                    <WifiCard>                            
                                        <Text center bold>기기 삭제하기</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                                
                            </Block>
                        </View>
                    </View>
                </Modal>
                </TouchableWithoutFeedback>

                <Modal
                    transparent={true}
                    visible={this.state.frequentModalVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 80, marginVertical:200, padding:20, flex:1}}>
                            <View style={{flexDirection:"row-reverse", marginBottom: 20}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeFrequentModal}/>
                            </View>
                            <Block middle flex={1}>
                                <TouchableOpacity style={styles.settingList} onPress={this.selectFrequentMode1}>
                                    
                                    <WifiCard style={{marginHorizontal:40}}>
                                        <Text bold center>우선순위 모드1</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.settingList} onPress={this.selectFrequentMode2}>
                                    <WifiCard style={{marginHorizontal:40}}>
                                        <Text bold center>우선순위 모드2</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                            </Block>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.modeFirstListVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 60, marginVertical:160, padding:20, flex:1}}>
                            <View style={{flexDirection:"row-reverse", marginBottom: 20}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeFirstModeListModal}/>
                            </View>
                            <Block middle flex={1}>
                                <TouchableOpacity style={styles.settingList} onPress={this.addFirstFrequentMode1}>
                                    <WifiCard style={{marginHorizontal:40}}>
                                        <Text bold center>에너지 효율 모드</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.settingList} onPress={this.addFirstFrequentMode2}>
                                    <WifiCard style={{marginHorizontal:40}}>
                                        <Text bold center>조경 모드</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.settingList} onPress={this.addFirstFrequentMode3}>
                                    <WifiCard style={{marginHorizontal:40}}>
                                        <Text bold center>방범 모드</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.settingList} onPress={this.addFirstFrequentMode4}>
                                    <WifiCard style={{marginHorizontal:40}}>
                                        <Text bold center>알람 모드</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                            </Block>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.modeSecondListVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 60, marginVertical:160, padding:20, flex:1}}>
                            <View style={{flexDirection:"row-reverse", marginBottom: 20}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeSecondModeListModal}/>
                            </View>
                            <Block middle flex={1}>
                                <TouchableOpacity style={styles.settingList} onPress={this.addSecondFrequentMode1}>
                                    <WifiCard style={{marginHorizontal:40}}>
                                        <Text bold center>에너지 효율 모드</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.settingList} onPress={this.addSecondFrequentMode2}>
                                    <WifiCard style={{marginHorizontal:40}}>
                                        <Text bold center>조경 모드</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.settingList} onPress={this.addSecondFrequentMode3}>
                                    <WifiCard style={{marginHorizontal:40}}>
                                        <Text bold center>방범 모드</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.settingList} onPress={this.addSecondFrequentMode4}>
                                    <WifiCard style={{marginHorizontal:40}}>
                                        <Text bold center>알람 모드</Text>
                                    </WifiCard>
                                </TouchableOpacity>
                            </Block>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.curtainSettingVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 60, marginVertical:100, padding:20, flex:1}}>
                            <View style={{flexDirection:"row-reverse", marginBottom: 20}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeUpSettingModal}/>
                            </View>
                            <View style={{flex:1, flexDirection:'column-reverse', alignItems:'center'}}>
                                
                                <TouchableOpacity style={{flex:0.15, flexDirection:'column-reverse', marginBottom: 10, width:100, height:20}}
                                    onPress={this.closeCurtainSettingModal}
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
                    visible={this.state.bottomSettingVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 60, marginVertical:100, padding:20, flex:1}}>
                            <View style={{flexDirection:"row-reverse", marginBottom: 20}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeBottomSettingModal}/>
                            </View>
                            <View style={{flex:1, flexDirection:'column-reverse', alignItems:'center'}}>
                                
                                <TouchableOpacity style={{flex:0.15, flexDirection:'column-reverse', marginBottom: 10, width:100, height:20}}
                                    onPress={this.completeCurtainSetting}
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
                    visible={this.state.wifiManualVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginVertical:200, padding:20, flex:1}}>
                            <View style={{ marginBottom: 20, flexDirection: 'row-reverse'}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeWifiManualModal}/>
                            </View>
                            <View style={{flex:1, alignItems:'center'}}>
                                <Block style={{flex:1, backgroundColor:'#fff'}}>
                                    
                                    <Block center style={{flex:1, marginBottom:60}}>
                                        
                                        
                                        <Text center caption style={{marginTop: 10, marginBottom: 5, marginHorizontal: 30}}>
                                            와이파이 재설정을 위해서 LUCETE 기기 연결이 필요합니다.
                                        </Text>
                                        <Text center caption style={{marginTop: 10, marginBottom:20, marginHorizontal: 30}}>
                                            설정 창에서 연결을 완료한 후 진행해주세요!
                                        </Text>
                                        <Text h4 bold style={{marginBottom: 40,}}>커튼콜 디바이스 연결 필요</Text>
                                        <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5} onPress={this.startWifiSetting}>
                                            <Text bold style={{color:'#fff', marginHorizontal:20,}}>GET STARTED!</Text>
                                        </TouchableOpacity>
                                    
                                    </Block>
                                    
                                </Block>
                                
                            </View>
                        </View>
                    
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.wifiListVisible}
                    animationType={'slide'}
                >
                    <View style={{backgroundColor: '#000000aa', flex:1}}>
                        <View style={{backgroundColor: '#ffffff', marginHorizontal: 20, marginVertical:100, padding:20, flex:1}}>
                            <View style={{ marginBottom: 20, flexDirection: 'row-reverse'}}>
                                <MaterialCommunityIcons name="close" color={'#ff7f50'} size={25} onPress={this.closeWifiListModal}/>
                            </View>
                            <View style={{flex:1, alignItems:'center'}}>
                                <Block style={{flex:1, backgroundColor:'#fff'}}>
                                    
                                    <Block center style={{flex:1, marginBottom:60}}>
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
                                        
                                        
                                    
                                    </Block>
                                    
                                </Block>
                                
                            </View>
                        </View>
                    
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    visible={this.state.passwordVisible}
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

            <ScrollView style={{flex:1, backgroundColor: '#faf7f7'}} showsVerticalScrollIndicator={false}>
                <Card2 col middle style={[{marginTop: 0, borderWidth: 0, shadow:{shadowColor:'#f79e7c', elevation:0}, backgroundColor: '#f7b297'}]}>
                   
                            <Block2 row flex={2} style={{marginRight: 20}}>
                                <Block2>
                                    <Text h3 bold style={{color: '#fff'}}>우선순위 모드</Text>
                                    <Text paragraph color = "pinkorange" style={{marginTop: 3,}}>Frequently used</Text>
                                </Block2>
                                
                                <Block2 style={{alignItems: 'flex-end', marginBottom: 20}}>
                                    <MaterialCommunityIcons onPress={this.powerOn} name="power" size={50} color={this.state.powerStatus? '#ff7f50':'#cfc9c6'}style={{backgroundColor: '#fff', borderRadius:30}}/>
                                    
                                </Block2>
                                
                            </Block2>
                            <Block2 center>
                                
                                <Block2 flex={1} center middle style={{padding: 25, backgroundColor: '#f7b9a1', marginRight: 10, width:250, height:200, borderRadius: 10}}>
                                    <Text bold color = "pinkorange" style={{marginTop: 2,marginBottom:3}}>Curtain Controller</Text>
                                    <TouchableOpacity onPressIn={this.curtainUp} onPressOut={this.stopcurtainUp}>
                                        <Ionicons name="chevron-up-circle-outline" size={60} color={'#f7e7e1'} style={{marginBottom:30}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPressIn={this.curtainDown} onPressOut={this.stopcurtainDown}>
                                        <Ionicons name="chevron-down-circle-outline" size={60} color={'#f7e7e1'}/>
                                    </TouchableOpacity>
                                </Block2>
                            </Block2>
                            <Block2 row flex={2} style={{marginTop: 10, }}>
                                <Block2 flex={1} center middle style={{padding: 25, backgroundColor: '#f7b9a1', marginRight: 10, height:70, borderRadius: 10}}>
                                   
                                    <Text light style={{marginBottom:10, color: '#fff'}}>{this.state.frequent1}</Text>
                                        <ToggleSwitch
                                            isOn={false}
                                            onColor='#faa889'
                                            offColor='#ebe2df'
                                            size='small'
                                            isOn={this.state.isOnFrequent1}
                                            onToggle={isOnFrequent1 => {
                                                this.setState({isOnFrequent1});
                                                this.setState({isOnFrequent2: false});
                                                this.setState({isOnEnergySwitch: false});
                                                this.setState({isOnLandScapeSwitch: false});
                                                this.setState({isOnPreventionSwitch: false});
                                                this.setState({isOnAlarmSwitch: false});
                                                this.onToggle(isOnFrequent1);
                                               
                                            }}
                                        />
                                </Block2>
                                <Block2 flex={1} center middle style={{padding: 25, backgroundColor: '#f7b9a1', marginRight: 10, height:70, borderRadius: 10}}>
                                        <Text light style={{marginBottom:10, color: '#fff'}}>{this.state.frequent2}</Text>
                                        <ToggleSwitch
                                            isOn={false}
                                            onColor='#faa889'
                                            offColor='#ebe2df'
                                            size='small'
                                            isOn={this.state.isOnFrequent2}
                                            onToggle={isOnFrequent2 => {
                                                this.setState({isOnFrequent2});
                                                this.setState({isOnFrequent1: false});
                                                this.setState({isOnEnergySwitch: false});
                                                this.setState({isOnLandScapeSwitch: false});
                                                this.setState({isOnPreventionSwitch: false});
                                                this.setState({isOnAlarmSwitch: false});
                                                this.onToggle(isOnFrequent2);
                                            }}
                                        />
                                </Block2>
                            </Block2>
                       
                    </Card2>
                <SafeAreaView style={styles.overview}>
                    
                        

                        <Block2 row style={[{marginTop: 18,}]}>
                            <Card title="알람 모드 시간"
                            middle style={[{marginRight: 7}]}
                            deviceID = {navigation.getParam('id')}>
                                {/*<Icon vehicle />*/}
                                {/*<TouchableWithoutFeedback onPress={this.showPicker}>
                                    <MaterialCommunityIcons  name='dots-vertical' size={20} color={'#ff7f50'}/>
                                        </TouchableWithoutFeedback>*/}
                                {/*<Text h2 bold style={{marginTop: 15}}>7:00 AM</Text>*/}
                                <Text paragraph color="gray">Set the Alarm</Text>
                            </Card>
                            <PreventionCard title="방범 모드 간격"
                            middle style={[{marginLeft: 7}]}
                            deviceID = {navigation.getParam('id')}>
                                {/*<Icon distance />*/}
                                {/*<Text h2 bold style={{marginTop: 15}}>1hour</Text>*/}
                                <Text paragraph color="gray">Set the Gap</Text>
                            </PreventionCard>
                        </Block2>

                        <ModeCard 
                            title="모드 선택"
                             style={[{marginTop: 18, marginBottom: 18}]}>
                           <Block2 row>
                                <Block2 center style={{padding:20, borderRightWidth: 0.5}}>
                                    <SimpleLineIcons name="energy" size={25} style={{marginBottom:10}}/>
                                    <Text bold style={{marginBottom:10}}>에너지 효율 모드</Text>
                                    <ToggleSwitch
                                        isOn={false}
                                        onColor='#faa889'
                                        offColor='#e0d8d5'
                                        size='small'
                                        isOn={this.state.isOnEnergySwitch}
                                        onToggle={isOnEnergySwitch => {
                                            this.setState({isOnEnergySwitch});
                                            this.setState({isOnFrequent2: false});
                                            this.setState({isOnPreventionSwitch: false});
                                            this.setState({isOnLandScapeSwitch: false});
                                            this.setState({isOnFrequent1: false});
                                            this.setState({isOnAlarmSwitch: false});
                                            this.onToggle(isOnEnergySwitch);
                                        }}
                                    />
                                </Block2>
                                <Block2 center style={{padding:20}}>
                                    <Entypo name="flower" size={25} style={{marginBottom: 10}}/>
                                    <Text bold style={{marginBottom:10}}>조경 모드</Text>
                                    <ToggleSwitch
                                        isOn={false}
                                        onColor='#faa889'
                                        offColor='#e0d8d5'
                                        size='small'
                                        isOn={this.state.isOnLandScapeSwitch}
                                        onToggle={isOnLandScapeSwitch => {
                                            this.setState({isOnLandScapeSwitch});
                                            this.setState({isOnFrequent2: false});
                                            this.setState({isOnEnergySwitch: false});
                                            this.setState({isOnPreventionSwitch: false});
                                            this.setState({isOnFrequent1: false});
                                            this.setState({isOnAlarmSwitch: false});
                                            this.onToggle(isOnLandScapeSwitch);
                                        }}
                                    />
                                </Block2>
                            </Block2>
                            <Block2 row style={{marginTop: 18}}>
                                <Block2 center style={{padding:20, borderRightWidth: 0.5}}>
                                    <MaterialCommunityIcons name="shield-home-outline" size={25} style={{marginBottom: 10}}/>
                                    <Text bold style={{marginBottom:10}}>방범 모드</Text>
                                    <ToggleSwitch
                                        isOn={false}
                                        onColor='#faa889'
                                        offColor='#e0d8d5'
                                        size='small'
                                        isOn={this.state.isOnPreventionSwitch}
                                        onToggle={isOnPreventionSwitch => {
                                            this.setState({isOnPreventionSwitch});
                                            this.setState({isOnFrequent2: false});
                                            this.setState({isOnEnergySwitch: false});
                                            this.setState({isOnLandScapeSwitch: false});
                                            this.setState({isOnFrequent1: false});
                                            this.setState({isOnAlarmSwitch: false});
                                            this.onToggle(isOnPreventionSwitch);
                                        }}
                                    />
                                </Block2>
                                <Block2 center style={{padding:20}}>
                                    <MaterialCommunityIcons name="alarm" size={25} style={{marginBottom: 10}}/>
                                    <Text bold style={{marginBottom:10}}>알람 모드</Text>
                                    <ToggleSwitch
                                        isOn={false}
                                        onColor='#faa889'
                                        offColor='#e0d8d5'
                                        size='small'
                                        isOn={this.state.isOnAlarmSwitch}
                                        onToggle={isOnAlarmSwitch => {
                                            this.setState({isOnPreventionSwitch: false});
                                            this.setState({isOnFrequent2: false});
                                            this.setState({isOnEnergySwitch: false});
                                            this.setState({isOnLandScapeSwitch: false});
                                            this.setState({isOnFrequent1: false});
                                            this.setState({isOnAlarmSwitch});
                                            this.onToggle(isOnAlarmSwitch);
                                        }}
                                    />
                                </Block2>
                            </Block2>
                           
                        </ModeCard>

                        {/*<Card 
                            title="TOP DRIVERS"
                             style={[{marginTop: 18}]}>
                            <Block2 style={styles.driver}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Block2 row center>
                                        <Block2>
                                            <Image source = {{uri: 'https://images.unsplash.com/photo-1506244856291-8910ea843e81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'}} style={styles.avatar}/>
                                        </Block2>
                                        <Block2>
                                            <Text h4>Seho</Text>
                                            <Text paragraph color="gray">
                                                Volvo Intellisafe
                                            </Text>
                                        </Block2>
                                        <Block2>
                                            <Text paragraph right color="black">
                                                $6,432
                                            </Text>
                                            <Text paragraph right color="gray">
                                                1,232 miles
                                            </Text>
                                        </Block2>
                                    </Block2>
                                </TouchableOpacity>
                            </Block2>
                            <Block2 style={styles.driver}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Block2 row center>
                                        <Block2>
                                            <Image source= {{uri: 'https://images.unsplash.com/photo-1521657249896-063c0c611fe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'}} style={styles.avatar}/>
                                        </Block2>
                                        <Block2>
                                            <Text h4>Seho</Text>
                                            <Text paragraph color="gray">
                                                Chevorlet Intellisafe
                                            </Text>
                                        </Block2>
                                        <Block2>
                                            <Text paragraph right color="black">
                                                $6,432
                                            </Text>
                                            <Text paragraph right color="gray">
                                                1,232 miles
                                            </Text>
                                        </Block2>
                                    </Block2>
                                </TouchableOpacity>
                            </Block2>
                            <Block2 style={styles.driver}>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Block2 row center>
                                        <Block2>
                                            <Image source={{uri:'https://images.unsplash.com/photo-1536700503339-1e4b06520771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' }} style={styles.avatar} />
                                        </Block2>
                                        <Block2>
                                            <Text h4>Seho</Text>
                                            <Text paragraph color="gray">
                                                Infiniti dasd
                                            </Text>
                                        </Block2>
                                        <Block2>
                                            <Text paragraph right color="black">
                                                $6,432
                                            </Text>
                                            <Text paragraph right color="gray">
                                                1,232 miles
                                            </Text>
                                        </Block2>
                                    </Block2>
                                </TouchableOpacity>
                            </Block2>
                            
                        </Card>
                        
                        */}
                         
                        
                </SafeAreaView>
               
                </ScrollView>
                <BottomPopup title="Demo Popup" ref={(target) => this.popupRef = target} onTouchOutside={this.onClosePopup} data={popupList}></BottomPopup>
                {/*<DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                />*/}
            </View>
           
            
                
          
        )
    }
}

export default Overview;