import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DashboardTab from './DashboardTab'

const MainStack = createNativeStackNavigator()

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <>
        <MainStack.Screen
          name="DashboardTab"
          component={DashboardTab}
          options={{
            headerShown: false,
          }}
        />
      </>
    </MainStack.Navigator>
  )
}

export default MainStackScreen
