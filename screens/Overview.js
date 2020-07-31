import React, { Component, } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image, TouchableOpacity, Modal, Switch, Platform } from 'react-native';
import * as theme from '../theme'
import  {Block, Block2, Card, Icon, Label, Card2, ModeCard, PreventionCard} from '../components'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text} from '../components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated from 'react-native-reanimated';
import BottomPopup from './BottomPopup';
import LinearGradient from 'react-native-linear-gradient';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ToggleSwitch from 'toggle-switch-react-native'

import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
        }
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

    state = {
        swtichValue: false,
        inOnEnergySwitch: false,
        isOnLandScapeSwitch: false,
        isOnPreventionSwitch: false,
        isOnAlarmSwitch: false,
        isOnFrequent1: false,
        isOnFrequent2: false,

    }
    
    onToggle(isOn) {
        console.log("Changed to " + isOn);
      }

    toggleSwitch = (value) => {
        this.setState({swtichValue: value})
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
        headerRight: () => (
            <Block>
                <TouchableWithoutFeedback onPress={this.onShowPopup}>
                    <MaterialCommunityIcons  name='dots-vertical' size={20} color={'#ff7f50'}/>
                </TouchableWithoutFeedback>
            </Block>
        ),
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

    
    render(){
        const translateY = new Animated.Value(0);

        return(
            <View style={{flex:1}}>
            <ScrollView style={{flex:1, backgroundColor: '#faf7f7'}} showsVerticalScrollIndicator={false}>
                <Card2 col middle style={[{marginTop: 0, borderWidth: 0, shadow:{shadowColor:'#f79e7c', elevation:0}, backgroundColor: '#f7b297'}]}>
                   
                            <Block2 row flex={2} style={{marginRight: 20}}>
                                <Block2>
                                    <Text h3 bold style={{color: '#fff'}}>우선순위 모드</Text>
                                    <Text paragraph color = "pinkorange" style={{marginTop: 3,}}>Frequently used</Text>
                                </Block2>
                                <Block2 style={{alignItems: 'flex-end', marginBottom: 20}}>
                                    <MaterialCommunityIcons name="power" size={50} style={{backgroundColor: '#fff', borderRadius:30, color:'#ff7f50'}}/>
                                </Block2>
                            </Block2>
                            <Block2 row flex={2} style={{marginTop: 10, }}>
                                <Block2 flex={1} center middle style={{padding: 25, backgroundColor: '#f7b9a1', marginRight: 10, height:70, borderRadius: 10}}>
                                    <Text light style={{marginBottom:10, color: '#fff'}}>우선순위 1</Text>
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
                                    <Text light style={{marginBottom:10, color: '#fff'}}>우선순위 2</Text>
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
                            middle style={[{marginRight: 7}]}>
                                {/*<Icon vehicle />*/}
                                {/*<TouchableWithoutFeedback onPress={this.showPicker}>
                                    <MaterialCommunityIcons  name='dots-vertical' size={20} color={'#ff7f50'}/>
                                        </TouchableWithoutFeedback>*/}
                                {/*<Text h2 bold style={{marginTop: 15}}>7:00 AM</Text>*/}
                                <Text paragraph color="gray">Set the Alarm</Text>
                            </Card>
                            <PreventionCard title="방범 모드 간격"
                            middle style={[{marginLeft: 7}]}>
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
                         
                        <BottomPopup title="Demo Popup" ref={(target) => this.popupRef = target} onTouchOutside={this.onClosePopup} data={popupList}></BottomPopup>
                </SafeAreaView>
               
                </ScrollView>
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