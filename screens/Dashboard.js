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
            'lucete1': {
                name: 'hi',
            },
            'lucete2': {
                name: '',
            },
            'lucete3': {
                name: '',
            },
            'lucete4': {
                name: '',
            },
            'lucete5': {
                name: '',
            },
            'lucete6' : {
                name: '',
            },
        }

    }

    
    static navigationOptions = {
        headerShown: false,
    }

    render(){
        const {navigation, setting} = this.props;
        const FirstIcon = setting['LUCETE1'].icon;
        const SecondIcon = setting['LUCETE2'].icon;
        const ThirdIcon = setting['LUCETE3'].icon;
        const FourthIcon = setting['LUCETE4'].icon;
        const FifthIcon = setting['LUCETE5'].icon;
        const SixthIcon = setting['LUCETE6'].icon;

        
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
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Overview', {name: 'LUCETE1'})}>
                                <Block center middle style={styles.button}>
                                    <FirstIcon size={50} />
                                    <Text button>{setting['LUCETE1'].name}</Text>
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Settings', {name: 'LUCETE2'})}>
                                <Block center middle style={styles.button}>
                                    <SecondIcon size={50}/>
                                    <Text button>{setting['LUCETE2'].name}</Text>
                                </Block>
                            </TouchableOpacity>
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