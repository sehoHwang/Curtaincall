import React from 'react';
import {StyleSheet, Text, View} from 'react-native'
import { createAppContainer} from 'react-navigation'
import SmartHome from './navigation/SmartHome'
import Dashboard from './screens/Dashboard';

export default createAppContainer(SmartHome);
