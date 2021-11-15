import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import Loading from 'components/Loading'
import colors from 'constants/colors'
import { Book } from 'models/Book'
import { RootStackParamList } from 'models/Navigation'
import React, { useCallback, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Selector from 'store/Selector'
import { SPACING_24 } from 'styles/dimensions'
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

  useEffect(() => {
    if (chosenBook) {
      navigation.setOptions({ title: chosenBook.name })
      dispatch(getBookVerse(chosenBook))
    }
  }, [chosenBook])

  const onRenderHighlightString = (value: string) =>
    value
      .trim()
      .split(' ')
      .map((word, index) => (
        <Text
          key={word + index}
          style={[styles.highlight, index === 0 && styles.verse]}>
          {word}{' '}
        </Text>
      ))

  const onHighlight = useCallback(
    (verse: Book) => {
      const foundVerse =
        (bookHighlight || []).findIndex(
          book => book.verse === verse.verse && book.book_id === verse.book_id,
        ) > -1

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
          (book: Book) =>
            book.text === verse?.text && book.book_id === verse.book_id,
        )

        return (
          <View key={verse.text}>
            {isHighlight ? (
              <Text
                key={verse.text}
                style={styles.content}
                onPress={() => onHighlight(verse)}
                suppressHighlighting={true}>
                {onRenderHighlightString(`${verse.verse} ${verse.text}`)}
              </Text>
            ) : (
              <Text
                key={verse.text}
                style={styles.content}
                onPress={() => onHighlight(verse)}
                suppressHighlighting={true}>
                <Text style={styles.verse}>{`${verse.verse}`}</Text>{' '}
                {verse.text.trim()}
              </Text>
            )}
          </View>
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
    fontSize: FontSize.massive,
    textAlign: 'justify',
    lineHeight: SPACING_24,
    marginBottom: SPACING_24 / 2,
  },
  verse: {
    fontSize: FontSize.tiny,
    color: colors.gray,
  },
  highlight: {
    backgroundColor: colors.yellow,
  },
})

export default VerseDetailScreen
