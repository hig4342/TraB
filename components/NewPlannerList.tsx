import * as React from 'react'
import { Planner } from 'type'
import { Row, Col, Card, Rate } from 'antd'
import { ColProps } from 'antd/lib/col'
import ITP from '@components/ITP'
import Link from 'next/link'
import '../assets/NewPlannerList.less'

type Props = {
  domestic: Planner[];
  foreign: Planner[];
}

// const errorHandle = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//   e.currentTarget.src = 'placeholder-image.jpg'
// }

const NewPlannerList: React.SFC<Props> = ({ domestic, foreign })=> {

  const options: ColProps = {
    className: "planner-col",
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 8 },
    lg: { span: 7 },
    xl: { span: 6 },
  }
  
  return (
    <div className="new-planner-list">
      <Row justify="start" align='top' gutter={[16, 16]}>
        <Col {...options} key='domestic'>
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
              <Col {...options} key={planner.id}>
                <Link href={`/planner/${planner.id}`}>
                  <Card
                    hoverable
                    className={"planner-card" + (planner.upload_state === 4 ? ' premium' : planner.upload_state === 5 ? ' itp' : '')}
                    cover={
                      <div style={{width: '100%', height: 160, overflow: 'hidden'}}><img
                        alt="planner-image"
                        src={planner.thumbnail}
                        style={{height: '100%', width: '100%'}}
                      /></div>
                    }
                  >
                    <Card.Meta title={`[${planner.City.city_name}] ` + planner.title} description={planner.Country.country_name} />
                    <span>{planner.User.nickname}</span>
                    <div><Rate allowHalf disabled defaultValue={planner.Replies.length !== 0 ? planner.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/planner.Replies.length : 0}/><span>&nbsp;&nbsp;{planner.Replies.length !== 0 ? planner.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/planner.Replies.length : 0}</span></div>
                    <div style={{ fontSize: 13 }}><span>조회수: {planner.hit}&nbsp;&nbsp;|&nbsp;&nbsp;댓글수: {planner.Replies.length}</span></div>
                    <ITP url={planner.blog_link}/>
                  </Card>
                </Link>
              </Col>
            )
          })
        }
      </Row>
      <Row justify="start" align="middle" gutter={[16, 64]}>
        <Col {...options} key='foreign'>
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
            <Col {...options} key={planner.id}>
              <Link href={`/planner/${planner.id}`}>
                <Card
                  hoverable
                  className={"planner-card" + (planner.upload_state === 4 ? ' premium' : planner.upload_state === 5 ? ' itp' : '')}
                  cover={
                    <div style={{width: '100%', height: 160, overflow: 'hidden'}}><img
                      alt="planner-image"
                      src={planner.thumbnail}
                      style={{height: '100%', width: '100%'}}
                    /></div>
                  }
                >
                  <Card.Meta title={`[${planner.City.city_name}] ` + planner.title} description={planner.Country.country_name} />
                  <span>{planner.User.nickname}</span>
                  <div><Rate allowHalf disabled defaultValue={planner.Replies.length !== 0 ? planner.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/planner.Replies.length : 0}/><span>&nbsp;&nbsp;{planner.Replies.length !== 0 ? planner.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/planner.Replies.length : 0}</span></div>
                  <div style={{ fontSize: 13 }}><span>조회수: {planner.hit}&nbsp;&nbsp;|&nbsp;&nbsp;댓글수: {planner.Replies.length}</span></div>
                  <ITP url={planner.blog_link}/>
                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default NewPlannerList