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
      <Row justify="center" align="middle">
        <Col className='count-wrapper' xs={8} sm={6}>
          <div><span>국내 여행계획</span></div>
          <div><span><Countup className='count-number' duration={3} start={0} end={planners.domestic}/></span></div>
        </Col>
        <Col className='count-wrapper' xs={8} sm={6}>
          <div><span>여행 설계자</span></div>
          <div><span><Countup className='count-number' duration={3} start={0} end={designers}/></span></div>
        </Col>
        <Col className='count-wrapper' xs={8} sm={6}>
          <div><span>해외 여행계획</span></div>
          <div><span><Countup className='count-number' duration={3} start={0} end={planners.foreign}/></span></div>
        </Col>
      </Row>
    </div>
  )
}

export default CurrentSituation