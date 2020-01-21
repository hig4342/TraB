import * as React from 'react'
import axios from 'axios'
import { Form, Input, Checkbox, Button } from 'antd'
import { Planner, Theme } from 'type'
import Router from 'next/router'
import UploadWrapper from '@components/UploadWrapper'
import '@assets/AdminPlannerContent.less'

import dynamic from 'next/dynamic'
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
  const [imagelist, setImagelist] = React.useState<string[]>(planner.contents_image)
  const [contentlist, setContentlist] = React.useState<string[]>(planner.contents_text)

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
  
  const onFinish = (value: any) => {
    console.log(value)
    const form = {
      id: planner.id,
      title: value.title,
      country_name: value.country,
      city_name: value.city,
      contents_image: value.images,
      contents_text: value.contents,
      themes_id: value.thmes_id
    }
    axios.put('/api/admin/planners', form).then( result => {
      console.log(result)
      Router.push('/admin/planner')
    }).catch( err => {
      console.log(err)
    })
  }

  const onFinishFailed = (value: any) => {
    console.log(value)
  }

  const allowPlanner = () => {
    axios.patch('/api/admin/planners/allow', {id: planner.id, upload_state: 3}).then( result => {
      console.log(result)
      Router.push('/admin/planner')
    }).catch( err => {
      console.log(err)
    })
  }

  const changePremium = () => {
    axios.patch('/api/admin/planners/allow', {id: planner.id, upload_state: 4}).then( result => {
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
          images: planner.contents_image,
          contents: planner.contents_text
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
            options={themes.map(theme => ({ label: theme.name, value: theme.id }))}
          />
        </Form.Item>
        {
          planner.contents_image.map((image_url, index) => (
            <Form.Item
              key={`keys-${index}`}
            >
              <Form.Item
                name={`images[${index}]`}
                key={`images-${index}`}
                validateTrigger={['onChange', 'onBlur']}
              >
                <div className='upload-image-wrapper'>
                  <UploadWrapper defaultUrl={image_url} index={index} handleImage={handleImage}/>
                </div>
              </Form.Item>
              <Form.Item
                name={`contents[${index}]`}
                key={`contents-${index}`}
                validateTrigger={['onChange', 'onBlur']}
              >
                <EditorWrapper index={index} handleContent={handleContent} defaultContent={planner.contents_text[index]}/>
              </Form.Item>
            </Form.Item>
          ))
        }
        <Form.Item>
          <Button onClick={allowPlanner}>계획표 승인</Button>
          <Button onClick={changePremium}>편한계획표 변경</Button>
          <Button htmlType='submit'>수정하기</Button>
          <Button>취소</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AdminPlannerContent