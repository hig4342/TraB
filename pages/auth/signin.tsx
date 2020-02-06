import * as React from 'react'
import Router from 'next/router'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { NextPage } from 'next'
import { Input, Form, Button, message, Checkbox, Row, Col } from 'antd'
import { Store, ValidateErrorEntity } from 'rc-field-form/lib/interface';
import useUser from '@hooks/useUser'
import { User } from '@reducers/userReducer'
import '@assets/signin.less'
import Link from 'next/link'

const SigninPage: NextPage = () => {

  const {onLogin} = useUser()

  const onFinish = (values: Store) => {
    axios.post('/api/auth/signin', values).then( result => {
      const usertoken = result.data
      sessionStorage.setItem('usertoken', usertoken)
      if(values.remember){
        localStorage.setItem('usertoken', usertoken)
      }
      const user: User = jwtDecode(usertoken)
      onLogin(user)
      Router.push('/')
    }).catch( err => {
      console.log(err)
    })
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    errorInfo.errorFields.forEach(error => message.warning(error.errors))
  };

  return (
    <div className='signin-page'>
      <Row justify='end' align='middle'>
        <Col xs={24} sm={11} >
          <div className='signin-title'><h1>SIGN IN</h1></div>
          <div className='signin-wrapper'>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              name='signin_form'
              layout='vertical'
            >
              <Form.Item
                label='이메일'
                name='email'
                required={false}
                rules={[{ required: true, message: '이메일을 입력해주세요' }]}
              >
                <Input placeholder='이메일을 입력해주세요'/>
              </Form.Item>
              <Form.Item
                label='비밀번호'
                name='password'
                required={false}
                rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
              >
                <Input.Password placeholder='비밀번호를 입력해주세요'/>
              </Form.Item>
              <Form.Item
                name='remember'
                valuePropName="checked"
              >
                <Checkbox>로그인 상태 유지</Checkbox>
              </Form.Item>
              <Form.Item> 
                <Button type='primary' htmlType='submit' block>로그인</Button>
              </Form.Item>
              <Form.Item>
                <div style={{textAlign: 'center'}}><span>아직 트래비(TraB) 회원이 아니신가요? <Link href='/auth/signup'><a>회원가입</a></Link></span></div>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col xs={0} sm={10}>
          <div style={{ minHeight: 750 }} />
        </Col>
      </Row>
    </div>
  )
}

export default SigninPage