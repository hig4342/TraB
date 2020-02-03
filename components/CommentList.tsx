import * as React from 'react'
import { Comment, List, Avatar, Rate, Button } from 'antd'
import { Reply } from 'type'
import Link from 'next/link'
import axios from 'axios'
import useUser from '@hooks/useUser';
import { Callbacks } from 'rc-field-form/lib/interface';
import TextArea from 'antd/lib/input/TextArea'
import '@assets/CommentList.less'
import { Form } from 'antd'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  PlannerId: number;
  comments: Reply[];
}

const CommentList: React.SFC<Props> = ({PlannerId, comments})=> {

  const [reply, setReply] = React.useState(comments)
  const { user, isLogin } = useUser()
  const [form] = Form.useForm()
  const writeComment: Callbacks['onFinish'] = (values) => {
    axios.post(baseUrl + '/api/planners/reply', {
      ...values,
      PlannerId: PlannerId,
      UserId: user.id
    }).then( () => {
      axios.get(baseUrl + `/api/planners/${PlannerId}`).then( result => {
        setReply(result.data.Replies)
        form.setFieldsValue({
          rate: 0,
          content: ''
        })
      })
    })
  }

  return (
    <div className='comment-list-wrapper'>
      { isLogin ?
        <div className='comment-write'>
          <Form
            form={form}
            onFinish={writeComment}
          >
            <Form.Item
              label='평점'
              name='rate'
              required={false}
              rules={[{ required: true, message: '평점을 선택해주세요.' },]}
            >
              <Rate allowHalf/>
            </Form.Item>
            <Form.Item
              name='content'
              rules={[{ required: true, message: '내용을 입력하세요!' },]}
            >
              <TextArea rows={4} placeholder='댓글'/>
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' className='button-color'>작성</Button>
            </Form.Item>
          </Form>
        </div>
        : null
      }
      <List
        itemLayout="horizontal"
        className='comment-list'
        header={`${reply.length}개의 답글`}
        dataSource={reply}
        renderItem={item => (
          <List.Item>
            <Comment
              datetime={<Rate allowHalf disabled defaultValue={item.rate}/>}
              avatar={<Avatar src={item.User.profile_image ? item.User.profile_image : '/defaultprofile.png'}/>}
              author={<Link href={`/designer/${item.User.id}`}><a>{item.User.nickname} {item.User.email}</a></Link>}
              content={<span>{item.content}</span>}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default CommentList