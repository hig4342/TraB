import * as React from 'react'
import { Row, Col } from 'antd'
import '@assets/Foot.less'

const Foot: React.SFC = () => {
  
  return (
    <div className='information'>
      <Row>
        <Col xs={24} sm={12} md={12}>
          <div>
            <span>Not Afraid, Not Nervous, For Stable.</span>
            <span>트래비(TraB)</span>
          </div>
          <div>
            <span>대표: 송기훈, 김민수, 김수환</span>
            <span>사업자 등록 번호: 662-24-00804</span>
          </div>
          <div>
            <span>개인정보 책임자: 김수환</span>
          </div>
          <div>
            <span>고객 문의: 010-7506-3732</span>
            <span>카카오 플러스 친구: 트래비(TraB) 고객센터</span>
          </div>
          <div>
            <span>이메일: trab_official@naver.com</span>
          </div>
          <div>
            <span>사업장 주소: 대전광역시 대덕구 한남로 12번길 창업마켓(창업존) 590203호</span>
          </div>
          <div>
            <span>* 트래비(TraB)는 여행 플랫폼으로써 거래 중 발생하는 문제에 책임지지 않습니다.</span>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div className='document-wrapper'>
            <a target='_blank' href='/Trab_personal_information.html'>개인정보 이용동의서</a>
            <a style={{marginLeft: 20}} target='_blank' href='https://channeldeep.creatorlink.net'>회사 소개</a>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <div className='mark-wrapper'>
            <a target='_blank' href='http://escrow1.kbstar.com/quics?page=B009111&cc=b010807:b008491&mHValue=9e4575ec73bc8c4223698f3491a9c29f20190703145685'><img src="http://img1.kbstar.com/img/escrow/escrowcmark.gif" /></a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Foot