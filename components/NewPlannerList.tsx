import * as React from 'react'
import dynamic from 'next/dynamic'
import { Planner, Board } from 'type'
import { Row, Col, Card, Rate } from 'antd'
import { ColProps } from 'antd/lib/col'
import ITP from '@components/ITP'
import Link from 'next/link'
import FavoriteButton from '@components/FavoriteButton'
import '../assets/NewPlannerList.less'
import useUser from '@hooks/useUser'

const NoticeSwiper = dynamic(
  () => import('@components/NoticeSwiper'),
  { ssr: false }
)

type Props = {
  domestic: Planner[];
  foreign: Planner[];
  advertisements: Board[];
}

const NewPlannerList: React.SFC<Props> = ({ domestic, foreign, advertisements })=> {

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
    <div className="new-planner-list">
      <div className='description-card'>
        <div className='region-text'><span>한</span><span>국</span>,</div>
        <div>
          <div>어디까지</div>
          <div>가봤~니?</div>
        </div>
      </div>
      <Row justify="start" align='middle' gutter={[16, 16]} className='description-list'>
        <Col {...options} xs={24} key='domestic' className='description-card-wrapper'>
          <div className='description-card'>
            <div><img src='new_plan.png' /></div>
            <div className='region-text'><span>한</span><span>국</span>,</div>
            <div>
              <div>어디까지</div>
              <div>가봤~니?</div>
            </div>
            <div className='more-text'><Link href='/planner/domestic'><a>MORE</a></Link></div>
          </div>
        </Col>
        {
          domestic.map((planner) => {
            return (
              <Col {...options} key={planner.id} className='planner-card-wrapper'>
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
                  </Card>
                </Link>
              </Col>
            )
          })
        }
        <Col {...options} key='more' className='more-card-wrapper'>
          <Link href='/planner/domestic'>
            <Card
              bordered={false}
              className='more-card'
            >
              <div className='more-button'><span>MORE</span></div>
            </Card>
          </Link>
        </Col>
      </Row>
      <NoticeSwiper items={advertisements} inline/>
      <div className='description-card'>
        <div className='region-text'>외쿡,</div>
        <div>
          <div>가봤~니?</div>
          <div>어디까지</div>
        </div>
      </div>
      <Row justify="start" align="middle" gutter={[16, 16]} className='description-list'>
        <Col {...options} key='foreign' className='description-card-wrapper'>
          <div className='description-card'>
            <div><img src='new_plan.png' /></div>
            <div className='region-text'>외쿡,</div>
            <div>
              <div>가봤~니?</div>
              <div>어디까지</div>
            </div>
            <div className='more-text'><Link href='/planner/foreign'><a>MORE</a></Link></div>
          </div>
        </Col>
        {
          foreign.map((planner) => (
            <Col {...options} key={planner.id} className='planner-card-wrapper'>
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
                </Card>
              </Link>
            </Col>
          ))
        }
        <Col {...options} key='more' className='more-card-wrapper'>
          <Link href='/planner/foreign'>
            <Card
              bordered={false}
              className='more-card'
            >
              <div className='more-button'><span>MORE</span></div>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default NewPlannerList