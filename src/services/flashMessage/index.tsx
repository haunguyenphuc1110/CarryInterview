import colors from 'constants/colors'
import { showMessage, MessageType } from 'react-native-flash-message'

interface Props {
  message: string
  type?: MessageType | undefined
  backgroundColor?: string | undefined
  titleStyle?: object
}

const show = ({
  message,
  type = 'default',
  backgroundColor = colors.teal,
  titleStyle = { textAlign: 'center', fontWeight: '500', fontSize: 14 },
}: Props) => {
  showMessage({
    message,
    type,
    backgroundColor,
    titleStyle,
  })
}

export { show }
