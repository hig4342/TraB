import * as React from 'react'
import axios from 'axios'
import { Comment, List, Avatar, Button, Form, message, Input, Tooltip } from 'antd'
import { BoardReply } from 'type'
import Link from 'next/link'
import TextArea from 'antd/lib/input/TextArea'
import useUser from '@hooks/useUser'
import { Callbacks } from 'rc-field-form/lib/interface';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import '@assets/BoardCommentList.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type ContentProps = {
  item: BoardReply;
  handleEdit: (id: number, content: string) => void;
  handleRemove: (id: number) => void;
}

const CommentItem: React.SFC<ContentProps> = ({item, handleEdit, handleRemove}) => {

  const [editing, setEditing] = React.useState(false)
  const { user, isLogin } = useUser()

  const handeEditable = () => {
    setEditing(true)
  }

  const handeCancel = () => {
    setEditing(false)
  }

  const onFinish: Callbacks['onFinish'] = (values) => {
    handleEdit(item.id, values.content)
    setEditing(false)
  }

  return (
    <Comment
      style={{width: '100%'}}
      datetime={
        <div className='comment-tooltip-wrapper'>
          <Tooltip title={moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
            <span className='comment-tooltip-item'>{moment(item.createdAt).fromNow()}</span>
          </Tooltip>
          {
            (!editing && isLogin && user.id === item.User.id) || user.state_id === 9999 ?
            <>
              <span onClick={handeEditable} className='comment-tooltip-item comment-tooltip-item-click'><FontAwesomeIcon icon={faEdit}/>수정</span>
              <span onClick={() => handleRemove(item.id)} className='comment-tooltip-item comment-tooltip-item-click'><FontAwesomeIcon icon={faTrashAlt}/>삭제</span>
            </>
            : null
          }
        </div>
      }
      avatar={<Avatar src={item.User.profile_image ? item.User.profile_image : '/defaultprofile.png'}/>}
      author={<Link href={`/designer/${item.User.id}`}><a>{item.User.nickname} {item.User.email}</a></Link>}
      content={
        editing ?
        <Form
          onFinish={onFinish}
          initialValues={{
            content: item.content
          }}
        >
          <Form.Item
            wrapperCol={{span: 24}}
            name='content'
            rules={[{ required: true, message: '내용을 입력하세요!' },]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary'>수정</Button>
            <Button onClick={handeCancel} type='danger'>취소</Button>
          </Form.Item>
        </Form>
        :
        <span>{item.content}</span>
      }
    />
  )
}

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
          const { BoardReplies } = result.data
          if( Array.isArray(BoardReplies.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))) ) {
            setReply(BoardReplies)
          }
          form.setFieldsValue({
            content: ''
          })
        })
      })
    }
  }

  const handleEdit = (id: number, content: string) => {
    axios.patch(baseUrl + `/api/boards/reply/${id}`, {content: content}).then( () => {
      axios.get(baseUrl + `/api/boards/${board_id}`).then( result => {
        const { BoardReplies } = result.data
        if( Array.isArray(BoardReplies.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))) ) {
          setReply(BoardReplies)
        }
      })
    })
  }
  
  const handleRemove = (id: number) => {
    axios.delete(baseUrl + `/api/planners/reply/${id}`).then( () => {
      axios.get(baseUrl + `/api/boards/${board_id}`).then( result => {
        const { BoardReplies } = result.data
        if( Array.isArray(BoardReplies.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))) ) {
          setReply(BoardReplies)
        }
      })
    })
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
        renderItem={item => (<List.Item><CommentItem item={item} handleEdit={handleEdit} handleRemove={handleRemove} /></List.Item>)}
      />
    </div>
  )
}

export default BoardCommentList