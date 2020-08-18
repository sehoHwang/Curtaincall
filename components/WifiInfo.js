import React, { Component } from 'react';
import  {Block, Block2, Card, Icon, Label, Card2, ModeCard, PreventionCard, Text, WifiCard} from '../components'

export default class WifiInfo extends Component {
  static defaultProps = {
    wifi: {
      wifiname: '이름',
      id: 0
    }
  }
  
  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const {
      wifiname, id
    } = this.props.wifi;
    
    return (
        <WifiCard>
                <Text style={{marginLeft: 10, fontSize: 20, fontWeight: '600'}}>
                    {wifiname}
                </Text> 
        </WifiCard>
    );
  }
}
