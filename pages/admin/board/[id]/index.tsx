import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Board } from 'type'
import { Upload, Form, Input, message, Button, Modal, DatePicker, Radio, Checkbox } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import EditorWrapper from '@components/EditorWrapper'
import { Callbacks } from 'rc-field-form/lib/interface';
import Link from 'next/link'
import Router from 'next/router'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  post: Board
}

const AdminPost: NextPage<Props> = ({post})=> {

  const [form] = Form.useForm()
  const [bannerImage, setBannerImage] = React.useState(post.banner_image)
  const [mainImage, setMainImage] = React.useState(post.main_image)
  const [content, setContent] = React.useState(post.content)
  const [visible, setVisible] = React.useState(false)

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

  const handleDelete = () => {
    axios.delete(baseUrl + `/api/admin/boards/${post.id}`).then( () => {
      Router.push(`/admin/board/${post.board_state === 1 ? 'notice' : 'advertise'}`)
    })
  }

  const disabledDate = (current: moment.Moment) => {
    return current <= moment();
  }

  const onFinish  = () => {
    const data = {
      title: form.getFieldValue('title'),
      ad_link: form.getFieldValue('ad_link'),
      banner_image: bannerImage,
      main_image: mainImage,
      content: content,
      ad_deadline: form.getFieldValue('ad_deadline'),
      ad_region: form.getFieldValue('ad_region'),
      visible: form.getFieldValue('visible'),
    }
    axios.put(baseUrl + `/api/admin/boards/${post.id}`, data).then( result => {
      console.log(result)
      setVisible(false)
      Router.push('/admin')
    })
  }

  const onFinishFailed: Callbacks['onFinishFailed'] = (err) => {
    err.errorFields.forEach(error => {
      message.error(error.errors)
    })
  }
  return (
    <div className='admin-post' style={{width: '100%'}}>
      <Form
        form={form}
        onFinishFailed={onFinishFailed}
        initialValues={{
          title: post.title,
          ad_link: post.ad_link,
          ad_deadline: moment(post.ad_deadline),
          banner_image: bannerImage,
          main_image: mainImage,
          content: content,
          ad_region: post.ad_region,
          visible: post.visible,
        }}
      >
        <Form.Item name='title' label='제목'>
          <Input />
        </Form.Item>
        <Form.Item name='visible' label='공개여부' valuePropName='checked'>
          <Checkbox />
        </Form.Item>
        <Form.Item label='종류'>
          <span>{post.board_state === 1 ? '공지사항' : '광고'}</span>
        </Form.Item>
        { post.board_state === 2 ?
          <>
            <Form.Item name='ad_link' label='광고URL'>
              <Input />
            </Form.Item>
            <Form.Item name='ad_deadline' label='광고기한'>
            <DatePicker
              disabledDate={disabledDate}
              placeholder='광고기한'
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
           <img style={{width: '100%', height: 270}} src={bannerImage}/>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item labelCol={{span: 24}} wrapperCol={{span: 24}} label='메인이미지'>
          <Upload.Dragger
            name='image'
            multiple={false}
            action='/api/file/upload'
            onChange={handleMainImage}
          >
           <img style={{width: '100%'}} src={mainImage}/>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item labelCol={{span: 24}} wrapperCol={{span: 24}} name='content' label='내용'>
          <EditorWrapper handleContents={handleContent} defaultContent={post.content}/>
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={handleShow}>수정하기</Button>
          <Button type='danger' onClick={handleDelete}>삭제하기</Button>
          <Link href='/admin'><Button>취소하기</Button></Link>
          <Modal
            title='눌렀을때 미리보기 화면입니다.'
            centered
            width={1080}
            visible={visible}
            onOk={onFinish}
            onCancel={handleHide}
          >
            <img style={{width: '100%'}} src={mainImage}/>
            <div style={{width: '100%'}}>{ReactHtmlParser(content)}</div>
          </Modal>
        </Form.Item>
      </Form>
    </div>
  )
}

AdminPost.getInitialProps = async (req) => {
  const id = req.query.id
  const post = await axios.get(baseUrl + `/api/admin/boards/${id}`)
  return {
    post: post.data
  }
}

export default AdminPost