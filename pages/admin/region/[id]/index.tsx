import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { City } from 'type'
import { Form, Button, Input } from 'antd'

type Props = {
  city: City
}

const AdminRegion: NextPage<Props> = ({city})=> {

  const [form] = Form.useForm()

  const onFinish = (data: any) => {
    console.log(data)
    axios.patch(`/api/admin/cities/${city.id}`, {
      country_name: data.country_name,
      city_name: data.city_name
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
          country_name: city.Country.country_name,
          city_name: city.city_name
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='country_name'
          label='나라 이름'
          rules={[{ required: true, message: '나라 이름을 입력하세요!' },]}
        >
          <Input placeholder='나라 이름'/>
        </Form.Item>
        <Form.Item
          name='city_name'
          label='도시 이름'
          rules={[{ required: true, message: '도시 이름을 입력하세요!' },]}
        >
          <Input placeholder='도시 이름'/>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>수정하기</Button>
          <Link href='/admin/region'><Button>취소</Button></Link>
        </Form.Item>
      </Form>
    </div>
  )
}

AdminRegion.getInitialProps = async (req) => {
  const id = req.query.id

  const city = await axios.get(`/api/admin/cities/${id}`)
  return {
    city: city.data
  }
}

export default AdminRegion