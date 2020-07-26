import React, { Component } from 'react'
import {StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Block, Text } from '../components';
import * as theme from '../theme';
import mocks from '../setting';
//import { LineChart, Path } from 'react-native-svg-charts'

import Overview from './Overview'

class Dashboard extends Component{
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
                <Block style={styles.oval}>
                    <Block column>
                        <Text welcome>Welcome</Text>
                        <Text name>LUCETE</Text>
                    </Block>

                    <Block row style={{paddingVertical: 10}}>
                        <Block flex={1.5} row style={{alignItems: 'flex-end'}}>
                            <Text h1>34</Text>
                            <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>c</Text>
                        </Block>
                        <Block  flex={1} column>
                            <Text caption>Humidity</Text>
                            
                        </Block>
                    </Block>
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
                                    <Text button>{setting['LUCETE4'].name}</Text>
                                </Block>
                            </TouchableOpacity>
                        </Block>
                    
                    
                        <Block row space="around">
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Settings', {name: 'LUCETE5'})}>
                                <Block center middle style={styles.button}>
                                    <FifthIcon size={50}/>
                                    <Text button>{setting['LUCETE5'].name}</Text>
                                </Block>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Settings', {name: 'LUCETE6'})}>
                                <Block center middle style={styles.button}>
                                    <SixthIcon size={50}/>
                                    <Text button>{setting['LUCETE6'].name}</Text>
                                </Block>
                            </TouchableOpacity>
                        </Block>
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