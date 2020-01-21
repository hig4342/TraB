import * as React from 'react'
import { Planner } from 'type'
import { Row, Col, Card, Rate } from 'antd'
import Link from 'next/link'
import Meta from 'antd/lib/card/Meta'

type Props = {
  planners: Planner[]
}
const MypagePlanner: React.SFC<Props> = ({planners})=> {
  return (
    <div className='mypage-planner'>
      <h1 className='small-title'>설계한 계획표 목록</h1>
      <Row justify='start' align="middle" className='planner-list'>
          {planners.map(planner => (
            <Col key={planner.id} xs={8} md={6}>
              <Link href={`/planner/${planner.id}`}>
                <Card
                  hoverable
                  className={"planner-card" + (planner.upload_state == 4 ? ' premium' : '')}
                  cover={
                    <div style={{width: '100%', height: 160, overflow: 'hidden'}}>
                      <img
                        alt="planner-image"
                        src={planner.contents_image[planner.thumbnail-1]}
                        style={{height: '100%', width: '100%'}}
                      />
                    </div>
                  }
                >
                  <Meta title={`[${planner.City.city_name}] ` + planner.title} description={planner.Country.country_name} />
                  <div><Rate allowHalf disabled defaultValue={planner.Replies.length !== 0 ? planner.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/planner.Replies.length : 0}/><span>&nbsp;&nbsp;{planner.Replies.length !== 0 ? planner.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/planner.Replies.length : 0}</span></div>
                  <div style={{ fontSize: 13 }}><span>조회수: {planner.hit}&nbsp;&nbsp;|&nbsp;&nbsp;댓글수: {planner.Replies.length}</span></div>
                  <div><span>승인 여부: {planner.upload_state === 1 ? '미승인' : planner.upload_state === 2 ? '거부' : planner.upload_state === 3 ? '승인' : planner.upload_state === 4 ? 'P' : 'ITP'}</span></div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
    </div>
  )
}

export default MypagePlanner