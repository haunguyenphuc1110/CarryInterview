import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import Loading from 'components/Loading'
import colors from 'constants/colors'
import { Book } from 'models/Book'
import { RootStackParamList } from 'models/Navigation'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Selector from 'store/Selector'
import { SPACING_24, wScale } from 'styles/dimensions'
import { FontSize } from 'styles/themes'
import { getBookVerse } from '../action/verseAction'
import { saveHighlightVerse } from '../action/verseReducer'

const VerseDetailScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'VerseDetailScreen'>) => {
  const dispatch = useDispatch()
  const { chosenBook } = route.params

  const { book, bookHighlight, isLoading } = useSelector(Selector.bookVerse)

  console.log('bookHighlight', bookHighlight)

  useEffect(() => {
    if (chosenBook) {
      navigation.setOptions({ title: chosenBook.name })
      dispatch(getBookVerse(chosenBook))
    }
  }, [chosenBook])

  const onHighlight = useCallback(
    (verse: Book) => {
      const foundVerse =
        (bookHighlight || []).findIndex(
          book => book.verse === verse.verse && book.book_id === verse.book_id,
        ) > -1

      console.log('foundVerse', foundVerse)

      if (foundVerse) {
        const filteredVerse = (bookHighlight || []).filter(
          book => book.verse !== verse.verse,
        )
        dispatch(saveHighlightVerse([...filteredVerse]))
        return
      }
      dispatch(saveHighlightVerse([...(bookHighlight || []), verse]))
    },
    [bookHighlight],
  )

  if (isLoading) return <Loading visible={isLoading} color={colors.lightBlue} />

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {book?.verses.map((verse: Book) => {
        const isHighlight = !!(bookHighlight || []).find(
          (book: Book) => book.text === verse?.text,
        )

        return (
          <TouchableWithoutFeedback
            key={verse.verse}
            onPress={() => onHighlight(verse)}>
            <View style={isHighlight && { backgroundColor: colors.yellow }}>
              <Text style={styles.content}>{verse?.text}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: SPACING_24,
  },
  contentContainer: {
    paddingBottom: SPACING_24 * 2,
  },
  content: {
    marginBottom: wScale(2),
    fontSize: FontSize.massive,
    textAlign: 'justify',
    lineHeight: SPACING_24,
  },
})

export default VerseDetailScreen
