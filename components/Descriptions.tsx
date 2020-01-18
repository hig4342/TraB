import * as React from 'react'
import { Row, Col } from 'antd'
import '@assets/Descriptions.less'

const Descriptions: React.SFC = ()=> {
  return (
    <div className='descriptions'>
      <div className='description-item'>
        <h1 className='small-title'>P가 붙은 계획표를 혹시 보셨나요?</h1>
        <Row justify="center">
          <Col xs={24} md={8}>
            <div className='description-image'>
              <img src='/premium.png'/>
            </div>
          </Col>
          <Col xs={24} md={14}>
            <div className='description-contents'>
              <div><span>해당 계획표는 글에 걸려 있는 링크를 통해</span></div>
              <div><span>손쉽게 상품 예약까지 가능하도록 제공되어지는 서비스입니다.</span></div>
              <div><span>이를 통해 최저가 여행 상품을 시간 들이지 않고 바로 확인 해보세요!</span></div>
            </div>
          </Col>
        </Row>
      </div>
      <div className='description-item'>
        <h1 className='small-title'>여행 블로거가 작성한 계획표, ITP 서비스!</h1>
        <Row justify="center">
          <Col xs={24} md={8}>
            <div className='description-image'>
              <img src='/itp.png'/>
            </div>
          </Col>
          <Col xs={24} md={14}>
            <div className='description-contents'>
              <div><span>일반인들을 대상으로 여행계획표를 받지만,</span></div>
              <div><span>여행의 전문가 여행 블로거들이 직접 작성한 계획표 입니다!</span></div>
              <div><span>계획표 밑에 블로그 주소와 사진을 참고해 주세요!</span></div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Descriptions