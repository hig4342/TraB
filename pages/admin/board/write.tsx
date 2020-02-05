import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import Router from 'next/router';
import { Callbacks } from 'rc-field-form/lib/interface';
import { Form, Input, Button, message, Upload, DatePicker, Radio, Modal, Checkbox } from 'antd'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'

import dynamic from 'next/dynamic'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { RadioChangeEvent } from 'antd/lib/radio';
import useUser from '@hooks/useUser';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

const EditorWrapper = dynamic(
  () => import('@components/EditorWrapper'),
  { ssr: false }
)

const AdminWrite: NextPage = ()=> {

  const [form] = Form.useForm()
  const { user } = useUser()
  const [bannerImage, setBannerImage] = React.useState('')
  const [mainImage, setMainImage] = React.useState('')
  const [content, setContent] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [state, setState] = React.useState(false)

  const onFinish = () => {
    const data = {
      UserId: user.id,
      title: form.getFieldValue('title'),
      board_state: form.getFieldValue('board_state'),
      content: content,
      banner_image: bannerImage,
      main_image: mainImage,
      ad_link: form.getFieldValue('ad_link'),
      ad_deadline: form.getFieldValue('ad_deadline'),
      ad_region: form.getFieldValue('ad_region'),
      visible: form.getFieldValue('visible')
    }
    axios.post(baseUrl+'/api/admin/boards', data).then( result => {
      console.log(result)
      Router.push('/admin')
    })
  };

  const onFinishFailed: Callbacks['onFinishFailed'] = (errorInfo) => {
    errorInfo.errorFields.forEach(error => {
      message.error(error.errors)
    })
  };

  const handleState = (e: RadioChangeEvent) => {
    setState(e.target.value === 2)
    form.setFieldsValue({
      ad_link: '',
      ad_deadline: ''
    })
  }

  const handleMainImage = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.response) {
      setMainImage(info.file.response)
    }
  }

  const handleBannerImage = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.response) {
      setBannerImage(info.file.response)
    }
  }

  const handleContent = (text: string) => {
    setContent(text)
  }

  const handleShow = () => {
    setVisible(true)
  }

  const handleHide = () => {
    setVisible(false)
  }

  const disabledDate = (current: moment.Moment) => {
    return current <= moment();
  }

  return (
    <div className='write' style={{width: '100%'}}>
      <div>
        <h1>관리자 글쓰기</h1>
      </div>
      <Form
        form={form}
        layout='horizontal'
        onFinishFailed={onFinishFailed}
        initialValues={{
          board_state: 1,
          ad_region: 1,
          visible: true
        }}
      >
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
        <Form.Item name='visible' label='공개여부' valuePropName='checked'>
          <Checkbox />
        </Form.Item>
        <Form.Item name='board_state' label='공지사항/광고'>
          <Radio.Group onChange={handleState} buttonStyle="solid">
            <Radio.Button value={1}>공지사항</Radio.Button>
            <Radio.Button value={2}>광고</Radio.Button>
          </Radio.Group>
        </Form.Item>
        { state ?
          <>
            <Form.Item name='ad_link' label='광고URL'>
              <Input />
            </Form.Item>
            <Form.Item name='ad_deadline' label='광고기한'>
              <DatePicker
                placeholder='광고기한'
                disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item name='ad_region' label='지역선택'>
              <Radio.Group>
                <Radio.Button value={1}>전체</Radio.Button>
                <Radio.Button value={2}>한국</Radio.Button>
                <Radio.Button value={3}>외국</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </>
          : null
        }
        <Form.Item labelCol={{span: 24}} wrapperCol={{span: 24}} label='배너이미지'>
          <Upload.Dragger
            name='image'
            multiple={false}
            action='/api/file/upload'
            onChange={handleBannerImage}
          >
           { bannerImage !== '' ? <img style={{width: '100%', height: 270}} src={bannerImage}/> : null }
          </Upload.Dragger>
        </Form.Item>
        <Form.Item labelCol={{span: 24}} wrapperCol={{span: 24}} label='메인이미지'>
          <Upload.Dragger
            name='image'
            multiple={false}
            action='/api/file/upload'
            onChange={handleMainImage}
          >
            { mainImage !== '' ? <img style={{width: '100%'}} src={mainImage}/> : null }
          </Upload.Dragger>
        </Form.Item>
        <Form.Item
          name='contents'
          rules={[{ required: true, message: '내용을 입력하세요!' },]}
        >
          <EditorWrapper handleContents={handleContent}/>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleShow}>작성하기</Button>
          <Link href='/admin'><Button>작성취소</Button></Link>
          <Modal
            title='눌렀을때 미리보기 화면입니다.'
            centered
            width={1080}
            visible={visible}
            onOk={onFinish}
            onCancel={handleHide}
          >
            <img style={{width: '100%', marginBottom: '3rem'}} src={mainImage}/>
            <div style={{width: '100%'}}>{ReactHtmlParser(content)}</div>
          </Modal>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AdminWrite