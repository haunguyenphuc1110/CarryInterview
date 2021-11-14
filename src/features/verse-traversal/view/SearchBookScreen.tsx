import BottomModal from 'components/BottomModal'
import Icon from 'components/Icon'
import colors from 'constants/colors'
import { ListBook } from 'constants/mocks'
import I18n from 'i18n-js'
import { BookVerseParams } from 'models/Book'
import React, { useCallback, useMemo, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import NavigationService from 'services/navigation'
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SPACING,
  SPACING_24,
} from 'styles/dimensions'
import { FontSize } from 'styles/themes'
import { debounce } from 'utils/common'
import { images } from '../assets'

const SearchBookScreen = () => {
  const [keyword, setKeyword] = useState('')
  const [selectedBook, setSelectedBook] = useState<BookVerseParams | null>()
  const [selectedChapter, setSelectedChapter] = useState<number>()
  const [isVisible, setIsVisible] = useState(false)

  const filteredBooks = useMemo(
    () =>
      ListBook.filter(book =>
        book.name.toLowerCase().includes(keyword.toLowerCase()),
      ),
    [keyword],
  )

  const onCloseModal = useCallback(() => {
    setIsVisible(false)
  }, [])

  const onChangeText = debounce((text: string) => setKeyword(text), 300)

  const onSelectBook = useCallback((book: BookVerseParams) => {
    setSelectedBook(book)
    setIsVisible(true)
  }, [])

  const onChooseChapter = useCallback(
    (chapter: number) => {
      onCloseModal()
      setSelectedChapter(chapter)
      NavigationService.navigate('VerseDetailScreen', {
        chosenBook: {
          name: selectedBook?.name,
          chapter,
        },
      })
    },
    [selectedBook?.name],
  )

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: SPACING_24 }}>
        <View style={styles.searchBar}>
          <Icon name={'search'} />
          <TextInput
            autoCapitalize={'none'}
            onChangeText={onChangeText}
            placeholder={I18n.t('search_book')}
            placeholderTextColor={colors.gray}
            style={styles.searchInput}
          />
        </View>
        {filteredBooks.length === 0 && (
          <>
            <Image
              source={images.BOOK_NOT_FOUND}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.emptyLabel}>{I18n.t('book_not_found')}</Text>
          </>
        )}
        {filteredBooks.map(book => (
          <TouchableOpacity
            key={book.name}
            style={styles.nameContainer}
            onPress={() => onSelectBook(book)}>
            <Icon name={'book'} />
            <Text
              style={[
                styles.name,
                selectedBook?.name === book.name && {
                  fontWeight: 'bold',
                  fontSize: FontSize.large,
                },
              ]}>
              {book.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomModal
        isVisible={isVisible}
        onClose={onCloseModal}
        onBackdropPress={onCloseModal}
        onBackButtonPress={onCloseModal}>
        <View style={styles.modalContentContainer}>
          {[...Array(selectedBook?.chapters || 0).keys()].map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => onChooseChapter(item + 1)}
              style={styles.modalContent}>
              <Text
                style={
                  selectedChapter === item + 1 && {
                    fontWeight: 'bold',
                    fontSize: FontSize.large,
                  }
                }>
                {item + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomModal>
    </>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchBar: {
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'rgba(12, 54, 90, 0.12)',
    borderRadius: 8,
    borderBottomWidth: 1,
    padding: SPACING_24,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: SPACING_24,
    fontSize: FontSize.large,
    color: colors.black,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING_24,
    marginVertical: SPACING_24 / 2,
    paddingVertical: SPACING_24 / 2,
    width: '100%',
  },
  name: {
    marginLeft: SPACING / 2,
  },
  image: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH / 2,
    marginTop: SPACING_24 * 2,
    marginBottom: SPACING_24 / 2,
    alignSelf: 'center',
  },
  emptyLabel: {
    alignSelf: 'center',
    fontSize: FontSize.large,
    fontWeight: '500',
  },
  modalContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: colors.white,
    paddingBottom: SPACING_24,
    maxHeight: SCREEN_HEIGHT * 0.75,
    borderTopLeftRadius: SPACING_24,
    borderTopRightRadius: SPACING_24,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH / 3,
    height: SPACING_24 * 2,
  },
})

export default SearchBookScreen
