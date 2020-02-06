import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { User } from 'type'
import { Descriptions } from 'antd'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  designer: User
}
const AdminDesigner: NextPage<Props> = ({ designer })=> {

  console.log(designer)

  return (
    <div className='admin-designer' style={{ width: '100%' }}>
      <Descriptions title='설계자 정보'>
        <Descriptions.Item label='이메일'>{designer.email}</Descriptions.Item>
      </Descriptions>
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