import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import Block2 from './Block2'
import Text from './Text'
import Icon from './Icon'
import * as theme from '../theme'

import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class WifiCard extends Component {
    static defaultProps = {

        shadow: true,
        border: true,
        title: null,
    }

    constructor() {
      super()
      this.state = {
        isVisible: false,
        chosenTime: ''
      }
  }

  handlePicker= (time) => {
      this.setState({
          isVisible: false,
          chosenTime: moment(time).format('HH:mm')
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
        {children}
      </Block2>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 1,
    backgroundColor: theme.colors.white,
    borderRadius:1,
    marginBottom: 10,
    height:60,
    justifyContent: 'center',
    
    
  },
  header: {
    paddingBottom: 10,
  },
  border: {
    borderColor: '#ffd6c7',
    borderLeftWidth: 3,
  },
  shadow: {
    shadowColor: '#ebddd8',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {width: -20, height: 10},
    elevation: 1,
  }
});