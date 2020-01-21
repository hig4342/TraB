import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { Theme } from 'type'
import { Form, Button, Input } from 'antd'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  theme: Theme
}

const AdminRegion: NextPage<Props> = ({theme})=> {

  const [form] = Form.useForm()

  const onFinish = (data: any) => {
    console.log(data)
    axios.patch(baseUrl+ `/api/admin/themes/${theme.id}`, {
      name: data.name
    }).then( result => {
      console.log(result)
      Router.push('/admin/region')
    })
  }
  return (
    <div className='admin-region'>
      <Form
        form={form}
        initialValues={{
          name: theme.name
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='name'
          label='테마 이름'
          rules={[{ required: true, message: '테마 이름을 입력하세요!' },]}
        >
          <Input placeholder='테마 이름'/>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>수정하기</Button>
          <Link href='/admin/theme'><Button>취소</Button></Link>
        </Form.Item>
      </Form>
    </div>
  )
}

AdminRegion.getInitialProps = async (req) => {
  const id = req.query.id

  const theme = await axios.get(baseUrl+ `/api/admin/themes/${id}`)
  return {
    theme: theme.data
  }
}

export default AdminRegion