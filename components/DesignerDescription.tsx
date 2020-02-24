import * as React from 'react'
import { User } from 'type'
import Link from 'next/link'
import { Row, Col, Descriptions, Card, Rate } from 'antd'
import { ColProps } from 'antd/lib/col'
import ITP from './ITP'
import useUser from '@hooks/useUser'
import FavoriteButton from '@components/FavoriteButton'
import '@assets/DesignerDescription.less'

type Props = {
  designer: User
  plannerId?: number
  favorite?: boolean
}

const DesignerDescription: React.SFC<Props> = ({designer, plannerId, favorite=true})=> {

  const { isLogin } = useUser()
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
      <Row justify="center" align="middle" className='description-row'>
        <Col xs={12} md={4} className='description-col'>
          <div className='image-wrapper'>
            <img src={designer.profile_image || '/defaultprofile.png'}/>
          </div>
        </Col>
        <Col xs={12} md={6} className='description-col'>
          <Descriptions colon={false} column={1} className='designer-information'>
            <Descriptions.Item label='닉네임'>{designer.nickname}</Descriptions.Item>
            <Descriptions.Item label='이메일'><div>{designer.email}</div></Descriptions.Item>
            <Descriptions.Item label='성별'><div>{designer.sex === 1 ? '남' : '여'}</div></Descriptions.Item>
          </Descriptions>
        </Col>
        {
          designer.Planners.length >= 2 ?
          <Col xs={24} md={14} className='description-col'>
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
                        <div className='rate-wrapper'>
                          <Rate allowHalf disabled
                            value={ planner.Rates.length !== 0 ? Math.floor(planner.Rates.map(rate => rate.rate).reduce((accumulator, currentValue) => (accumulator + currentValue))/planner.Rates.length*2)/2 : 0}
                          />
                        </div>
                        <div style={{ fontSize: 13 }}><span>조회수: {planner.hit}&nbsp;&nbsp;|&nbsp;&nbsp;댓글수: {planner.Replies.length}</span></div>
                        { favorite && isLogin ? <div className='favorite-wrapper'><FavoriteButton favorites={planner.Favorites} plannerId={planner.id}/></div> : null }
                    </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          :
          <Col xs={24} md={14} className='description-col'/>
        }
        <Col span={24} className='description-col'>
          <div className='designer-profile'>{designer.profile}</div>
        </Col>
      </Row>
    </div>
  )
}

export default DesignerDescription