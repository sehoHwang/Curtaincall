import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import * as theme from '../theme';

export default class Typography extends Component {
  render() {
    const {
      center,
      right,
      color,
      size,
      height,
      weight,
      spacing,
      h1,
      h2,
      h3,
      h4,
      welcome,
      paragraph,
      name,
      caption,
      medium,
      bold,
      light,
      italic,
      button,
      style,
      children,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      h4 && styles.h4,
      welcome && styles.welcome,
      name && styles.name,
      button && styles.button,
      center && styles.center,
      right && styles.right,
      color && { color },
      color && color === 'accent' && styles.accent,
      color && color === 'black' && styles.black,
      color && color === 'white' && styles.white,
      color && color === 'gray' && styles.gray,
      color && color === 'gray' && styles.gray,
      color && color === 'gray2' && styles.gray2,
      color && color === 'gray3' && styles.gray3,
      color && color === 'caption' && styles.caption,
      color && color === 'pinkorange' && styles.pinkorange,

      size && { fontSize: size },
      bold && styles.bold,
      light && styles.light,
      caption && styles.caption,
      height && { lineHeight: height },
      weight && { fontWeight: weight },
      spacing && { letterSpacing: spacing },
      paragraph && styles.paragraph,
      paragraph && color === 'gray' && styles.paragraphGray,
      paragraph && color === 'gray2' && styles.paragraphGray2,
      style
    ];

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,
  },
  bold: { fontWeight: 'bold' },
  light: { fontFamily: 'Rubik-Light' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  black: { color: theme.colors.black, },
  white: { color: theme.colors.white, },
  gray: { color: theme.colors.gray, },
  pinkorange: { color: theme.colors.pinkorange, },
  welcome: theme.fonts.welcome,
  name: theme.fonts.name,
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  h4: theme.fonts.h4,
  button: theme.fonts.button,
  caption: theme.fonts.caption,
});