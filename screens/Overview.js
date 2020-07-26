import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import * as theme from '../theme'
import  {Block, Block2, Card, Icon, Label} from '../components'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text} from '../components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const styles = StyleSheet.create({
    overview: {
        flex: 1,
        marginHorizontal: 25,
        backgroundColor: '#f2f6fc',
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


class Overview extends Component{
    static navigationOptions = {
        title: <Text h4 style={{color:'royalblue'}}>LUCETE</Text>,
        headerTitleStyle: {
            paddingLeft: 110,
            color: 'royalblue'
        },
        headerLeft: ({onPress}) => (
            <Block>
                <TouchableWithoutFeedback onPress={() => onPress()}>
                    <FontAwesome size={20} color={'royalblue'} name='arrow-left' />
                </TouchableWithoutFeedback>
            </Block>
        ),
        headerRight: ({onPress}) => (
            <Block>
                <TouchableWithoutFeedback onPress={() => onPress()}>
                    <MaterialCommunityIcons  name='dots-vertical' size={20} color={'royalblue'}/>
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
    }

    renderChart = () => {
        return(
            <Block2 row style={styles.card}>
                <Block2 flex={1.5} middle>
                    <Text h2>86</Text>
                    <Text caption>OPERATING SCORE</Text>
                </Block2>
                <Block2>
                    <Text paragraph color="gray">
                        LUCETE는 기상 api를 이용하여 
                        소비자들의 삶의 질을 향상시켜주는
                        iot를 접목시킨 친환경 커튼 엔진입니다.
                    </Text>
                </Block2>
            </Block2>
        )
    }
    render(){
        return(
            <ScrollView style={{flex:1, backgroundColor: '#f2f6fc'}} showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.overview}>
                    
                        <Card row middle style={[{marginTop: 25,}]}>
                            <Block2 flex={1.2} center middle style={{marginRight: 20}}>
                                <Text h2 light height={43} size={36} spacing={-0.45} style={{marginTop: 17}}>86</Text>
                                <Text caption center style={{paddingHorizontal:16, marginTop: 3}}>OPERATING SCORE</Text>
                            </Block2>
                            <Block2>
                                <Text paragraph color="gray">
                                    LUCETE는 기상 api를 이용하여 
                                    소비자들의 삶의 질을 향상시켜주는
                                    iot를 접목시킨 친환경 커튼 엔진입니다.
                                </Text>
                            </Block2>
                        </Card>

                        <Block2 row style={[{marginTop: 18,}]}>
                            <Card middle style={[{marginRight: 7}]}>
                                <Icon vehicle />
                                <Text h2 style={{marginTop: 17}}>1,428</Text>
                                <Text paragraph color="gray">Vehicles on track</Text>
                            </Card>
                            <Card middle style={[{marginLeft: 7}]}>
                                <Icon distance />
                                <Text h2 style={{marginTop: 17}}>158.3</Text>
                                <Text paragraph color="gray">Distance driven</Text>
                            </Card>
                        </Block2>

                        <Card 
                            title="TODAY'S TRIPS"
                             style={[{marginTop: 18}]}>
                            <Block2 row right>
                                <Block2 row center right>
                                    <Label color="royalblue"/>
                                    <Text paragraph color="gray">Today</Text>
                                </Block2>
                                <Block2 row center right>
                                    <Label color="blue"/>
                                <Text paragraph color="gray">Yesterday</Text>
                                </Block2>
                                
                            </Block2>
                            <Block2>
                                <Text>Chart</Text>
                            </Block2>
                        </Card>

                        <Card 
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
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default Overview;