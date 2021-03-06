import React, {Component} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Animated} from 'react-native';
import {Block, Text} from '../components';
import * as theme from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {background} from '../components/images';

const backgrounds = [
    {
      title: "Secured, forever.",
      description:
        "Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
      img: background.welcome
    },
    {
      title: "Encrypted, forever.",
      description:
        "Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
      img: background.encrypted
    },
    {
      title: "Privacy, forever.",
      description:
        "Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
      img: background.privacy
    }
  ];


export default class WifiManual extends Component{

    scrollX = new Animated.Value(0);

    state = {
        slideIndex : 0
    }

    componentDidMount= async(navigation) => {
        this.scrollX.addListener(({value}) => {
            this.setState({slideIndex: Math.floor(value / theme.sizes.width)})
        })
        
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

    renderImages(){
        return(
        <Block style={{flex:1}} >
            
                <Block style={{flex:1}} center key={'img-${index}'} style={{width: theme.sizes.width, marginTop: 40}}>
                <Image source={background.welcome} resizeMode='center' style={{height:"100%", width: 400}}/>
                </Block>
        </Block>
        )
    }

    render(){
        const {navigation} = this.props;
        return(
            <Block style={{flex:1, backgroundColor:'#fff'}}>
                <Block style={{flex:1}} center middle>
                    {this.renderImages()}
                </Block>
                <Block center style={{flex:1, flexDirection:'column-reverse', marginBottom:60}}>
                    <TouchableOpacity style={styles.ButtonStyle} activeOpacity={0.5} onPress={() => navigation.navigate('AddDevice')}>
                        <Text bold style={{color:'#fff', marginHorizontal:20}}>GET STARTED!</Text>
                    </TouchableOpacity>
                    
                    <Text center caption style={{marginTop: 10, marginBottom: 5, marginHorizontal: 30}}>
                        와이파이 재설정을 위해서 LUCETE 기기 연결이 필요합니다.
                        설정 창에서 연결을 완료한 후 진행해주세요!
                    </Text>
                    <Text h4 bold>커튼콜 디바이스 연결 필요</Text>
                </Block>
                
            </Block>

        )
    }
}

const styles = StyleSheet.create({
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
});