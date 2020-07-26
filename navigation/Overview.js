import { createStackNavigator } from 'react-navigation';

import Overview from '../screens/Overview';

export default createStackNavigator({
    Overview
},  {
        defaultNavigationOptions: {
            title: 'hi'
        }
    }
})