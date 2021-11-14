import { ChosenBook } from "./Book";

export type RootStackParamList = {
  DashboardTab: undefined
  SearchBookScreen: undefined
  VerseDetailScreen: { chosenBook: ChosenBook }
}