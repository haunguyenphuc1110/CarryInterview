import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DashboardTab from './DashboardTab'
import SearchBookScreen from 'features/verse-traversal/view/SearchBookScreen'
import I18n from 'i18n-js'
import colors from 'constants/colors'
import VerseDetailScreen from 'features/verse-traversal/view/VerseDetailScreen'

const MainStack = createNativeStackNavigator()

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="DashboardTab"
        component={DashboardTab}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="SearchBookScreen"
        component={SearchBookScreen}
        options={{
          title: I18n.t('search_book'),
          headerStyle: { backgroundColor: colors.lightBlue },
          headerTintColor: colors.white,
        }}
      />
      <MainStack.Screen
        name="VerseDetailScreen"
        component={VerseDetailScreen}
        options={{
          title: I18n.t('verse_detail'),
          headerStyle: { backgroundColor: colors.lightBlue },
          headerTintColor: colors.white,
        }}
      />
    </MainStack.Navigator>
  )
}

export default MainStackScreen
