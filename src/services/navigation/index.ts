import * as React from 'react'
import { StackActions, CommonActions } from '@react-navigation/native'

export const navigationRef: any = React.createRef()

export function navigate(name: string, params?: object, options: any = null) {
  navigationRef.current.navigate(name, params, options)
}

const handleScreen = (data: any, params: any) =>
  typeof data === 'string'
    ? { screen: data, params }
    : {
        ...data,
        screen: data.screen,
        params: {
          ...data.params,
          ...params,
        },
      }

// screen should be string or { screen: string, params: object }
export function navigateNestedScreens(screens: any[] = []) {
  if (!screens.length) return
  const { screen, params } = handleScreen(screens[0], {})
  navigationRef.current.navigate(screen, {
    ...params,
    ...screens
      .slice(1, screens.length)
      .reduceRight((result, current) => handleScreen(current, result), {}),
  })
}

export function push(...args: any[]) {
  // @ts-ignore
  navigationRef.current.dispatch(StackActions.push(...args))
}

export function goBack() {
  navigationRef.current.dispatch(CommonActions.goBack())
}

export function popToTop() {
  navigationRef.current.dispatch(StackActions.popToTop())
}

export function resetToHome() {
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Intro' }],
    }),
  )
}

const NavigationService = {
  navigate,
  push,
  goBack,
  popToTop,
  resetToHome,
  navigateNestedScreens,
}

export default NavigationService
