import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import Dashboard from '../screens/Dashboard';
import Settings from '../screens/Settings';
import Overview from '../screens/Overview';
import Loading from '../screens/Loading';
import MyModal from '../screens/MyModal';
import ModalPicker from '../screens/ModalPicker';
import AddDevice from '../screens/AddDevice';
import Location from '../screens/Location';
import WifiConnection from '../screens/WifiConnection';
import Manual from '../screens/Manual';

export default createStackNavigator({
    Dashboard,
    Settings,
    Overview,
    Loading,
    MyModal,
    ModalPicker,
    AddDevice,
    Location,
    WifiConnection,
    Manual,
}, {
    initialRouteName: 'Loading'
})