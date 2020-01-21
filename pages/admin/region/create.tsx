import * as React from 'react'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import { NextPage } from 'next'
import { Radio, Form, Input, Button } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'

const Create: NextPage = ()=> {

  const [form] = Form.useForm()
  const [disabled, setDisabled] = React.useState(true) 
  const regionSelect = (e: RadioChangeEvent) => {
    if(e.target.value === 'domestic'){
      setDisabled(true)
      form.setFieldsValue({
        country_name: '한국'
      })
    } else {
      setDisabled(false)
      form.setFieldsValue({
        country_name: ''
      })
    }
  }

  const onFinish = (data: any) => {
    console.log(data)
    axios.post('/api/admin/cities', {
      country_name: data.country_name,
      city_name: data.city_name
    }).then( result => {
      console.log(result)
      Router.push('/admin/region')
    })
  }

  return (
    <div className='create'>
      <Form
        form={form}
        initialValues={{
          region: 'domestic',
          country_name: '한국'
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='region'
          label='국내 / 해외 선택'
        >
          <Radio.Group onChange={regionSelect} buttonStyle='solid'>
            <Radio.Button value='domestic'>국내</Radio.Button>
            <Radio.Button value='foreign'>해외</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='country_name'
          label='나라 이름'
          rules={[{ required: true, message: '나라 이름을 입력하세요!' },]}
        >
          <Input disabled={disabled} placeholder='나라 이름'/>
        </Form.Item>
        <Form.Item
          name='city_name'
          label='도시 이름'
          rules={[{ required: true, message: '도시 이름을 입력하세요!' },]}
        >
          <Input placeholder='도시 이름'/>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>생성하기</Button>
          <Link href='/admin/region'><Button>취소</Button></Link>
        </Form.Item>
      </Form>
    </div>
  )
}

Create.getInitialProps = async () => {
  return {
    
  }
}

export default Create