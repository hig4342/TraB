import * as React from 'react'
import axios from 'axios'
import Router from 'next/router'
import { Comment, List, Avatar, Button, Form, message } from 'antd'
import { BoardReply } from 'type'
import Link from 'next/link'
import TextArea from 'antd/lib/input/TextArea'
import useUser from '@hooks/useUser'
import '@assets/CommentList.less'

type Props = {
  comments: BoardReply[];
  board_id: number;
}

const BoardCommentList: React.SFC<Props> = ({comments, board_id})=> {
  const {user, isLogin} = useUser()

  const onFinish = (e: any) => {
    if(user.state_id === 1) {
      message.error('이메일 인증을 받은 회원만 댓글을 작성할 수 있습니다.')
      return
    } else {
      axios.post('api/board/reply', {
        BoardId: board_id,
        UserId: user.id,
        content: e.content
      }).then( result => {
        console.log(result)
        Router.push(`/board/${board_id}`)
      })
    }
  }

  return (
    <div className='comment-list-wrapper'>
      { isLogin ?
      <div className='comment-write'>
          <Form
            onFinish={onFinish}
          >
            <Form.Item
              name='content'
            >
              <TextArea rows={4} placeholder='댓글쓰는창'/>
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
        header={`${comments.length}개의 답글`}
        dataSource={comments}
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