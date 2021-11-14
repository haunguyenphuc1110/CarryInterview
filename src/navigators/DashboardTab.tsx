import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import I18n from 'I18n/I18n'

import Icon from 'components/Icon'

import colors from 'Constants/colors'
import VerseExploreScreen from 'features/verse-traversal/view/VerseExploreScreen'
import VerseFavoriteScreen from 'features/verse-traversal/view/VerseFavoriteScreen'

const mappingIcon = {
  explore: 'home',
  favorite: 'heart',
} as any

const Tab = createBottomTabNavigator()

const DashboardTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => (
          <Icon name={mappingIcon[route.name]} size={18} color={color} />
        ),
        tabBarLabel: ({ color, focused }) => (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: focused ? '700' : '500',
              color,
            }}>
            {I18n.t(route.name)}
          </Text>
        ),
        tabBarActiveTintColor: colors.lightBlue,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        key="explore"
        name="explore"
        component={VerseExploreScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        key="favorite"
        name="favorite"
        component={VerseFavoriteScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default DashboardTab
