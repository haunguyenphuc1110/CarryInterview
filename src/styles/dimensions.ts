import { Dimensions, Platform } from 'react-native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const BASE_WIDTH = 414
const BASE_HEIGHT = 736

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

const wRatio = SCREEN_WIDTH / BASE_WIDTH
const hRatio = SCREEN_HEIGHT / BASE_HEIGHT

export const wScale = (size: number, minFactor = 0.8) => {
  const minSize = size * minFactor
  const maxSize = size * (2 - minFactor)
  const scaledSize = wp(((100 * size) / BASE_WIDTH) * wRatio)
  if (scaledSize > maxSize) return maxSize
  return scaledSize > minSize ? scaledSize : minSize
}

export const hScale = (size: number, minFactor = 0.8) => {
  const minSize = size * minFactor
  const maxSize = size * (2 - minFactor)
  const scaledSize = hp(((100 * size) / BASE_HEIGHT) * hRatio)
  if (scaledSize > maxSize) return maxSize
  return scaledSize > minSize ? scaledSize : minSize
}

export const wpScale = wp
export const hpScale = hp

export const SPACING = wScale(20)
export const SPACING_24 = wScale(24)
export const hSPACING = hScale(Platform.OS === 'ios' ? 20 : 18)
