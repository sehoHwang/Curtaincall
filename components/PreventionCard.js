import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import Block2 from './Block2'
import Text from './Text'
import Icon from './Icon'
import * as theme from '../theme'

import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TimePicker from 'react-native-24h-timepicker';
import moment from 'moment';



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

  onCancel() {
      this.TimePicker.close();
  }

  onConfirm(hour, minute){
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  handlePicker= (time) => {
      this.setState({
          isVisible: false,
          chosenHour: moment(time).format('HH')
      })
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