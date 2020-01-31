import * as React from 'react'
import Link from'next/link'
import { Card, Rate, Row, Col } from 'antd'
import { ColProps } from 'antd/lib/grid'
import { Planner } from 'type'
const { Meta } = Card
import '../assets/PlannerList.less'
import ITP from '@components/ITP'

type Props = {
  items: Planner[];
}

const HotPlannerList: React.SFC<Props> = ({items})=> {

  const options: ColProps = {
    className: "planner-col",
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 8 },
    lg: { span: 6 },
    xl: { span: 6 },
  }

  return (
    <div className="planner-list">
      <Row justify="start" align="top" gutter={[16, 16]}>
        {items.map((item) => (
          <Col {...options} key={item.id}>
            <Link href={`/planner/${item.id}`}>
              <Card
                hoverable
                className={"planner-card" + (item.upload_state === 4 ? ' premium' : item.upload_state === 5 ? ' itp' : '')}
                cover={
                  <div style={{width: '100%', height: 160, overflow: 'hidden'}}><img
                    alt="planner-image"
                    src={item.thumbnail}
                    //onError={errorHandle}
                    style={{height: '100%', width: '100%'}}
                  /></div>
                }
              >
                <Meta title={`[${item.City.city_name}] ` + item.title} description={item.Country.country_name} />
                <span>{item.User.nickname}</span>
                <div><Rate allowHalf disabled defaultValue={item.Replies.length !== 0 ? item.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/item.Replies.length : 0}/><span>&nbsp;&nbsp;{item.Replies.length !== 0 ? item.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/item.Replies.length : 0}</span></div>
                <div style={{ fontSize: 13 }}><span>조회수: {item.hit}&nbsp;&nbsp;|&nbsp;&nbsp;댓글수: {item.Replies.length}</span></div>
                <ITP url={item.blog_link}/>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HotPlannerList