import React, {Component} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class DemoPicker extends Component{
    state={
        date : new Date('2020-07-31T14:38:38'),
        mode : 'date',
        show : false,
    }

    setDate = (event, date) => {
        date=date||this.state.state;
        this.setState({
            show: Platform.OS==='android'?true:false,
            date,
        })
    }

    show= mode => {
        this.setState({
            show:true,
            mode,
        })
    }

    datePicker = () => {
        this.show('date')
    }

    timePicker = () => {
        this.show('time')
    }

    render(){
        const {show, date, mode} = this.state
        return(
            <View>
                <View>
                    <Button onPress={this.datePicker} title="show date picker!">
                       
                    </Button>
                </View>
                <View>
                    <Button onPress={this.timePicker} title="show time picker!">
                       
                    </Button>
                </View>
                {
                    show && <DateTimePicker value={time}
                    mode={mode}
                    is24Hour={true}
                    displaey='default'
                    onChange={this.setDate}
                    >

                    </DateTimePicker>
                }
            </View>
        );
    }
}