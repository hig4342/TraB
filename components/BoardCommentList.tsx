import * as React from 'react'
import axios from 'axios'
import { Comment, List, Avatar, Button, Form, message } from 'antd'
import { BoardReply } from 'type'
import Link from 'next/link'
import TextArea from 'antd/lib/input/TextArea'
import useUser from '@hooks/useUser'
import { Callbacks } from 'rc-field-form/lib/interface';
import '@assets/CommentList.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  comments: BoardReply[];
  board_id: number;
}

const BoardCommentList: React.SFC<Props> = ({comments, board_id})=> {
  const {user, isLogin} = useUser()
  const [reply, setReply] = React.useState(comments)
  const [form] = Form.useForm()
  const onFinish: Callbacks['onFinish'] = (values) => {
    if(user.state_id === 1) {
      message.error('이메일 인증을 받은 회원만 댓글을 작성할 수 있습니다.')
      return
    } else {
      axios.post(baseUrl + '/api/boards/reply', {
        BoardId: board_id,
        UserId: user.id,
        ...values
      }).then( () => {
        axios.get(baseUrl + `/api/boards/${board_id}`).then( result => {
          setReply(result.data.BoardReplies)
          form.setFieldsValue({
            content: ''
          })
        })
      })
    }
  }

  return (
    <div className='comment-list-wrapper'>
      { isLogin ?
      <div className='comment-write'>
          <Form
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name='content'
            >
              <TextArea rows={4} placeholder='댓글'/>
            </Form.Item>
            <Form.Item>
              <Button size='large' htmlType='submit' className='button-color'>작성</Button>
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

export default BoardCommentList