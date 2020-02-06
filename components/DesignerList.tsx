import * as React from 'react'
import { User } from 'type'
import { Row, Col, Card, Rate } from 'antd'
import { ColProps } from 'antd/lib/grid'
import Link from 'next/link'
import * as Hangul from 'hangul-js';

type Props = {
  designers: User[]
  premium?: boolean
  searchName?: string
  region?: 'all' | 'domestic' | 'foreign'
}

const DesignerList: React.SFC<Props> = ({designers, premium=false, searchName, region})=> {

  const options: ColProps = {
    className: "designer-col",
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 8 },
    lg: { span: 6 },
    xl: { span: 6 },
  }

  return (
    <div className='example'>
      <Row justify="start" align="middle" gutter={[16, 16]}>
        {designers.filter(designer => {
          if( designer.Planners.length === 0 ) return false
          if(!searchName) return true
          return Hangul.search(designer.nickname, searchName) === 0
        }).filter(designer => {
          if( !region ) return true
          if( region && region === 'all') return true
          else if ( region === 'domestic') {
            let result = false
            designer.Planners.forEach(planner => {
              if(planner.Country.id === 1 ) result = true
            })
            return result
          } else {
            let result = false
            designer.Planners.forEach(planner => {
              if(planner.Country.id !== 1 ) result = true
            })
            return result
          }
        }).filter(designer => {
          if(!premium) return true
          let result = false
          designer.Planners.forEach(planner => {
            if(planner.upload_state === 4) result = true
          })
          return result
        }).map( designer => {
          let rate = 0
          let count = 0
          designer.Planners.forEach(planner => {
            planner.Replies.forEach(reply => {
              rate = rate + reply.rate
              count = count + 1
            })
          })
          return (
            <Col {...options} key={designer.id}>
              <Link href={`/designer/${designer.id}`}>
                <Card
                  hoverable
                  cover={
                    <div style={{width: '100%', height: 160, overflow: 'hidden'}}><img
                      alt="planner-image"
                      src={designer.profile_image || '/placeholder-image.jpg'}
                      //onError={errorHandle}
                      style={{height: '100%', width: '100%'}}
                    /></div>
                  }
                >
                  <Card.Meta title={designer.nickname} description={designer.email}/>
                  <p>설계한 계획표: {designer.Planners.length}</p>
                  <div><Rate allowHalf disabled defaultValue={Math.round((count !== 0 ? rate/count : 0)*2)/2}/><span>&nbsp;&nbsp;{(count !== 0 ? rate/count : 0).toFixed(2)}</span></div>
                </Card>
              </Link>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default DesignerList