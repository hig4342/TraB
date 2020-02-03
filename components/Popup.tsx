import * as React from 'react'
import usePopup from '@hooks/usePopup'
import { Modal } from 'antd'

const Popup: React.SFC = () => {
  
  const { isVisible, onHidden } = usePopup()

  return (
    <Modal
      className='popup'
      visible={isVisible}
      onOk={onHidden}
      onCancel={onHidden}
      centered
      footer={null}
    >
      <div className='popup-title'><h2>이메일 인증을 부탁드립니다.</h2></div>
      <div className='popup-contents'>
        <p>현재 이메일 인증 미완료 상태입니다.</p>
        <p>이메일 인증을 완료해 주셔야 사이트 이용이 가능합니다.</p>
        <p>이메일 인증을 해주세요.</p>
      </div>
    </Modal>
  )
}

export default Popup