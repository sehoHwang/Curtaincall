import React, { Component } from 'react'
import {StyleSheet, View, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import { Block, Text } from '../components';
import * as theme from '../theme';
import mocks from '../setting';
import GradientHeader from "react-native-gradient-header";
import GetLocation from 'react-native-get-location';
import AsyncStorage from '@react-native-community/async-storage';


//import { LineChart, Path } from 'react-native-svg-charts'

import Overview from './Overview'

const createLogger = (...msg) => () => {
    console.log(...msg);
  };



class Dashboard extends Component{

    constructor(){
        super();

        this.state ={
          
            firstdeviceID:'',
            firstdeviceName:'',
            firstshow:false,
        
            seconddeviceID:'',
            seconddeviceName:'',
            secondshow:false,
        
            thirddeviceID:'',
            thirddeviceName:'',
            thirdshow:false,
        
            fourthdeviceID:'',
            fourthdeviceName:'',
            fourthshow:false,
        
        
            fifthdeviceID:'',
            fifthdeviceName:'',
            fifthshow:false,
        
        
            sixthdeviceID:'',
            sixthdeviceName:'',
            sixthshow:false,
        

        }

    }

    async componentDidMount(){
        //const {firstDevice, secondDevice, thirdDevice, fourthDevice, fifthDevice, sixthDevice} = this.state;
        
        var i =0;
        const DB = await AsyncStorage.getItem('@lucete:devices');
       
        if(JSON.parse(DB).device!=null){
            for(let singleDevice of JSON.parse(DB).device){
                
                if(i===0){
                    console.log(singleDevice.deviceName)
                    this.setState({
                        firstdeviceID: singleDevice.deviceID,
                        firstdeviceName: singleDevice.deviceName,
                        firstshow: true,
                    })
                }
                else if(i===1){
                    console.log(singleDevice.deviceName)
                    
                    this.setState({
                        seconddeviceID: singleDevice.deviceID,
                        seconddeviceName: singleDevice.deviceName,
                        secondshow: true,
                    })
                    console.log('보여지냐?' + this.state.secondShow)
                }
                else if(i===2){
                    console.log('하하')
                    this.setState({
                        thirddeviceID: singleDevice.deviceID,
                        thirddeviceName: singleDevice.deviceName,
                        thirdshow: true,
                    })
                }
                else if(i===3){
                    this.setState({
                        fourthdeviceID: singleDevice.deviceID,
                        fourthdeviceName: singleDevice.deviceName,
                        fourthshow: true,
                    })
                }
                else if(i===4){
                    this.setState({
                        fifthdeviceID: singleDevice.deviceID,
                        fifthdeviceName: singleDevice.deviceName,
                        fifthshow: true,
                    })
                }
                else if(i===5){
                    this.setState({
                        sixthdeviceID: singleDevice.deviceID,
                        sixthdeviceName: singleDevice.deviceName,
                        sixthshow: true,
                    })
                }

                i++;
            }
        }

    }
    static navigationOptions = {
        headerShown: false,
    }

    render(){
        const {navigation, setting} = this.props;
        const FirstIcon = setting['LUCETE1'].icon;
        const SecondIcon = setting['LUCETE2'].icon;
        return(
            
            <Block style={styles.dashboard}>
                <Block flex={0.5}>
                    <GradientHeader
                            title="LUCETE"
                            subtitle="Have a nice day with Lucete"
                            gradientColors={["#ff7f50", "#E4E5E6"]}
                            start={{x:0, y:0}}
                            end={{x:0, y:1}}
                            imageSource={require('../assets/images/icons/add_device.png')}
                            imageOnPress={() => navigation.navigate('Manual')}
                    />
                </Block>
                

                <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false} style={{paddingHorizontal: theme.sizes.base*2}} >
                    <Block column  space="around">
                        
                        <Block row space="around">
                        {this.state.firstshow ? (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Overview', {id: this.state.firstdeviceID})}>
                                <Block center middle style={styles.button}>
                                    
                                    <FirstIcon size={50} />
                                    <Text button>{this.state.firstdeviceName}</Text>
                                </Block>
                            </TouchableOpacity>
                        ) : null}

                        {this.state.secondshow ? (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Overview', {id: this.state.seconddeviceID})}>
                                <Block center middle style={styles.button}>
                                    <SecondIcon size={50}/>
                                    <Text button>{this.state.seconddeviceName}</Text>
                                </Block>
                            </TouchableOpacity>
                        ) : null}
                        </Block>
                        
                        <Block row space="around">
                        {this.state.thirdshow ? (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Overview', {id: this.state.thirddeviceID})}>
                                <Block center middle style={styles.button}>
                                    <FirstIcon size={50} />
                                    <Text button>{this.state.thirddeviceName}</Text>
                                </Block>
                            </TouchableOpacity>
                        ) : null}

                        {this.state.fourthshow ? (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Overview', {id: this.state.fourthdeviceID})}>
                                <Block center middle style={styles.button}>
                                    <SecondIcon size={50}/>
                                    <Text button>{this.state.fourthdeviceName}</Text>
                                </Block>
                            </TouchableOpacity>
                        ) : null}    
                        </Block>

                        <Block row space="around">
                        {this.state.fifthshow ? (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Overview', {id: this.state.fifthdeviceID})}>
                                <Block center middle style={styles.button}>
                                    <FirstIcon size={50} />
                                    <Text button>{this.state.fifthdeviceName}</Text>
                                </Block>
                            </TouchableOpacity>
                        ) : null}

                        {this.state.sixthshow ? (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Overview', {id: this.state.sixthdeviceID})}>
                                <Block center middle style={styles.button}>
                                    <SecondIcon size={50}/>
                                    <Text button>{this.state.sixthdeviceName}</Text>
                                </Block>
                            </TouchableOpacity>
                        ) : null}
                        </Block>
                    
                        {/*
                        <Block row space="around">
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Settings', {name: 'LUCETE3'})}>
                                <Block center middle style={styles.button}>
                                    <ThirdIcon size={50}/>
                                    <Text button>{setting['LUCETE3'].name}</Text>
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Settings', {name: 'LUCETE4'})}>
                                <Block center middle style={styles.button}>
                                    <FourthIcon size={50}/>
                                    <Text button>{this.state['lucete3'].name}</Text>
                                </Block>
                            </TouchableOpacity>
                        </Block>
                    
                    
                        <Block row space="around">
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('RctSockets', {name: 'LUCETE5'})}>
                                <Block center middle style={styles.button}>
                                    <FifthIcon size={50}/>
                                    <Text button>{setting['LUCETE5'].name}</Text>
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Location', {name: 'LUCETE6'})}>
                                <Block center middle style={styles.button}>
                                    <SixthIcon size={50}/>
                                    <Text button>{setting['LUCETE6'].name}</Text>
                                </Block>
                            </TouchableOpacity>
                        </Block>*/}
                        
                    </Block>
                    
                </ScrollView>
               
            </Block>
           
        )
    }
}

export default Dashboard;

Dashboard.defaultProps = {
    setting: mocks,
}

const styles = StyleSheet.create({
    dashboard: {
        //paddingHorizontal: theme.sizes.base*2,
        flex: 1,
        backgroundColor: 'white',
        //paddingTop: 30,
    },
    button: {
        backgroundColor: theme.colors.button,
        width: 135,
        height: 135,
        borderRadius: 151/2,
        marginBottom: 15
    },
    buttons: {
        flex: 1,
        marginBottom: -theme.sizes.base * 6,
      },
    oval: {
        height: 200,
        borderBottomStartRadius: 80,
        borderBottomEndRadius: 80,
        
        backgroundColor: 'royalblue',
    },
})