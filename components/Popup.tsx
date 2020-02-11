import * as React from 'react'
import usePopup from '@hooks/usePopup'
import { Modal, Button } from 'antd'

const Popup: React.SFC = () => {
  
  const { isVisible, contents, onHidden } = usePopup()

  if( contents === 'signup' ) {
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
        <div className='popup-action'>
          <Button className='ok-button' onClick={onHidden}>확인</Button>
        </div>
      </Modal>
    )
  } else if( contents === 'success' ) {
    return (
      <Modal
        className='popup'
        visible={isVisible}
        onOk={onHidden}
        onCancel={onHidden}
        centered
        footer={null}
      >
        <div className='popup-title'><h2>이메일 인증이 완료되었습니다.</h2></div>
        <div className='popup-action'>
          <Button className='ok-button' onClick={onHidden}>확인</Button>
        </div>
      </Modal>
    )
  } else if( contents === 'register') {
    return (
      <Modal
        className='popup'
        visible={isVisible}
        onOk={onHidden}
        onCancel={onHidden}
        centered
        footer={null}
      >
        <div className='popup-title'><h2>설계자 신청이 완료되었습니다.</h2></div>
        <div className='popup-contents'>
          <p>관리자의 승인을 기다려주세요.</p>
        </div>
        <div className='popup-action'>
          <Button className='ok-button' onClick={onHidden}>확인</Button>
        </div>
      </Modal>
    )
  } else {
    return (
      <Modal
        className='popup'
        visible={isVisible}
        onOk={onHidden}
        onCancel={onHidden}
        centered
        footer={null}
      >
        <div className='popup-title'><h2>계획표가 업로드 되었습니다.</h2></div>
        <div className='popup-contents'>
          <p>관리자의 승인을 기다려주세요.</p>
        </div>
        <div className='popup-action'>
          <Button className='ok-button' onClick={onHidden}>확인</Button>
        </div>
      </Modal>
    )
  }
}

export default Popup