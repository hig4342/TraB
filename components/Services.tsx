import * as React from 'react'
import { Button, Row, Col } from 'antd'
import '@assets/Services.less'
import PopupWrapper from '@components/PopupWrapper'

const Services: React.SFC = ()=> {

  return (
    <div className='services'>
      <div className='selling-service'>
        <h1 className='small-title'>여행계획표는 여러분의 경험에서 탄생합니다.</h1>
        <h4 className='sub-title'>여러분이 여행 중 겪었던 소중한 추억과 여행 팁들을 계획표로써 트래비에 판매하세요!</h4>
        <Row justify="center">
          <Col xs={24} md={12}>
            <div className='write-planner'><img src='/write-planner.jpg' /></div>
          </Col>
          <Col xs={24} md={12}>
            <div className='selling-information'>
              <div><span>여러분이 경험했던 귀중한 추억을 다른 이들과 공유해보세요!</span></div>
              <div><span>계획표는 <strong>1일치</strong> 기준으로 작성해서 <strong>개당 2,500원</strong>에 판매하세요!</span></div>
              <div><span>판매 전, 설계자 등록은 필수!</span></div>
              <div><span>본인이 정한 계좌로 <strong>매월 15일</strong>, <strong>마지막일</strong>에 정산하여 입금됩니다!</span></div>
              <div><span>철저한 계획표 검수 과정은 필수라는 사실, 알고 계시죠?</span></div>
              <div><span>오로지 여행 명소와 관련된 내용으로 만들어주셔야 하는 점, 잊지마세요!!</span></div>
            </div>
          </Col>
        </Row>
        <div className='button-wrapper'>
          <PopupWrapper signin email enroll pending callback='/planner/write'><Button className='selling-button'>여행계획표 판매하기</Button></PopupWrapper>
        </div>
      </div>
    </div>
  )
}

export default Services