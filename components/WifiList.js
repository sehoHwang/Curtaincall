import React, { Component } from 'react';
import WifiInfo from './WifiInfo';
import  {Block, Block2, Card, Icon, Label, Card2, ModeCard, PreventionCard, Text, DeviceCard} from '../components';

export default class WifiList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
  }

  render() {
    const { data, onRemove } = this.props;
    const list = data.map(
      wifi => (<WifiInfo key={wifi.id} wifi={wifi} onRemove={onRemove}/>)
    );

    return (
        <Block middle>
            {list}
        </Block>
    );
  }
}
