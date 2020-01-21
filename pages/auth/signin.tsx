import * as React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { NextPage } from 'next'
import { Input, Form, Button, message, Checkbox } from 'antd'
import { Store, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import useUser from '@hooks/useUser'
import { User } from '@reducers/userReducer'

const SigninPage: NextPage = () => {

  const {onLogin} = useUser()

  const onFinish = (values: Store) => {
    console.log('Success:', values);
    axios.post('/api/auth/signin', values).then( result => {
      const usertoken = result.data
      sessionStorage.setItem('usertoken', usertoken)
      if(values.remember){
        localStorage.setItem('usertoken', usertoken)
      }
      const user: User = jwtDecode(usertoken)
      onLogin(user)
      Router.push('/')
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
          name='remember'
          valuePropName="checked"
        >
          <Checkbox>로그인 상태 유지</Checkbox>
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