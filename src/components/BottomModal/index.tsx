import { StyleSheet } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import React, { FC } from 'react'

interface BottomModalProps extends ModalProps {
  onClose?: () => void
}

const BottomModal: FC<BottomModalProps> = ({
  isVisible,
  onClose,
  ...props
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={styles.container}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})

export default BottomModal
