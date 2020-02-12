import * as React from 'react'
import { Planner } from 'type'
import { Row, Col, Card, Rate } from 'antd'
import Link from 'next/link'
import ITP from './ITP'
import { ColProps } from 'antd/lib/col'
import FavoriteButton from '@components/FavoriteButton'
import useUser from '@hooks/useUser'
import '@assets/MypagePlanner.less'

type Props = {
  planners: Planner[]
}
const MypagePlanner: React.SFC<Props> = ({planners})=> {

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
    <div className='mypage-planner'>
      <h1 className='small-title'>설계한 계획표 목록</h1>
      <Row justify='start' align="top" className='planner-list' gutter={[16, 16]}>
          {planners.map(planner => (
            <Col key={planner.id} {...options} className='planner-card-wrapper'>
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
                  <span className='planner-title'>{planner.User.nickname}</span>
                  <ITP url={planner.blog_link}/>
                  <div className='rate-wrapper'>
                    <Rate allowHalf disabled
                      value={ planner.Rates.length !== 0 ? Math.floor(planner.Rates.map(rate => rate.rate).reduce((accumulator, currentValue) => (accumulator + currentValue))/planner.Rates.length*2)/2 : 0}
                    />
                    <span className='rate-number'>
                      { planner.Rates.length !== 0 ? (planner.Rates.map(rate => rate.rate).reduce((accumulator, currentValue) => (accumulator + currentValue))/planner.Rates.length).toFixed(2) : 0}
                    </span>
                  </div>
                  <div style={{ fontSize: 13 }}><span>조회수: {planner.hit}&nbsp;&nbsp;|&nbsp;&nbsp;댓글수: {planner.Replies.length}</span></div>
                  { isLogin ? <div className='favorite-wrapper'><FavoriteButton favorites={planner.Favorites} plannerId={planner.id}/></div> : null }
                  <div>정산 여부 : {planner.payment_state === 1 ? '미확인' : planner.payment_state === 2 ? '정산 거부' : '정산 완료'}</div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
    </div>
  )
}

export default MypagePlanner