import * as React from 'react'
import Countup from 'react-countup'
import { Row, Col } from 'antd'
import '@assets/CurrentSituation.less'

type Props = {
  planners: {
    domestic: number;
    foreign: number;
  };
  designers: number;
}
const CurrentSituation: React.SFC<Props> = ({planners, designers})=> {
  return (
    <div className='current-situation'>
      <Row justify="space-around" align="middle">
        <Col className='count-wrapper' xs={12} md={{order: 1, span: 8}}>
          <span>국내 여행계획&nbsp;&nbsp;<Countup className='count-number' duration={3} start={0} end={planners.domestic}/>개</span>
        </Col>
        <Col className='count-wrapper' xs={12} md={{order: 3, span: 8}}>
          <span>해외 여행계획&nbsp;&nbsp;<Countup className='count-number' duration={3} start={0} end={planners.foreign}/>개</span>
        </Col>
        <Col className='count-wrapper' xs={24} md={{order: 2, span: 8}}>
          <span>여행 설계자&nbsp;&nbsp;<Countup className='count-number' duration={3} start={0} end={designers}/>명</span>
        </Col>
      </Row>
    </div>
  )
}

export default CurrentSituation