import * as React from 'react'
import axios from 'axios'
import { Row, Col, Divider } from 'antd'

type Props = {
  url: string
}

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

const ITP: React.SFC<Props> = ({url}) => {

  const [title, setTitle] = React.useState('')
  const [image, setImage] = React.useState('')

  const handleBubbling = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  axios.get(baseUrl + '/api/planners/metadata?url=' + url).then( result => {
    setTitle(result.data.title)
    setImage(result.data.image)
  })
  
  return (
    <div className='itp-content' onClick={handleBubbling}>
      <Divider className='itp-divider'/>
      <Row>
        <Col span={6}>
          <div className='itp-image-wrapper'><img src={image}/></div>
        </Col>
        <Col span={18}>
          <div><span>{title}</span></div>
          <div><a href={url}>{url}</a></div>
        </Col>
      </Row>
    </div>
  )
}

export default ITP