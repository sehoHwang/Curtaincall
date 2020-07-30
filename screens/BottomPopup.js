import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, FlatList} from 'react-native';
import React, {Component} from 'react';
const deviceHeight = Dimensions.get('window').height;

export class BottomPopup extends Component{
    constructor(props){
        super(props)
        this.state={
            show: false,
        }
    }

    show = () => {
        this.setState({show: true})
    }

    close = () => {
        this.setState({show : false})
    }

    renderOutsideTouchable = () => {
        const view = <View style={{flex: 1, width: '100%'}} />
        if(!onTouch) return view

        return(
            <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width:'100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return(
            <View>
                <Text style={{color:'182E44', fontSize:20, fontWeight:'500', margin:15}}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent= () => {
        const {data} = this.props
        return(
            <View>
                <FlatList style={{marginBottom: 20}}
                    showVerticalScrollIndicator={false}
                    data={data}
                    renderItem={this.renderItem}
                    extraData={data}
                    keyExtractor={(item,index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeperator}
                    contentContainerStyle={{paddingBottom:40}}></FlatList>
            </View>
        )
    }

    renderItem = ({Item}) => {
        return(
            <View>
                <Text>{Item.name}</Text>
            </View>
        )
    }

    renderSeperator = () => {
        <View style={{opacity: 0.1, backgroundColor: '182E44', height:1}}>
            
        </View>
    }

    render(){
        let {show} = this.state
        const { onTouchOutside, title } = this.props
        return(
            <Modal
                animationType= {'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}>
                <View style={{flex:1, backgroundColor: '#fff', justifyContent: 'center'}}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{ backgroundColor: '#fff',
                        width:'100%', 
                        borderTopRightRadius: 10, 
                        borderTopLeftRadius: 10, 
                        paddingHorizontal: 10, 
                        maxHeight: deviceHeight * 0.5}}>
                        {this.renderTitle()}
                        {this.renderContent()}
                     </View>
                </View>
            </Modal>
        );
    }
}