import * as React from 'react'
import axios from 'axios'
import { Form, Input, Checkbox, Button } from 'antd'
import { Planner, Theme } from 'type'
import Router from 'next/router'
import UploadWrapper from '@components/UploadWrapper'
import '@assets/AdminPlannerContent.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

import dynamic from 'next/dynamic'
import { UploadFile } from 'antd/lib/upload/interface'
import Link from 'next/link'
const EditorWrapper = dynamic(
  () => import('@components/EditorWrapper'),//import EditorWrapper from '@components/EditorWrapper'
  { ssr: false }
)

type Props = {
  planner: Planner;
  themes: Theme[];
}

const AdminPlannerContent: React.SFC<Props> = ({planner, themes}) => {

  const [form] = Form.useForm()

  const handleThumnail = (fileList: UploadFile<any>[]) => {
    console.log(fileList)
    form.setFieldsValue({
      thumbnail: fileList[0].url
    })
  }

  const handleContents = (text: string) => {
    form.setFieldsValue({
      contents: text
    })
  }
  
  const onFinish = (value: any) => {
    const form = {
      title: value.title,
      country_name: value.country,
      city_name: value.city,
      thumbnail: value.thumbnail,
      contents: value.contents,
      themes_id: value.themes_id,
      blog_link: value.blog_link
    }
    axios.put(baseUrl + `/api/admin/planners/${planner.id}`, form).then( result => {
      console.log(result)
      Router.push('/admin/planner')
    }).catch( err => {
      console.log(err)
    })
  }

  const onFinishFailed = (value: any) => {
    console.log(value)
  }

  const deletePlanner = () => {
    axios.delete(baseUrl + `/api/admin/planners/${planner.id}`).then( result => {
      console.log(result)
      Router.push('/admin/planner')
    }).catch( err => {
      console.log(err)
    })
  }

  const rejectPlanner = () => {
    axios.patch(baseUrl + `/api/admin/planners/${planner.id}/state`, {upload_state: 2}).then( result => {
      console.log(result)
      Router.push('/admin/planner')
    }).catch( err => {
      console.log(err)
    })
  }

  const allowPlanner = () => {
    axios.patch(baseUrl + `/api/admin/planners/${planner.id}/state`, {upload_state: 3}).then( result => {
      console.log(result)
      Router.push('/admin/planner')
    }).catch( err => {
      console.log(err)
    })
  }

  const changePremium = () => {
    axios.patch(baseUrl + `/api/admin/planners/${planner.id}/state`, {upload_state: 4}).then( result => {
      console.log(result)
      Router.push('/admin/planner')
    }).catch( err => {
      console.log(err)
    })
  }

  const changeItp = () => {
    axios.patch(baseUrl + `/api/admin/planners/${planner.id}/state`, {upload_state: 5}).then( result => {
      console.log(result)
      Router.push('/admin/planner')
    }).catch( err => {
      console.log(err)
    })
  }

  return (
    <div className='planner'>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        initialValues={{
          title: planner.title,
          country: planner.Country.country_name,
          city: planner.City.city_name,
          themes_id: planner.themes_id,
          thumbnail: planner.thumbnail,
          contents: planner.contents,
          blog_link: planner.blog_link
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
        <Form.Item
          label='테마'
          name='themes_id'
          required={false}
          labelCol={{xs: 2, sm: 1}}
          wrapperCol={{xs: 22, sm: 23}}
        >
          <Checkbox.Group
            options={themes.sort((a, b) => (a.name === 'P(편)한 계획표' || a.name === 'ITP 여행계획표' ? 1 : b.name === 'P(편)한 계획표' || b.name === 'ITP 여행계획표' ? -1 : 0)).map(theme => ({ label: theme.name, value: theme.id }))}
          />
        </Form.Item>
        {
          planner.upload_state === 5 ? 
          <Form.Item>
            <Form.Item
              label='블로그주소'
              name='blog_link'
              labelCol={{xs: 2, sm: 2}}
              wrapperCol={{xs: 22, sm: 22}}
            >
              <Input placeholder='블로그주소'/>
            </Form.Item>
          </Form.Item>
          : null
        }
        <Form.Item
          label='대표 사진'
          name='thumbnail'
          required={false}
          rules={[{ required: true, message: '썸네일에 들어갈 사진을 업로드해주세요.' },]}
          labelCol={{xs: 3, sm: 2}}
          wrapperCol={{xs: 21, sm: 6}}
        >
          <UploadWrapper handleThumnail={handleThumnail} defaultUrl={planner.thumbnail}/>  
        </Form.Item>
        <Form.Item
          name='contents'
          required={false}
          rules={[{ required: true, message: '계획표를 써주세요' },]}
          wrapperCol={{span: 24}}
        >
          { planner.upload_state === 4 || planner.upload_state === 5 ? 
            <EditorWrapper handleContents={handleContents} defaultContent={planner.contents} hyperlink/>
            : <EditorWrapper handleContents={handleContents} defaultContent={planner.contents} />
          }
        </Form.Item>
        <Form.Item>
          <div className='button-wrapper'>
            <Button type='primary' onClick={allowPlanner}>계획표 승인</Button>
            <Button type='danger' onClick={deletePlanner}>계획표 삭제</Button>
          </div>
          <div className='button-wrapper'>
            <Button type='danger' shape='round' onClick={rejectPlanner}>계획표 거부</Button>
            <Button className='premium' shape='round' onClick={changePremium}>편한계획표 변경</Button>
            <Button className='itp' shape='round' onClick={changeItp}>ITP 변경</Button>
          </div>
          <div className='button-wrapper'>
            <Button type='primary' htmlType='submit'>수정하기</Button>
            <Link href='/admin/planner'><Button>취소</Button></Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AdminPlannerContent