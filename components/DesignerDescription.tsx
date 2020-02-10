import * as React from 'react'
import { User } from 'type'
import Link from 'next/link'
import { Row, Col, Descriptions, Card, Rate } from 'antd'
import '@assets/DesignerDescription.less'
import { ColProps } from 'antd/lib/col'
import ITP from './ITP'

type Props = {
  designer: User
  plannerId?: number
}

const DesignerDescription: React.SFC<Props> = ({designer, plannerId})=> {

  const options: ColProps = {
    className: "planner-col",
    xs: { span: 10 },
    sm: { span: 12 },
    md: { span: 8 },
    lg: { span: 7 },
    xl: { span: 6 },
  }

  return (
    <div className='designer-description'>
      <Row justify="center" align="middle">
        <Col xs={12} md={4}>
          <div className='image-wrapper'>
            <img src={designer.profile_image || '/placeholder-image.jpg'}/>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <Descriptions colon={false} column={1} className='designer-information'>
            <Descriptions.Item label='닉네임'>{designer.nickname}</Descriptions.Item>
            <Descriptions.Item label='이메일'><div>{designer.email}</div></Descriptions.Item>
            <Descriptions.Item label='성별'><div>{designer.sex === 1 ? '남' : '여'}</div></Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24} md={14}>
          <div className='self-introduction'>
            <h1>설계한 계획표 목록</h1>
            <Row justify='start' align="middle" className='my-planner-list' gutter={[16, 16]}>
              {designer.Planners.filter(planner => planner.id !== plannerId).map(planner => (
                <Col  {...options} key={planner.id} className='planner-card-wrapper'>
                  <Link href={`/planner/${planner.id}`}>
                    <Card
                      hoverable
                      className={"planner-card" + (planner.upload_state === 4 ? ' premium' : planner.upload_state === 5 ? ' itp' : '')}
                      cover={
                        <div className='planner-card-cover'><img
                          alt="planner-image"
                          src={planner.thumbnail}
                          style={{height: '100%', width: '100%'}}
                        /></div>
                      }
                    >
                      <Card.Meta title={`[${planner.City.city_name}] ` + planner.title} description={planner.Country.country_name} />
                      <span className='planner-title'>{designer.nickname}</span>
                      <ITP url={planner.blog_link}/>
                      <div><Rate allowHalf disabled defaultValue={planner.Replies.length !== 0 ? planner.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/planner.Replies.length : 0}/></div>
                      <div style={{ fontSize: 13 }}><span>조회수: {planner.hit}&nbsp;&nbsp;|&nbsp;&nbsp;댓글수: {planner.Replies.length}</span></div>
                  </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col span={24}>
          <div className='designer-profile'>{designer.profile}</div>
        </Col>
      </Row>
    </div>
  )
}

export default DesignerDescription