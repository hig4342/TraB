import * as React from 'react'
import { User } from 'type'
import Link from 'next/link'
import { Row, Col, Descriptions, Card, Rate } from 'antd'
const { Meta } = Card
import '@assets/DesignerDescription.less'

type Props = {
  designer: User
  plannerId?: number
}

const DesignerDescription: React.SFC<Props> = ({designer, plannerId})=> {

  return (
    <div className='designer-description'>
      <Row justify="center" align="middle">
        <Col xs={24} md={8}>
          <div className='image-wrapper'>
            <img src={designer.profile_image || '/placeholder-image.jpg'}/>
          </div>
        </Col>
        <Col xs={24} md={16}>
          <Descriptions colon={false} column={1} className='designer-information'>
            <Descriptions.Item label='닉네임'>{designer.nickname}</Descriptions.Item>
            <Descriptions.Item label='이메일'><div>{designer.email}</div></Descriptions.Item>
            <Descriptions.Item label='성별'><div>{designer.sex === 1 ? '남' : '여'}</div></Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={24}>
          <div className='designer-profile'>{designer.profile}</div>
        </Col>
      </Row>
      <div className='self-introduction'>
        <h1>설계한 계획표 목록</h1>
        <Row justify='start' align="middle" className='planner-list'>
          {designer.Planners.filter(planner => planner.id !== plannerId).map(planner => (
            <Col key={planner.id} xs={8} md={6}>
              <Link href={`/planner/${planner.id}`}>
                <Card
                  hoverable
                  className={"planner-card" + (planner.upload_state == 4 ? ' premium' : '')}
                  cover={
                    <div style={{width: '100%', height: 160, overflow: 'hidden'}}><img
                      alt="planner-image"
                      src={planner.contents_image[planner.thumbnail-1]}
                      style={{height: '100%'}}
                    /></div>
                  }
                >
                  <Meta title={`[${planner.City.city_name}] ` + planner.title} description={planner.Country.country_name} />
                  <div><Rate allowHalf disabled defaultValue={planner.Replies.length !== 0 ? planner.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/planner.Replies.length : 0}/><span>&nbsp;&nbsp;{planner.Replies.length !== 0 ? planner.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/planner.Replies.length : 0}</span></div>
                  <div style={{ fontSize: 13 }}><span>조회수: {planner.hit}&nbsp;&nbsp;|&nbsp;&nbsp;댓글수: {planner.Replies.length}</span></div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default DesignerDescription