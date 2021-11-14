import React from 'react'
import renderer from 'react-test-renderer'

import ModalBottom from '../index'

jest.mock('react-native-modal')

describe('BottomModal', () => {
  describe('snapshot render', () => {
    test('with initial props', () => {
      const tree = renderer.create(<ModalBottom visible={false} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
    test('with visible props is true', () => {
      const tree = renderer
        .create(<ModalBottom visible={true}/>)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
