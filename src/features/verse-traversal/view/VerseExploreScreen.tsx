import colors from 'constants/colors'
import I18n from 'i18n-js'
import React from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import NavigationService from 'services/navigation'
import { SCREEN_WIDTH, SPACING_24, wScale } from 'styles/dimensions'
import { FontSize } from 'styles/themes'
import { images } from '../assets'

const VerseExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{I18n.t('carry_library')}</Text>
      <Image
        source={images.BOOK_BACKGROUND}
        resizeMode="contain"
        style={styles.image}
      />
      <TouchableOpacity
        onPress={() => NavigationService.navigate('SearchBookScreen')}>
        <Text style={styles.placeholder}>{I18n.t('search_carry_library')}</Text>
      </TouchableOpacity>
      <View style={styles.circleBackground} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: FontSize.heading,
    fontWeight: '700',
    marginTop: SPACING_24 * 2,
    zIndex: 1,
  },
  placeholder: {
    color: colors.lightBlue,
    fontSize: FontSize.large,
    fontWeight: '500',
    marginTop: SPACING_24 * 2,
    zIndex: 1,
  },
  image: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
    marginTop: SPACING_24 * 2,
    zIndex: 1,
  },
  circleBackground: {
    top: -SCREEN_WIDTH / 2,
    position: 'absolute',
    backgroundColor: colors.lightBlue,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH / 2,
  },
})

export default VerseExploreScreen
