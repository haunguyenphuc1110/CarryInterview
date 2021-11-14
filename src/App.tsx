import React from 'react'
import { StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FlashMessage from 'react-native-flash-message'

import AppNavigator from 'Navigators'
import colors from 'constants/colors'

const App = () => {
  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: colors.lightBlue }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : (null as any)}
        style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={colors.lightBlue}
          barStyle="light-content"
        />
        <AppNavigator />
        <FlashMessage position="bottom" duration={3000} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default App
