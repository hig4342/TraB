import * as React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { NextPage } from 'next'
import { Input, Form, Button, message } from 'antd'
import { Store, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import useUser from '@hooks/useUser'

const SigninPage: NextPage = () => {

  const {onLogin} = useUser()

  const onFinish = (values: Store) => {
    console.log('Success:', values);
    axios.post('/api/auth/signin', values).then( result => {
      onLogin({user: result.data})
    })
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    errorInfo.errorFields.forEach(error => message.warning(error.errors))
  };

  const itemStyle = {
    labelCol: { span: 4 },
    wrapperCol: { span: 6 },
  }

  return (
    <div>
      <h1>로그인창</h1>
      <p>
        <Link href="/">
          <a>메인화면</a>
        </Link>
      </p>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        name='signin_form'
      >
        <Form.Item
          {...itemStyle}
          label='이메일'
          name='email'
          required={false}
          rules={[{ required: true, message: '이메일을 입력해주세요' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...itemStyle}
          label='비밀번호'
          name='password'
          required={false}
          rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{offset: 4, span: 6}}
        >
          <Button type='primary' htmlType='submit' block>로그인</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SigninPage