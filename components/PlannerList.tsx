import * as React from 'react'
import Link from'next/link'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { Card, Rate, Row, Col } from 'antd'
import { ColProps } from 'antd/lib/grid'
import { Planner } from 'type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const { Meta } = Card
import '../assets/PlannerList.less'

type Props = {
  items: Planner[];
  country: number;
  city: CheckboxValueType[];
  themes: CheckboxValueType[];
}

// const errorHandle = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//   e.currentTarget.src = 'placeholder-image.jpg'
// }

const PlannerList: React.SFC<Props> = ({items, country, city, themes})=> {

  const options: ColProps = {
    className: "planner-col",
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 8 },
    lg: { span: 6 },
    xl: { span: 6 },
  }

  if(country !== 0) {
    items = items.filter(item => item.Country.id == country)
  }

  if(city.length !== 0) {
    items = items.filter(item => city.includes(item.City.id))
  }

  if(themes.length !== 0) {
    items = items.filter(item => (item.themes_id.filter(theme => themes.includes(theme)).length !== 0))
  }

  const handleBubbling = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <div className="planner-list">
      <Row justify="start" align="middle" gutter={[16, 16]}>
        {items.map((item) => (
          <Col {...options} key={item.id}>
            <Link href={`/planner/${item.id}`}>
              <Card
                hoverable
                className={"planner-card" + (item.upload_state === 4 ? ' premium' : item.upload_state === 5 ? ' itp' : '')}
                cover={
                  <div style={{width: '100%', height: 160, overflow: 'hidden'}}><img
                    alt="planner-image"
                    src={item.contents_image[item.thumbnail-1]}
                    //onError={errorHandle}
                    style={{height: '100%'}}
                  /></div>
                }
              >
                <Meta title={`[${item.City.city_name}] ` + item.title} description={item.Country.country_name} />
                <p>{item.User.nickname}</p>
                <div><Rate allowHalf disabled defaultValue={item.Replies.length !== 0 ? item.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/item.Replies.length : 0}/><span>&nbsp;&nbsp;{item.Replies.length !== 0 ? item.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/item.Replies.length : 0}</span></div>
                <div style={{ fontSize: 13 }}><span>조회수: {item.hit}&nbsp;&nbsp;|&nbsp;&nbsp;댓글수: {item.Replies.length}</span></div>
                <div className='itp-content' onClick={handleBubbling}>
                  <span style={{ display: 'block' }}>블로거명 : {item.blog_name}</span>
                  <a href={item.blog_link}>{item.blog_link !== '' ? item.blog_link : '.'}</a>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <div className="show-more-button">
        <div className='text-wrapper'>
          <div><FontAwesomeIcon size='2x' icon={faPlus}/></div>
          <div>more</div>
        </div>
      </div>
    </div>
  )
}

export default PlannerList