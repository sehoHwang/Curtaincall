import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, SafeAreaView, Image, TouchableOpacity, Modal } from 'react-native';
import * as theme from '../theme'
import  {Block, Block2, Card, Icon, Label, Card2} from '../components'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text} from '../components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated from 'react-native-reanimated';
import BottomPopup from './BottomPopup';
import LinearGradient from 'react-native-linear-gradient';


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

    popupRef = React.createRef();

    onShowPopup = () => {
        this.popupRef.show()
    }
    
    onClosePopup = () => {
        this.popupRef.close()
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
        headerRight: (
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
            <ScrollView style={{flex:1, backgroundColor: '#faf7f7'}} showsVerticalScrollIndicator={false}>
                <Card2 col middle style={[{marginTop: 0, borderWidth: 0, shadow:{shadowColor:'#f79e7c', elevation:0}, backgroundColor: '#f7b297'}]}>
                   
                            <Block2 flex={2} style={{marginRight: 20}}>
                                <Text h3 bold style={{color: '#fff'}}>우선순위 모드</Text>
                                <Text paragraph color = "pinkorange" style={{marginTop: 3,}}>Frequently used</Text>
                            </Block2>
                            <Block2 row flex={2} style={{marginTop: 10, }}>
                                <Block2 flex={1} style={{padding: 25, backgroundColor: '#f7b9a1', marginRight: 10, height:70, borderRadius: 10}}>
                                    
                                </Block2>
                                <Block2 flex={1} style={{padding: 25, backgroundColor: '#f7b9a1', marginLeft:10, borderRadius: 10}}>

                                </Block2>
                            </Block2>
                       
                    </Card2>
                <SafeAreaView style={styles.overview}>
                    
                        

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
                            title="모드 선택"
                             style={[{marginTop: 18}]}>
                           <Block2 row>
                                <Block2 style={{padding:20}}>
                                    <Text>에너지 효율 모드</Text>
                                </Block2>
                                <Block2  style={{padding:20}}>
                                    <Text>조경 모드</Text>
                                </Block2>
                            </Block2>
                            <Block2 row style={{marginTop: 18}}>
                                <Block2  style={{padding:20}}>
                                    <Text>방범 모드</Text>
                                </Block2>
                                <Block2  style={{padding:20}}>
                                    <Text>알람 모드</Text>
                                </Block2>
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
                <BottomPopup title="Demo Popup" ref={(target) => this.popupRef = target} onTouchOutside={this.onClosePopup} data={popupList}></BottomPopup>
            </ScrollView>
            
        )
    }
}

export default Overview;