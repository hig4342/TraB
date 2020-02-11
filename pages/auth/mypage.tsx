import * as React from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { NextPage } from 'next'
import { Planner } from 'type'
import { Row, Col, Button, Input, Form, DatePicker, Radio, Modal } from 'antd'
import moment from 'moment'
import AddressFinder from '@components/AddressFinder'
import UploadWrapper from '@components/UploadWrapper'
import MypagePlanner from '@components/MypagePlanner'
import useUser from '@hooks/useUser'
import { User } from '@reducers/userReducer'
import { UploadFile } from 'antd/lib/upload/interface'
import { ColProps } from 'antd/lib/col'
import '@assets/Mypage.less'

const MyPage: NextPage = ()=> {

  const {user, isLogin, onLogin} = useUser()
  const [changeable, setChangeable] = React.useState(true)
  const [visible, setVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [planners, setPlanners] = React.useState<Planner[]>([])
  
  React.useEffect(() => {
    if(isLogin) {
      form.setFieldsValue({
        name: user.name,
        nickname: user.nickname,
        phone: user.phone,
        sex: String(user.sex),
        birth: moment(user.birth),
        address: {
          zonecode: user.address_zonecode,
          fulladdress: user.address_fulladdress,
          detailaddress: user.address_detailaddress
        },
        account_bank: user.account_bank,
        account_num: user.account_num,
        profile_image: user.profile_image,
        profile: user.profile
      })
      axios.get(`/api/users/${user.id}/planners`).then( result => {
        const planner_data: Planner[] = result.data.Planners
        setPlanners(planner_data)
      })
    }
  }, [user])

  const okChangeable = () => {
    setChangeable(false)
  }

  const cancelChangeable = () => {
    setChangeable(true)
    if(user){
      form.setFieldsValue({
        name: user.name,
        nickname: user.nickname,
        phone: user.phone,
        sex: String(user.sex),
        birth: moment(user.birth),
        address: {
          zonecode: user.address_zonecode,
          fulladdress: user.address_fulladdress,
          detailaddress: user.address_detailaddress
        },
        account_bank: user.account_bank,
        account_num: user.account_num,
        profile_image: user.profile_image,
        profile: user.profile
      })
    }
  }

  const changeInformation = (values: any) => {
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
      profile_image: values.profile_image,
      profile: values.profile
    }
    axios.post('/api/auth/edit', data).then( result => {
      const usertoken = result.data
      sessionStorage.setItem('usertoken', usertoken)
      const user: User = jwtDecode(usertoken)
      onLogin(user)
      setChangeable(true)
      form.setFieldsValue({
        name: user.name,
        nickname: user.nickname,
        phone: user.phone,
        sex: String(user.sex),
        birth: moment(user.birth),
        address: {
          zonecode: user.address_zonecode,
          fulladdress: user.address_fulladdress,
          detailaddress: user.address_detailaddress
        },
        account_bank: user.account_bank,
        account_num: user.account_num,
        profile_image: user.profile_image,
        profile: user.profile
      })
    })
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

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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

  const handleThumnail = (fileList: UploadFile<any>[]) => {
    form.setFieldsValue({
      profile_image: fileList[0].url ? fileList[0].url : ''
    })
  }

  return (
    <div className='mypage-wrapper' style={{width: '100%'}}>
    { isLogin ?
      <div className='mypage' style={{width: '100%'}}>
        <Form
          form={form}
          name='user-description'
          onFinish={changeInformation}
          onFinishFailed={onFinishFailed}
          initialValues={{
            name: user.name,
            nickname: user.nickname,
            phone: user.phone,
            sex: String(user.sex),
            birth: moment(user.birth),
            address: {
              zonecode: user.address_zonecode,
              fulladdress: user.address_fulladdress,
              detailaddress: user.address_detailaddress
            },
            account_bank: user.account_bank,
            account_num: user.account_num,
            profile_image: user.profile_image,
            profile: user.profile
          }}
        >
          <Row justify='center' align='top' gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                name='profile_image'
              >
                <div className='profile-image-wrapper'> 
                  <UploadWrapper handleThumnail={handleThumnail} defaultUrl={user.profile_image} direction='vertical' disabled={changeable}/>
                </div>
              </Form.Item>
            </Col>
            <Col xs={24} md={16}>
              <Form.Item {...itemLayout} label='이메일'>
                <Input disabled value={user.email}/>
              </Form.Item>
              <Form.Item
                {...itemLayout}
                label='이름'
                required={false}
                name='name'
                rules={[{ required: true, message: '이름을 입력하세요!' },]}
              >
                <Input disabled={changeable} placeholder='이름'/>
              </Form.Item>
              <Form.Item
                {...itemLayout}
                label='닉네임'
                required={false}
                name='nickname'
                rules={[{ required: true, message: '닉네임을 입력하세요!' },]}
              >
                <Input disabled={changeable} placeholder='닉네임'/>
              </Form.Item>
              <Form.Item
                {...itemLayout}
                label='전화번호'
                required={false}
                name='phone'
                rules={[{ required: true, message: '전화번호를 입력하세요!' }]}
              >
                <Input disabled={changeable} placeholder='01012345678'/>
              </Form.Item>
              <Form.Item
                {...itemLayout}
                label='성별'
                required={false}
                name='sex'
                rules={[{ required: true, message: '성별을 선택하세요!' }]}
              >
                <Radio.Group disabled={changeable} buttonStyle='solid'>
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
                  disabled={changeable}
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
                    <Input disabled={changeable} placeholder='우편번호' style={{width: '20%'}}/>
                  </Form.Item>
                  <Form.Item noStyle>
                    <Button disabled={changeable} onClick={handleOk}>우편번호 찾기</Button>
                  </Form.Item>
                  <Form.Item
                    name={['address', 'fulladdress']}
                    noStyle
                    rules={[{ required: true, message: '주소를 입력하세요!' }]}
                  >
                    <Input disabled={changeable} placeholder='주소'/>
                  </Form.Item>
                  <Form.Item
                    name={['address', 'detailaddress']}
                    noStyle
                    rules={[{ required: true, message: '상세주소를 입력하세요!' }]}
                  >
                    <Input disabled={changeable} placeholder='상세주소'/>
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
              { user.state_id === 4 ?
                <>
                <Form.Item
                  {...itemLayout}
                  label='은행'
                  required={false}
                  name='account_bank'
                  rules={[{ required: true, message: '은행명을 입력하세요!' }]}
                >
                  <Input disabled={changeable} placeholder='은행명'/>
                </Form.Item>
                <Form.Item
                  {...itemLayout}
                  label='계좌번호'
                  required={false}
                  name='account_num'
                  rules={[{ required: true, message: '계좌번호를 입력하세요!' }]}
                >
                  <Input disabled={changeable} placeholder='계좌번호'/>
                </Form.Item>
                <Form.Item
                  {...itemLayout}
                  label='자기소개'
                  name='profile'
                >
                  <Input.TextArea disabled={changeable} placeholder='자기소개'/>
                </Form.Item>
                </>
                : null
              }
              <Form.Item label='설계자 등록여부'>
                <div>{user.state_id < 4 ? '미등록' : '등록완료'}</div>
              </Form.Item>
              <Form.Item>
                <Button style={{ display: changeable ? 'none' : 'inline-block'}} htmlType='submit'>완료</Button>
                <Button style={{ display: changeable ? 'inline-block' : 'none'}} onClick={okChangeable}>개인정보 수정하기</Button>
                <Button onClick={cancelChangeable}>취소</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        { user.state_id >= 4 ? <MypagePlanner planners={planners}/> : 
          <div className='experience'>
            <h1 className='small-title'>설계자로 등록하고 본인만의 계획표를 판매해보세요</h1>
            <Row justify="center">
              <Col xs={24} md={12}>
                <div className='write-planner'><img src='/write-planner.jpg' /></div>
              </Col>
              <Col xs={24} md={12}>
                <div className='selling-information'>
                  <div><span>여러분이 경험했던 귀중한 추억을 다른 이들과 공유해보세요!</span></div>
                  <div><span>계획표는 <strong>1일치</strong> 기준으로 작성해서 <strong>개당 2,500원</strong>에 판매하세요!</span></div>
                  <div><span>판매 전, 설계자 등록은 필수!</span></div>
                  <div><span>본인이 정한 계좌로 <strong>매월 15일</strong>, <strong>마지막일</strong>에 정산하여 입금됩니다!</span></div>
                  <div><span>철저한 계획표 검수 과정은 필수라는 사실, 알고 계시죠?</span></div>
                  <div><span>오로지 여행 명소와 관련된 내용으로 만들어주셔야 하는 점, 잊지마세요!!</span></div>
                </div>
              </Col>
              <Col style={{textAlign: 'center'}} span={24}>
                <Button className='ok-button'>설계자 등록하기</Button>
              </Col>
            </Row>
          </div>
        }
      </div>
      : null
    }
    </div>
  )
}

MyPage.getInitialProps = async () => {
  return {
    
  }
}

export default MyPage