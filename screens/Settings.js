import React, { Component } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Block, Text } from '../components'
import * as theme from '../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Settings extends Component{
    static navigationOptions = {
        title: null,
        headerLeft: ({onPress}) => (
            <Block>
                <TouchableWithoutFeedback onPress={() => onPress()}>
                    <FontAwesome size={20} color={'royalblue'} name='arrow-left' />
                </TouchableWithoutFeedback>
            </Block>
        ),
        headerLeftContainerStyle: {
            paddingLeft: theme.sizes.base * 2
        },
        headerStyle: {
            backgroundColor: '#fff',
            elevation: 0
        }
    };

    render(){
        const {navigation} = this.props;
        const name = navigation.getParam('name');
        return(
            <Block style={styles.setting} flex={1}>
                <Text>{name}</Text>
            </Block>
        )
    }
}

export default Settings;

const styles = StyleSheet.create({
    setting: {
        padding: theme.sizes.base * 2,
        backgroundColor: '#fff',
    }
})