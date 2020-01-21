import * as React from 'react'
import axios from 'axios'
import Router from 'next/router'
import { NextPage } from 'next'
import moment from 'moment'
import { Form, Input, Button, DatePicker, Checkbox, Modal, Row, Col, Radio } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import AddressFinder from '@components/AddressFinder'
import '@assets/Signup.less'

const CenterItemLayout: React.CSSProperties = {
  textAlign: 'center'
}

const Signup: NextPage = ()=> {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);

  const onFinish = (values: any) => {
    console.log(values)
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
    console.log(data)
    axios.post('/api/auth/signup', data).then( result => {
      console.log(result)
      if(result.status == 201) {
        Router.push('/')
      }
    }).catch( err => {
      console.log('????')
      console.log(err)
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
    <div className='signup'>
      <Row justify="start" align="middle">
      <Col xs={24} md={12}>
        <Form
          form={form}
          layout='vertical'
          name='signup'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item style={CenterItemLayout}>
            <h1>SIGN UP</h1>
          </Form.Item>
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
              <Radio.Button className='woman' value='2'>녀</Radio.Button>
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
          <Form.Item>
            <span><Checkbox style={{margin: '0 5px'}}/><a>개인 정보 활용</a> 및 <a>이용 약관</a>에 동의합니다.</span>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </Col>
      </Row>
    </div>
  )
}

export default Signup