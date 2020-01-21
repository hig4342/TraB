import * as React from 'react'
import Link from 'next/link'
import { Row, Col } from 'antd'
import '@assets/ShowandPlan.less'

const Search: React.SFC = () => {

  return (
    <div className="show-and-plan">
      <Row className='button-list' justify="space-between" gutter={16}>
        <Col xs={24} md={8}>
          <div className="button-wrapper">
            <Link href='/planner/domestic'><img className="show-dosmetic-button" src="https://trab2019.s3.ap-northeast-2.amazonaws.com/domestic-button.png"/></Link>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="button-wrapper">
            <Link href='/planner/write'><img className="selling-planner-button" src='https://trab2019.s3.ap-northeast-2.amazonaws.com/selling-button.png'/></Link>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="button-wrapper">
            <Link href='/planner/foreign'><img className="show-foreign-button" src='https://trab2019.s3.ap-northeast-2.amazonaws.com/foreign-button.png'/></Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Search