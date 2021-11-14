import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { navigationRef } from 'Services/navigation'
import RootNavigator from './RootNavigator'

const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <RootNavigator />
  </NavigationContainer>
)

export default AppNavigator
