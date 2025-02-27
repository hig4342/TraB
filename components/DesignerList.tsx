import * as React from 'react'
import { User } from 'type'
import { Row, Col, Card } from 'antd'
import { ColProps } from 'antd/lib/grid'
import Link from 'next/link'
import * as Hangul from 'hangul-js';
import '@assets/DesignerList.less'

type Props = {
  designers: User[]
  premium?: boolean
  searchName?: string
  region?: 'all' | 'domestic' | 'foreign'
}

const DesignerList: React.SFC<Props> = ({designers, premium=false, searchName, region})=> {

  const options: ColProps = {
    className: "designer-col",
    xs: { span: 12 },
    sm: { span: 8 },
    md: { span: 6 },
    lg: { span: 6 },
    xl: { span: 5 },
  }

  return (
    <div className='designer-list'>
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
          return (
            <Col {...options} key={designer.id}>
              <Link href={`/designer/${designer.id}`}>
                <Card
                  hoverable
                  className='designer-card'
                  cover={
                    <div className='designer-card-cover'><img
                      alt="designer-image"
                      src={designer.profile_image || '/defaultprofile.png'}
                      //onError={errorHandle}
                      style={{height: '100%', width: '100%'}}
                    /></div>
                  }
                >
                  <Card.Meta title={designer.nickname} description={designer.email}/>
                  <p>설계한 계획표: {designer.Planners.length}</p>
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