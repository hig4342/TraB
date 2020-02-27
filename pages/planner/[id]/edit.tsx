import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Planner, Theme } from 'type'
import { Callbacks } from 'rc-field-form/lib/interface';
import { Form, Button, Input, Checkbox } from 'antd'
import EditorWrapper from '@components/EditorWrapper'
import UploadWrapper from '@components/UploadWrapper'
import useUser from '@hooks/useUser'
import Link from 'next/link'
import Router from 'next/router';
import { UploadFile } from 'antd/lib/upload/interface';
import '@assets/EditPlanner.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  planner: Planner
  themes: Theme[];
}

const EditPlanner: NextPage<Props> = ({ planner, themes })=> {
  
  const [form] = Form.useForm()
  const {user, isLogin} = useUser()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    console.log(planner.upload_state)
    if(planner.upload_state !== 1 ) {
      Router.push('/')
    }
    if(!isLogin) {
      Router.push('/')
    } else {
      if( user.id != planner.User.id ) {
        Router.push('/')
      }
    }
  }, [user])

  const onFinish: Callbacks['onFinish'] = (values) => {
    setLoading(true)
    const country_name = values.country === '대한민국' ? '한국' : values.country
    const formdata = {
      title: values.title,
      country_name: country_name,
      city_name: values.city,
      thumbnail: values.thumbnail,
      contents: values.contents,
      themes_id: values.themes_id,
    }
    axios.put(baseUrl + `/api/planners/${planner.id}`, formdata).then( () => {
      setLoading(false)
      Router.push(`/planner/${planner.Country.country_name === '한국' ? 'domestic' : 'foreign'}`)
    }).catch( err => {
      console.log(err)
    })
  };

  const handleThumnail = (fileList: UploadFile<any>[]) => {
    form.setFieldsValue({
      thumbnail: fileList[0].url
    })
  }

  const handleContents = (text: string) => {
    form.setFieldsValue({
      contents: text
    })
  }

  return (
    <div className='edit-post' style={{width: '100%'}}>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          title: planner.title,
          country: planner.Country.country_name,
          city: planner.City.city_name,
          themes_id: planner.themes_id,
          thumbnail: planner.thumbnail,
          contents: planner.contents
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
            options={themes.filter(theme => (theme.name !== 'P(편)한 계획표' && theme.name !== 'ITP 여행계획표')).map(theme => ({ label: theme.name, value: theme.id }))}
          />
        </Form.Item>
        <Form.Item
          label='대표 사진'
          name='thumbnail'
          className='thumbnail-wrapper'
          required={false}
          rules={[{ required: true, message: '썸네일에 들어갈 사진을 업로드해주세요.' },]}
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
          <EditorWrapper handleContents={handleContents} defaultContent={planner.contents}/>
        </Form.Item>
        <Form.Item>
          <div className='button-wrapper'>
            <Button loading={loading} className='ok-button' htmlType='submit'>수정하기</Button>
            <Link href='/'><Button className='cancel-button'>수정취소</Button></Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

EditPlanner.getInitialProps = async (req) => {
  const id = req.query.id

  const planner = await axios.get(baseUrl + `/api/planners/${id}`)
  const theme = await axios.get(baseUrl+'/api/themes')
  return {
    planner: planner.data,
    themes: theme.data
  }
}

export default EditPlanner