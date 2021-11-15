import colors from 'constants/colors'
import { ListBook } from 'constants/mocks'
import I18n from 'i18n-js'
import { BookVerseParams } from 'models/Book'
import React, { useCallback, useMemo } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native'
import NavigationService from 'services/navigation'
import { SCREEN_WIDTH, SPACING_24, wScale } from 'styles/dimensions'
import { FontSize } from 'styles/themes'
import { randomAmountIndex } from 'utils/common'
import { images } from '../assets'

const VerseExploreScreen = () => {
  const BookOfDay = useMemo(() => {
    const bookIndexes = randomAmountIndex() as number[]
    return bookIndexes.map((bookIndex: number) => ListBook[bookIndex])
  }, [])

  const onSelectBook = useCallback((book: BookVerseParams) => {
    NavigationService.navigate('VerseDetailScreen', {
      chosenBook: {
        name: book?.name,
        chapter: 1, // Auto is 1
      },
    })
  }, [])

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
      <View style={styles.bookSection}>
        <Text style={styles.label}>{I18n.t('book_of_the_day')}</Text>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingRight: SPACING_24 }}>
          {BookOfDay.map(book => (
            <TouchableOpacity
              key={book?.name}
              onPress={() => onSelectBook(book)}>
              <ImageBackground
                source={images.BOOK_COVER}
                resizeMode="cover"
                style={[styles.bookContainer, styles.shadow]}>
                <Text style={styles.bookName}>{book?.name}</Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
  label: {
    fontSize: FontSize.xLarge,
    fontWeight: '700',
    marginBottom: SPACING_24,
    marginLeft: SPACING_24,
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
  bookSection: {
    marginTop: SPACING_24 * 2,
  },
  bookContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wScale(150),
    height: wScale(200),
    borderRadius: wScale(8),
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginLeft: SPACING_24,
    overflow: 'hidden',
  },
  bookName: {
    fontSize: FontSize.large,
    fontWeight: '700',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

export default VerseExploreScreen
