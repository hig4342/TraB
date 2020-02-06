import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { User } from 'type'
import { Descriptions, Row, Col, Button } from 'antd'
import moment from 'moment'
import Link from 'next/link'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  user: User
}
const AdminUser: NextPage<Props> = ({ user })=> {

  return (
    <div className='admin-user' style={{ width: '100%' }}>
      <Row>
        <Col xs={24} sm={8}>
          <img src={user.profile_image} style={{width: '100%', padding: 10}}/>
        </Col>
        <Col xs={24} sm={16}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label='이메일'>{user.email}</Descriptions.Item>
            <Descriptions.Item label='이름'>{user.name}</Descriptions.Item>
            <Descriptions.Item label='닉네임'>{user.nickname}</Descriptions.Item>
            <Descriptions.Item label='전화번호'>{user.phone}</Descriptions.Item>
            <Descriptions.Item label='성별'>{user.sex === 1 ? '남성' : '여성'}</Descriptions.Item>
            <Descriptions.Item label='생년월일'>{moment(user.birth).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label='주소'>{user.address_zonecode} {user.address_fulladdress} {user.address_detailaddress}</Descriptions.Item>
            <Descriptions.Item label='자기소개'>{user.profile}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row align='middle' justify='center' gutter={12}>
        <Col>
          <Link href='/admin/user'><Button>돌아가기</Button></Link>
        </Col>
      </Row>
    </div>
  )
}

AdminUser.getInitialProps = async (req) => {
  const id = req.query.id

  const user = await axios.get(baseUrl+`/api/admin/users/${id}`)
  return {
    user: user.data
  }
}

export default AdminUser