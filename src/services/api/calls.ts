import { BookVerseParams } from 'models/Auth'
import Service from './Service'

const BASE_URL = 'https://bible-api.com'

const getBookVerse = ({ name, chapter }: BookVerseParams) => {
  const task = new Service(
    `${BASE_URL}/${name}%20${chapter}?verse_numbers=true`,
  )

  return task.get().then(data => {
    return data
  })
}

export default {
  getBookVerse,
}
