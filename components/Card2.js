import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Block2 from './Block2'
import Text from './Text'
import Icon from './Icon'
import * as theme from '../theme'

export default class Card2 extends Component {
    static defaultProps = {

        shadow: true,
        border: true,
        title: null,
    }

    renderHeader = () => {
        const { title } = this.props;
        if(!title) return null;
        return(
            <Block2 row space="between" style={styles.header}>
                <Text caption>{title}</Text>
                <TouchableOpacity>
                    <Icon option />
                </TouchableOpacity>
            </Block2>
        )
    }

  render() {
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
    
    
  },
  header: {
    paddingBottom: 24,
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