import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Router from 'next/router'
import Link from 'next/link'
import jwtDecode from 'jwt-decode'
import { Callbacks } from 'rc-field-form/lib/interface';
import { Form, Input, Button, Checkbox, message } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import UploadWrapper from '@components/UploadWrapper'
import '@assets/PlannerWrite.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

import dynamic from 'next/dynamic'
const EditorWrapper = dynamic(
  () => import('@components/EditorWrapper'),//import EditorWrapper from '@components/EditorWrapper'
  { ssr: false }
)

let maxkey = 1;

const PlannerWrite: NextPage = ()=> {
  const [form] = Form.useForm()
  const [keylist, setKeylist] = React.useState<number[]>([0])
  const [imagelist, setImagelist] = React.useState<string[]>([])
  const [contentlist, setContentlist] = React.useState<string[]>([])
  const [user, setUser] = React.useState<any>({id: 1})

  React.useEffect(() => {
    const token = sessionStorage.getItem('usertoken')
    if(token) setUser(jwtDecode(token))
  }, [])


  const onFinish: Callbacks['onFinish'] = (values) => {
    const country_name = values.country === '대한민국' ? '한국' : values.country
    const formdata = {
      title: values.title,
      UserId: user.id,
      country_name: country_name,
      city_name: values.city,
      contents_image: imagelist.filter((_value, index) => (keylist.includes(index))),
      contents_text: contentlist.filter((_value, index) => (keylist.includes(index))),
      themes_id: []
    }
    console.log(formdata)
    axios.post(baseUrl + '/api/planners', formdata).then( result => {
      console.log(result)
      Router.push('/')
    }).catch( err => {
      console.log('????')
      console.log(err)
    })
  };

  const onFinishFailed: Callbacks['onFinishFailed'] = (errorInfo) => {
    errorInfo.errorFields.forEach(error => {
      message.error(error.errors)
    })
    console.log('Failed:', errorInfo);
  };

  const handleContent = (e: string, index: number) => {
    let contents = contentlist
    contents[index] = e
    setContentlist(contents)
    console.log(contentlist)
  }

  const handleImage = (e: string, index: number) => {
    let images = imagelist
    images[index] = e
    setImagelist(images)
    console.log(imagelist)
  }

  const handleAdd = () => {
    let keys = keylist.concat(maxkey++)
    setKeylist(keys)
  }

  const handleRemove = (index: number) => {
    if (keylist.length == 1) {
      message.warn('최소 1개의 사진은 올려야 합니다!')
      return;
    }
    const keys = keylist.filter(key => key != index)
    setKeylist(keys)
  }

  const formItems = keylist.map((key) => (
    <Form.Item
      key={`keys-${key}`}
    >
      <Form.Item
        name={`images[${key}]`}
        key={`images-${key}`}
        validateTrigger={['onChange', 'onBlur']}
      >
        <div className='upload-image-wrapper'>
          <UploadWrapper index={key} handleImage={handleImage}/>
        </div>
      </Form.Item>
      <Form.Item
        name={`contents[${key}]`}
        key={`contents-${key}`}
        validateTrigger={['onChange', 'onBlur']}
      >
        <EditorWrapper height={250} index={key} handleContent={handleContent}/>
      </Form.Item>
      <Form.Item>
        <Button type='danger' onClick={() => handleRemove(key)}><MinusOutlined />지우기</Button>
      </Form.Item>
    </Form.Item>
  ))

  return (
    <div className='planner-write' style={{width: '100%'}}>
      <div>
        <h1 className='big-title'>계획표 작성하기</h1>
        <div>
          <h2>유의사항 1</h2>
          <p>밑의 계획표 양식은 1일치를 위한 것입니다.</p>
          <p>즉, 2일치 작성을 원하시면 두번 작성하셔서 등록해 주셔야 하는 부분을 유의하시길 바랍니다.</p>
        </div>
        <div>
          <h2>유의사항 2</h2>
          <p>여행지에 관련된 내용만을 계획표로 인정하여 정산합니다.</p>
          <p>즉, 여행지와 관련 없는 내용, 비행기를 탔다, 내렸다, 숙소에 도착했다 등의 내용은 계획표로 인정하지 않습니다.</p>
        </div>
        <div>
          <h2>유의사항 3</h2>
          <p>
            계획표에 사용하시는 사진은 가급적 본인이 직접 찍은 사진, 혹은 상업적으로 이용이 가능한 사진에 한하여 사용 부탁드립니다.
            후에 사진 저작권으로 문제가 발생할 시 트래비(TraB)의 책임은 전혀 없음을 알려드리며,
            모든 문제는 계획표 제작자가 책임 지셔야 하는 점을 알립니다.
          </p>
        </div>
      </div>
      <Form
        form={form}
        layout='horizontal'
        onChange={(e) => console.log(e.target)}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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
          <Checkbox><a style={{ fontSize: 16}}>유의사항을 확인하였습니다.</a></Checkbox>
        </Form.Item>
        <Form.Item
          label='제목'
          name='title'
          required={false}
          rules={[{ required: true, message: '제목을 입력하세요!' },]}
          labelCol={{xs: 2, sm: 1}}
          wrapperCol={{xs: 22, sm: 23}}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='나라'
          name='country'
          required={false}
          rules={[{ required: true, message: '나라를 입력하세요!' },]}
          labelCol={{xs: 2, sm: 1}}
          wrapperCol={{xs: 22, sm: 23}}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='도시'
          name='city'
          required={false}
          rules={[{ required: true, message: '도시를 입력하세요!' },]}
          labelCol={{xs: 2, sm: 1}}
          wrapperCol={{xs: 22, sm: 23}}
        >
          <Input />
        </Form.Item>
        {formItems}
        <Form.Item style={{ textAlign: 'center' }}>
          <Button className='add-button' onClick={handleAdd} type='dashed'><PlusOutlined />내용 추가하기</Button>
        </Form.Item>
        <Form.Item>
          <div className='button-wrapper'>
            <Button className='ok-button' htmlType='submit'>작성하기</Button>
            <Link href='/'><Button className='cancel-button'>작성취소</Button></Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

PlannerWrite.getInitialProps = async () => {
  return {
    
  }
}

export default PlannerWrite