const colors = {
    accent: '#FA754C',
    black: '#292934',
    white: '#FFFFFF',
    gray: '#A7A7A7',
    gray2: '#ECEDEF',
    button: '#f2f6fc',
    shadow: 'rgba(46,91,255,0.08)',
    input: 'rgba(224, 231, 255, 0.20)', // '#E0E7FF' 20%
    border: '#D6DDF6',
    card: 'rgba(46,91,255,0.08)',
    shadow: 'rgba(46,91,255,0.07)',
    gray3: '#EEF3F5',
    purple: 'purple',
    royalblue: 'royalblue',
    caption: '#B0BAC9',
  };
  
  const sizes = {
    base: 14,
    font: 14,
    welcome: 18,
    name: 21,
    h1: 140,
    button: 16,
    paragraph: 15,
    h2: 34,
    h3: 28,
    h4: 15,
  };
  
  const fonts = {
    welcome: {
      fontSize: sizes.welcome,
      color: colors.gray,
      letterSpacing: -0.6,
      lineHeight: sizes.welcome + 4,
    },
    name: {
      fontSize: sizes.name,
      fontWeight: '600',
      color: colors.black,
      letterSpacing: -1.1,
      lineHeight: sizes.name + 4,
    },
    caption: {
      fontSize: sizes.welcome,
      color: colors.gray,
      letterSpacing: -0.6,
      lineHeight: sizes.welcome + 4,
    },
    h1: {
      fontSize: sizes.h1,
      color: colors.black,
      letterSpacing: -10,
      lineHeight: sizes.h1,
    },
    button: {
      fontSize: sizes.button,
      color: colors.black,
      fontWeight: '600',
      letterSpacing: -0.4,
      lineHeight: sizes.button + 4,
    },
    paragraph: {
      fontFamily: 'Rubik-Regular',
      fontSize: sizes.paragraph,
      color: colors.black,
      letterSpacing: 0,
      lineHeight: 22,
    },
    paragraphGray: {
      fontFamily: 'Rubik-Regular',
      fontSize: sizes.paragraph,
      color: colors.gray,
      letterSpacing: 0,
      lineHeight: 22,
    },
    paragraphGray2: {
      fontFamily: 'Rubik-Regular',
      fontSize: sizes.paragraph,
      color: colors.gray2,
      letterSpacing: 0,
      lineHeight: 22,
    },
    h2: {
      fontFamily: 'Rubik-Light',
      fontSize: sizes.h2,
      color: colors.black,
      letterSpacing: 0,
      lineHeight: 32,
    },
    h3: {
      fontFamily: 'Rubik-Light',
      fontSize: sizes.h3,
      color: colors.black,
      letterSpacing: 0,
      lineHeight: 32,
    },
    h4: {
      fontFamily: 'Rubik-Medium',
      fontSize: sizes.h4,
      color: colors.black,
      letterSpacing: 0,
      lineHeight: 18,
    },
    
  };
  
  export {
    colors,
    sizes,
    fonts,
  };