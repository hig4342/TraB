import * as React from 'react'
import Link from'next/link'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { Card, Rate, Row, Col } from 'antd'
import { ColProps } from 'antd/lib/grid'
import { Planner } from 'type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import '../assets/PlannerList.less'
import ITP from '@components/ITP'

type Props = {
  items: Planner[];
  country: number;
  city: CheckboxValueType[];
  themes: CheckboxValueType[];
}

const PlannerList: React.SFC<Props> = ({items, country, city, themes})=> {

  const [length, setLength] = React.useState(12)
  const [visible, setVisible] = React.useState(items.length >= 12)

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

  const handleLength = () => {
    setLength(length + 4)
    if(items.length >= length) {
      setVisible(false)
    }
  }

  return (
    <div className="planner-list">
      <Row justify="start" align="top" gutter={[16, 16]}>
        {items.slice(0, length).map((item) => (
          <Col {...options} key={item.id}>
            <Link href={`/planner/${item.id}`}>
              <Card
                hoverable
                className={"planner-card" + (item.upload_state === 4 ? ' premium' : item.upload_state === 5 ? ' itp' : '')}
                cover={
                  <div className='planner-card-cover'><img
                    alt="planner-image"
                    src={item.thumbnail}
                    style={{height: '100%', width: '100%'}}
                  /></div>
                }
              >
                <Card.Meta title={`[${item.City.city_name}] ` + item.title} description={item.Country.country_name} />
                <span className='planner-title'>{item.User.nickname}</span>
                <ITP url={item.blog_link}/>
                <div className='rate-wrapper'><Rate allowHalf disabled defaultValue={item.Replies.length !== 0 ? Math.floor(item.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/item.Replies.length*2)/2 : 0}/><span className='rate-number'>&nbsp;&nbsp;{item.Replies.length !== 0 ? (item.Replies.map(({rate}) => (rate)).reduce((a, b) => a+b)/item.Replies.length).toFixed(2) : 0}</span></div>
                <div className='count-wrapper' style={{ fontSize: 13 }}><span>조회수: {item.hit}&nbsp;&nbsp;|&nbsp;&nbsp;댓글수: {item.Replies.length}</span></div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <div style={{display: visible ? 'block' : 'none'}} className="show-more-button">
        <div onClick={handleLength} className='text-wrapper'>
          <div><FontAwesomeIcon size='2x' icon={faPlus}/></div>
          <div>more</div>
        </div>
      </div>
    </div>
  )
}

export default PlannerList