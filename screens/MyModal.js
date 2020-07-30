import React, {Component} from 'react';
import {StyleSheet, Text, View, Modal, TouchableHighlight, } from 'react-native';
import ModalPicker from './ModalPicker';

export default class MyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            
        };
    }

    changeModalVisibility = (bool) => {
        this.setState({ isModalVisible: bool });
    }

    setData = (data) => {
        this.setState({color: data })
    }

    render() {
        return(
            <View style={styles.contentContainer}>
                <Text style={styles.text}>
                    {this.state.color}
                </Text>
                <TouchableHighlight onPress={() => this.changeModalVisibility(true)} underlayColor={'#f1f1f1'} 
                    style={[styles.touchableHighlight, {backgroundColor: this.state.color}]}>
                    <Text style={styles.text}>Open Modal</Text>
                </TouchableHighlight>  
                <Modal transparent={true} animationType="fade" visible={this.state.isModalVisible} 
                    onRequestClose={() => this.changeModalVisibility(false)} style={styles.modalContainer}>
                    <ModalPicker changeModalVisibility={this.changeModalVisibility} setData={this.setData} />
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginVertical: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    touchableHighlight: {
        backgroundColor: 'white', 
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    modalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})