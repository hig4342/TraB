import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { User } from 'type'
import { Descriptions, Row, Col, Button } from 'antd'
import moment from 'moment'
import Link from 'next/link'
import Router from 'next/router'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  designer: User
}
const AdminDesigner: NextPage<Props> = ({ designer })=> {

  const refusal = (id: number) => {
    axios.patch(baseUrl + `/api/admin/users/${id}/state`, {state_id: 2}).then( () => {
      Router.push('/admin/designer')
    })
  }
  
  const accept = (id: number) => {
    axios.patch(baseUrl + `/api/admin/users/${id}/state`, {state_id: 4}).then( () => {
      Router.push('/admin/designer')
    })
  }

  return (
    <div className='admin-designer' style={{ width: '100%' }}>
      <Row>
        <Col xs={24} sm={8}>
          <img src={designer.profile_image} style={{width: '100%', padding: 10}}/>
        </Col>
        <Col xs={24} sm={16}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label='이메일'>{designer.email}</Descriptions.Item>
            <Descriptions.Item label='이름'>{designer.name}</Descriptions.Item>
            <Descriptions.Item label='닉네임'>{designer.nickname}</Descriptions.Item>
            <Descriptions.Item label='전화번호'>{designer.phone}</Descriptions.Item>
            <Descriptions.Item label='성별'>{designer.sex === 1 ? '남성' : '여성'}</Descriptions.Item>
            <Descriptions.Item label='생년월일'>{moment(designer.birth).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label='주소'>{designer.address_zonecode} {designer.address_fulladdress} {designer.address_detailaddress}</Descriptions.Item>
            <Descriptions.Item label='은행'>{designer.account_bank}</Descriptions.Item>
            <Descriptions.Item label='계좌번호'>{designer.account_num}</Descriptions.Item>
            <Descriptions.Item label='자기소개'>{designer.profile}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row align='middle' justify='center' gutter={12}>
        <Col>
          <Button onClick={() => accept(designer.id)} type='primary'>설계자 승인</Button>
        </Col>
        <Col>
          <Button onClick={() => refusal(designer.id)} type='danger'>설계자 거부</Button>
        </Col>
        <Col>
          <Link href='/admin/designer'><Button>돌아가기</Button></Link>
        </Col>
      </Row>
    </div>
  )
}

AdminDesigner.getInitialProps = async (req) => {
  const id = req.query.id

  const designer = await axios.get(baseUrl+`/api/admin/users/${id}`)
  return {
    designer: designer.data
  }
}

export default AdminDesigner