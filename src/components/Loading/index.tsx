import colors from 'constants/colors'
import React from 'react'
import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native'
import Spinner from 'react-native-spinkit'

enum Animation {
  NONE = 'none',
  SLIDE = 'slide',
  FADE = 'fade',
}

enum Size {
  SMALL = 'small',
  LARGE = 'large',
}

interface LoadingProps {
  color?: string
  animation?: Animation
  overlayColor?: string
  size?: Size
  textContent?: string
  textStyle?: object
  visible: boolean
  indicatorStyle?: {}
  customIndicator?: React.ReactNode
  children?: React.ReactNode
  spinnerKey?: string
}

const Loading = ({
  color = colors.white,
  animation = Animation.NONE,
  overlayColor = 'rgba(0, 0, 0, 0.6)',
  size = Size.LARGE,
  textContent = '',
  textStyle = {},
  visible = false,
  indicatorStyle = {},
  customIndicator = <Spinner size={60} type={'ThreeBounce'} color={color} />,
  children = null,
  spinnerKey = '',
}: LoadingProps) => {
  const renderDefaultContent = () => {
    return (
      <View style={styles.background}>
        {customIndicator ? (
          customIndicator
        ) : (
          <ActivityIndicator
            color={color}
            size={size}
            style={[styles.activityIndicator, { ...indicatorStyle }]}
          />
        )}
        <View style={[styles.textContainer, { ...indicatorStyle }]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    )
  }

  const renderSpinner = () => {
    if (!visible) return null

    const spinner = (
      <View
        style={[styles.container, { backgroundColor: overlayColor }]}
        key={spinnerKey ? spinnerKey : `spinner_${Date.now()}`}>
        {children ? children : renderDefaultContent()}
      </View>
    )

    return (
      <Modal
        animationType={animation}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={visible}>
        {spinner}
      </Modal>
    )
  }

  return renderSpinner()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
  activityIndicator: {
    flex: 1,
  },
})

export default Loading
