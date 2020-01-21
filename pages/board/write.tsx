import * as React from 'react'
import _axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { Callbacks } from 'rc-field-form/lib/interface';
import { Form, Input, Button, message } from 'antd'
//import EditorWrapper from '@components/EditorWrapper'

import dynamic from 'next/dynamic'
const EditorWrapper = dynamic(
  () => import('@components/EditorWrapper'),
  { ssr: false }
)

const Write: NextPage = ()=> {
  const [form] = Form.useForm()

  const onFinish: Callbacks['onFinish'] = (values) => {
    console.log(values);
  };

  const onFinishFailed: Callbacks['onFinishFailed'] = (errorInfo) => {
    message.error('입력에 오류가 있습니다.')
    console.log('Failed:', errorInfo);
  };

  const handleContent = (content: string) => {
    form.setFieldsValue({
      content: content
    })
  }

  return (
    <div className='write' style={{width: '100%'}}>
      <div>
        <h1>트래비(TraB) 게시판 글쓰기</h1>
        <p>트래비(TraB) 팀에게 건의하실 사항이나, 공유하고 싶은 정보들을 자유롭게 게시 해 주시길 바랍니다!!</p>
      </div>
      <Form
        form={form}
        layout='horizontal'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          name='content'
          rules={[{ required: true, message: '내용을 입력하세요!' },]}
        >
          <EditorWrapper index={0} handleContent={handleContent}/>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>작성하기</Button>
          <Link href='/board'><Button>작성취소</Button></Link>
        </Form.Item>
      </Form>
    </div>
  )
}

Write.getInitialProps = async () => {
  return {
    
  }
}

export default Write