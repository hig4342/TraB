import * as React from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import { Row, Col, Form, Input, Radio, DatePicker, Button, Modal, Checkbox } from 'antd'
import axios from 'axios'
import AddressFinder from '@components/AddressFinder'
import UploadWrapper from '@components/UploadWrapper'
import moment from 'moment'
import useUser from '@hooks/useUser'
import { UploadFile } from 'antd/lib/upload/interface'
import { Callbacks } from 'rc-field-form/lib/interface';
import '@assets/Designer_Register.less'
import { ColProps } from 'antd/lib/col'


const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

const Designer_Register: NextPage = ()=> {

  const { user, isLogin } = useUser();
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [image, setImage] = React.useState('')
  const itemLayout: { labelCol: ColProps; wrapperCol: ColProps } = {
    labelCol: {
      xs: 24,
      sm: 3
    },
    wrapperCol: {
      xs: 24,
      sm: 19
    }
  }

  React.useEffect(() => {
    if(isLogin) {
      form.setFieldsValue({
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        phone: user.phone,
        birth: moment(user.birth),
        sex: String(user.sex),
        address: {
          zonecode: user.address_zonecode,
          fulladdress: user.address_fulladdress,
          detailaddress: user.address_detailaddress
        }
      })
    }
  }, [user])

  const onFinish: Callbacks['onFinish'] = (values) => {
    const data = {
      id: user.id,
      name: values.name,
      nickname: values.nickname,
      phone: values.phone,
      birth: values.birth.format('YYYY-MM-DD'),
      sex: values.sex,
      address_zonecode: values.address.zonecode,
      address_fulladdress: values.address.fulladdress,
      address_detailaddress: values.address.detailaddress,
      account_bank: values.account_bank,
      account_num: values.account_num,
      profile_image: image,
      profile: values.profile,
    }
    axios.post(baseUrl+'/api/users/designer/register', data).then( () => {
      Router.push({
        pathname: '/',
        query: { auth: 'register' }
      })
    })
  }

  const onFinishFailed = (values: any) => {
    console.log(values)
  }

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
    form.setFieldsValue({
      address: {
        zonecode: zonecode,
        fulladdress: fulladdress
      } 
    })
  }

  const handleThumnail = (fileList: UploadFile<any>[]) => {
    setImage(fileList[0].url ? fileList[0].url : '')
  }

  return (
    <div className='designer_register'>
      <Form
        form={form}
        name='user-description'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          email: user.email,
          name: user.name,
          nickname: user.nickname,
          phone: user.phone,
          sex: String(user.sex),
          birth: moment(user.birth),
          address: {
            zonecode: user.address_zonecode,
            fulladdress: user.address_fulladdress,
            detailaddress: user.address_detailaddress
          }
        }}
      >
      <div className='register-submmit'>
      <Row justify='center' align='top' gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Form.Item
              name='profile_image'
            >
              <div className='upload-image-wrapper'>
                <UploadWrapper handleThumnail={handleThumnail} direction='vertical'/>
              </div>
            </Form.Item>
          </Col>
          <Col xs={24} md={16}>
            <Form.Item {...itemLayout} name='email' label='이메일'>
              <Input disabled/>
            </Form.Item>
            <Form.Item
              {...itemLayout}
              label='이름'
              required={false}
              name='name'
              rules={[{ required: true, message: '이름을 입력하세요!' },]}
            >
              <Input placeholder='이름'/>
            </Form.Item>
            <Form.Item
              {...itemLayout}
              label='닉네임'
              required={false}
              name='nickname'
              rules={[{ required: true, message: '닉네임을 입력하세요!' },]}
            >
              <Input placeholder='닉네임'/>
            </Form.Item>
            <Form.Item
              {...itemLayout}
              label='전화번호'
              required={false}
              name='phone'
              rules={[{ required: true, message: '전화번호를 입력하세요!' }]}
            >
              <Input placeholder='01012345678'/>
            </Form.Item>
            <Form.Item
              {...itemLayout}
              label='성별'
              required={false}
              name='sex'
              rules={[{ required: true, message: '성별을 선택하세요!' }]}
            >
              <Radio.Group buttonStyle='solid'>
                <Radio.Button className='man' value='1'>남</Radio.Button>
                <Radio.Button className='woman' value='2'>여</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              {...itemLayout}
              label='생년월일'
              required={false}
              name='birth'
              rules={[{ required: true, message: '생년월일을 선택하세요!' }]}
            >
              <DatePicker
                placeholder='생년월일'
                disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item {...itemLayout} label='주소'>
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
              {...itemLayout}
              label='은행명'
              name='account_bank'
              rules={[{ required: true, message: '은행명을 입력하세요!' }]}
            >
              <Input placeholder='은행명'/>
            </Form.Item>
            <Form.Item
              {...itemLayout}
              label='계좌번호'
              name='account_num'
              rules={[{ required: true, message: '계좌번호를 입력하세요!' }]}
            >
              <Input placeholder='계좌번호'/>
            </Form.Item>
            <Form.Item
              {...itemLayout}
              label='자기소개'
              name='profile'
              className='designer-profile'
              rules={[{ required: true, message: '자기소개를 입력하세요!' }]}
            >
              <Input.TextArea autoSize={{minRows: 5}} placeholder='자기 소개를 최대 100자 이내로 작성 부탁드립니다.' />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div className='register-explain'>
        <div><span>앞으로 판매하시는 계획표는 지역별로 트래비(TraB) 홈페이지에 업로드 될 예정입니다.</span></div>
        <div><span>업로드 되는 계획표는 트래비(TraB)에서 컨설팅 용도로 사용 가능하다는 점을 밝힙니다.</span></div>
        <div><span>판매하신 계획표는 검수과정을 거쳐 매월 15일, 마지막 일에 한번에 정산하여 입금해 드립니다.</span></div>
        <div><span>입력하신 개인 정보는 트래비(TraB)에서 직접 관리합니다.</span></div>
        <div><span>개인정보 이용 동의를 확인하시고 체크해 주시면 감사드리겠습니다.</span></div>
        <div style={{marginTop: 24}}>
          <Form.Item
            name='caution'
            valuePropName='checked'
            rules={[{
              validator: (_rule, value) => {
                if(value) {
                  return Promise.resolve();
                }
                return Promise.reject('개인정보 이용 동의를 하지 않으면 이용할 수 없습니다.')
              }
            }]}
          >
            <Checkbox><a target='_blank' href='/Trab_personal_information.html'>개인정보 이용 동의서</a></Checkbox>
          </Form.Item>
        </div>
      </div>
      <div className='register-button-wrapper'>
        <Form.Item>
          <Button htmlType='submit' className='ok-button'>신청하기</Button>
          <Button className='cancel-button'>취소</Button>
        </Form.Item>
      </div>
      </Form>
    </div>
  )
}

Designer_Register.getInitialProps = async () => {
  return {
    
  }
}

export default Designer_Register