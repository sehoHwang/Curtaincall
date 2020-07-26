import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import Dashboard from '../screens/Dashboard';
import Settings from '../screens/Settings';
import Overview from '../screens/Overview';
import Loading from '../screens/Loading';

export default createStackNavigator({
    Dashboard,
    Settings,
    Overview,
    Loading,
}, {
    initialRouteName: 'Loading'
})