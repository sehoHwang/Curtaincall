import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import Block2 from './Block2'
import Text from './Text'
import Icon from './Icon'
import * as theme from '../theme'
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TimePicker from 'react-native-24h-timepicker';
import moment from 'moment';

let currentDevice;
let currentDeviceNumber;
let Info;
let deviceID;

export default class PreventionCard extends Component {
    static defaultProps = {

        shadow: true,
        border: true,
        title: null,
    }

    constructor() {
      super()
      this.state = {
        time: ''
      }
  }

  state = {
    selectedHours: 0,
    selectedMinutes: 0,
    selectedItem: 0,
  }

  componentDidMount = async() =>{
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
      time: currentDevice.autoGap,
    })
  }

  onCancel() {
      this.TimePicker.close();
  }

  onConfirm= async(hour, minute) => {
    this.setState({ time: `${hour}:${minute}` });
    Info.device[currentDeviceNumber].autoGap = this.state.time;
    await AsyncStorage.setItem('@lucete:devices', JSON.stringify(Info));
    Info = JSON.parse(await AsyncStorage.getItem('@lucete:devices'));
    currentDevice = Info.device[currentDeviceNumber];
    console.log('db 시간 간격은' + currentDevice.autoGap+'입니당.'+'알람 시간이 ' + this.state.time+'으로 설정되었습니다.')
    this.TimePicker.close();
  }


  hidePicker = () => {
      this.setState({
          isVisible: false,
      })
  }

  showPicker = () => {
      this.setState({
          isVisible: true
      })
  }


    renderHeader = () => {
        const { selectedHours, selectedMinutes } = this.state;
      //const {date, mode, show} = this.state
        const { title, } = this.props;
        if(!title) return null;
        return(
            <Block2 row space="between" style={styles.header}>
                <Text caption>{title}</Text>
                <TouchableOpacity onPress={() => this.TimePicker.open()}>
                    <Icon option />
                </TouchableOpacity>
                <TimePicker
                    ref={ref => {
                        this.TimePicker = ref;
                      }}
                      onCancel={() => this.onCancel()}
                      onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                      maxHour={12}
                      maxMinute={30}
                      minMinute={0}
                      minuteInterval={30}
                />
                
                
            </Block2>
        )
    }

  render() {
    deviceID = this.props.deviceID;
    const {isDatePickerVisible} = this.state;
    const { shadow, border, style, children, ...props } = this.props;
    const cardStyles = [
      styles.card,
      shadow && styles.shadow,
      border && styles.border,
      
      style,
    ];

    return (
      <Block2 style={cardStyles} {...props}>
        {this.renderHeader()}
        <Text middle center h2 bold2 style={{marginBottom:15}}>{this.state.time}</Text>
        {children}
      </Block2>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 25,
    backgroundColor: theme.colors.white,
    borderRadius:10,
  },
  header: {
    paddingBottom: 10,
  },
  border: {
    borderColor: theme.colors.shadow,
    borderWidth: 1,
  },
  shadow: {
    shadowColor: theme.colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {width: -20, height: 10},
    elevation: 1,
  }
});