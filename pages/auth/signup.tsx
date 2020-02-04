import * as React from 'react'
import axios from 'axios'
import Router from 'next/router'
import { NextPage } from 'next'
import moment from 'moment'
import { Form, Input, Button, DatePicker, Checkbox, Modal, Row, Col, Radio, message } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import AddressFinder from '@components/AddressFinder'
import '@assets/Signup.less'

const Signup: NextPage = ()=> {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);

  const onFinish = (values: any) => {
    const data = {
      email: values.email,
      password: values.password,
      name: values.name,
      nickname: values.nickname,
      phone: values.phone,
      birth: values.birth.format('YYYY-MM-DD'),
      sex: values.sex,
      address_zonecode: values.address.zonecode,
      address_fulladdress: values.address.fulladdress,
      address_detailaddress: values.address.detailaddress
    }
    axios.post('/api/auth/signup', data).then( result => {
      if(result.status == 200) {
        Router.push({
          pathname: '/',
          query: { auth: 'signup' }
        })
      }
    }).catch( err => {
      console.log(err)
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    errorInfo.errorFields.forEach(error => message.warning(error.errors))
  };

  const disabledDate = (current: moment.Moment) => {
    return current > moment() || current < moment('1900/01/01');
  }

  const handleOk = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleAddress = (zonecode: string, fulladdress: string) => {
    console.log(zonecode, fulladdress)
    form.setFieldsValue({
      address: {
        zonecode: zonecode,
        fulladdress: fulladdress
      } 
    })
  }

  return (
    <div className='signup-page'>
      <Row justify='end' align="middle">
        <Col xs={24} sm={12} >
          <div className='signin-title'><h1>SIGN UP</h1></div>
          <div className='signup-wrapper'>
            <Form
              form={form}
              layout='vertical'
              name='signup'
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label='이메일'
                name='email'
                rules={[{ required: true, message: '이메일을 입력하세요!' },]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder='이메일'
                />
              </Form.Item>
              <Form.Item
                label='이름'
                name='name'
                rules={[{ required: true, message: '이름을 입력하세요!' },]}
              >
                <Input placeholder='이름'/>
              </Form.Item>
              <Form.Item
                label='닉네임'
                name='nickname'
                rules={[{ required: true, message: '닉네임을 입력하세요!' },]}
              >
                <Input placeholder='닉네임'/>
              </Form.Item>
              <Form.Item
                label='비밀번호'
                name="password"
                rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='비밀번호'
                />
              </Form.Item>
              <Form.Item
                label='비밀번호 확인'
                name="password_check"
                rules={[{ required: true, message: '비밀번호를 입력하세요!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder='비밀번호 확인'
                />
              </Form.Item>
              <Form.Item
                label='전화번호'
                name='phone'
                rules={[{ required: true, message: '전화번호를 입력하세요!' }]}
              >
                <Input placeholder='01012345678'/>
              </Form.Item>
              <Form.Item
                label='성별'
                name='sex'
                rules={[{ required: true, message: '성별을 선택하세요!' }]}
              >
                <Radio.Group buttonStyle='solid'>
                  <Radio.Button className='man' value='1'>남</Radio.Button>
                  <Radio.Button className='woman' value='2'>여</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label='생년월일'
                name='birth'
                rules={[{ required: true, message: '생년월일을 선택하세요!' }]}
              >
                <DatePicker
                  placeholder='생년월일'
                  disabledDate={disabledDate}
                />
              </Form.Item>
              <Form.Item label='주소'>
                <Input.Group>
                  <Form.Item
                    name={['address', 'zonecode']}
                    noStyle
                    rules={[{ required: true, message: '우편번호를 입력하세요!' }]}
                  >
                    <Input placeholder='우편번호' style={{width: '20%'}}/>
                  </Form.Item>
                  <Form.Item noStyle>
                    <Button onClick={handleOk}>우편번호 찾기</Button>
                  </Form.Item>
                  <Form.Item
                    name={['address', 'fulladdress']}
                    noStyle
                    rules={[{ required: true, message: '주소를 입력하세요!' }]}
                  >
                    <Input placeholder='주소'/>
                  </Form.Item>
                  <Form.Item
                    name={['address', 'detailaddress']}
                    noStyle
                    rules={[{ required: true, message: '상세주소를 입력하세요!' }]}
                  >
                    <Input placeholder='상세주소'/>
                  </Form.Item>
                </Input.Group>
                <Modal
                  title="우편번호 찾기"
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <AddressFinder
                    handleCancel={handleCancel}
                    handleAddress={handleAddress}
                  />
                </Modal>
              </Form.Item>
              <Form.Item
                name='caution'
                valuePropName='checked'
                rules={[{
                  validator: (_rule, value) => {
                    if(value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('유의사항에 동의하지 않으면 제출할 수 없습니다.')
                  }
                }]}
              >
                <Checkbox><a target='_blank' href='/Trab_personal_information.html' style={{ fontSize: 16}}>개인 정보 활용에 동의합니다.</a></Checkbox>
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  회원가입
                </Button>
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

export default Signup