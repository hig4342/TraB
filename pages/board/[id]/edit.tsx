import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Board } from 'type'
import { Callbacks } from 'rc-field-form/lib/interface';
import { Form, Button, Input } from 'antd'
import EditorWrapper from '@components/EditorWrapper'
import Link from 'next/link'
import Router from 'next/router';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  post: Board
}

const EditPost: NextPage<Props> = ({post})=> {
  
  const [form] = Form.useForm()

  const onFinish: Callbacks['onFinish'] = (values) => {
    const data = {
      title: values.title,
      content: values.content
    }
    axios.put(baseUrl+`/api/boards/${post.id}`, data).then( () => {
      Router.push('/board')
    })
  };

  const handleContents = (text: string) => {
    form.setFieldsValue({
      content: text
    })
  }

  return (
    <div className='edit-post' style={{width: '100%'}}>
      <Form
        form={form}
        layout='horizontal'
        onFinish={onFinish}
        initialValues={{
          title: post.title,
          content: post.content
        }}
      >
        <Form.Item
          label='제목'
          name='title'
          required={false}
          rules={[{ required: true, message: '제목을 입력하세요!' },]}
          labelCol={{xs: 24, sm: 1}}
          wrapperCol={{xs: 24, sm: 23}}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='content'
          rules={[{ required: true, message: '내용을 입력하세요!' },]}
        >
          <EditorWrapper handleContents={handleContents} defaultContent={post.content}/>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>수정하기</Button>
          <Link href='/board'><Button>수정취소</Button></Link>
        </Form.Item>
      </Form>
    </div>
  )
}

EditPost.getInitialProps = async (req) => {
  const id = req.query.id

  const post = await axios.get(baseUrl + `/api/boards/${id}`)
  return {
    post: post.data
  }
}

export default EditPost