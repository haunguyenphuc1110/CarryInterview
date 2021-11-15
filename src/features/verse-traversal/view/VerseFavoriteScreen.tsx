import colors from 'constants/colors'
import { Book } from 'models/Book'
import React, { useCallback } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import NavigationService from 'services/navigation'
import Selector from 'store/Selector'
import { SCREEN_WIDTH, SPACING, SPACING_24, wScale } from 'styles/dimensions'
import { FontSize } from 'styles/themes'
import { images } from '../assets'

const VerseFavoriteScreen = () => {
  const { bookHighlight } = useSelector(Selector.bookVerse)

  const onSelectVerse = useCallback((book: Book) => {
    NavigationService.navigate('VerseDetailScreen', {
      chosenBook: {
        name: book.book_name,
        chapter: book.chapter,
      },
    })
  }, [])

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={styles.scroll}
      contentContainerStyle={{ paddingBottom: SPACING_24 }}>
      {bookHighlight.map(book => (
        <TouchableOpacity
          key={book.text + book.verse}
          style={styles.bookContainer}
          onPress={() => onSelectVerse(book)}>
          <Image
            source={images.BOOK_COVER}
            resizeMode="stretch"
            style={styles.cover}
          />
          <View style={{ marginLeft: SPACING / 2 }}>
            <Text style={styles.name}>
              {book.book_name}{' '}
              <Text
                style={
                  styles.description
                }>{`(${book.chapter} - ${book.verse})`}</Text>
            </Text>
            <Text style={styles.verse} numberOfLines={2}>
              {book.text}
            </Text>
          </View>

          <Image
            source={images.BOOKMARK}
            resizeMode="cover"
            style={styles.bookmark}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  name: {
    fontSize: FontSize.regular,
    fontWeight: '700',
    marginTop: SPACING_24 / 2,
  },
  verse: {
    maxWidth: SCREEN_WIDTH / 2,
    marginTop: SPACING_24 / 4,
  },
  description: {
    fontSize: FontSize.small,
    fontWeight: '500',
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: SPACING_24,
    borderRadius: wScale(8),
    borderWidth: 1,
    borderColor: colors.borderColor,
    overflow: 'hidden',
  },
  cover: {
    width: wScale(100),
    height: wScale(75),
  },
  bookmark: {
    width: wScale(32),
    height: wScale(32),
  },
})

export default VerseFavoriteScreen
