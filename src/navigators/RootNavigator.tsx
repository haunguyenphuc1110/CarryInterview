import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainStackScreen from './MainNavigator'

const RootStack = createNativeStackNavigator()

const RootNavigator = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="Main"
      component={MainStackScreen}
      options={{ headerShown: false }}
    />
  </RootStack.Navigator>
)

export default RootNavigator
