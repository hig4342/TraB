import * as React from 'react'
import { Comment, List, Avatar, Rate, Button, Tooltip, Input, Row, Col } from 'antd'
import { Reply, Favorite, RateType } from 'type'
import Link from 'next/link'
import axios from 'axios'
import useUser from '@hooks/useUser';
import { Callbacks } from 'rc-field-form/lib/interface';
import TextArea from 'antd/lib/input/TextArea'
import { Form } from 'antd'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import '@assets/CommentList.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type ContentProps = {
  item: Reply;
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
  PlannerId: number;
  comments: Reply[];
  favorites: Favorite[];
  rates: RateType[];
}

const CommentList: React.SFC<Props> = ({PlannerId, comments, favorites, rates})=> {

  const { user, isLogin } = useUser()
  const [reply, setReply] = React.useState(comments)
  const [favorited, setFavorited] = React.useState(favorites.findIndex(favorite => favorite.UserId === user.id && favorite.favorite) !== -1)
  const [form] = Form.useForm()

  React.useEffect(() => {
    setFavorited(favorites.findIndex(favorite => favorite.UserId === user.id && favorite.favorite) !== -1)
  }, [isLogin])

  const favoriteCSS: React.CSSProperties = {
    background: favorited ? 'rgba(256, 0, 0, 0.50)' : 'white',
    color: favorited ? 'white' : 'black'
  }

  const handleFavorite = () => {
    if(favorited) {
      axios.patch(baseUrl + `/api/planners/favorite/${PlannerId}`, {
        UserId: user.id,
        favorite: false
      }).then(() => setFavorited(false))
    } else {
      axios.patch(baseUrl + `/api/planners/favorite/${PlannerId}`, {
        UserId: user.id,
        favorite: true
      }).then(() => setFavorited(true))
    }
  }

  const handleRate: Callbacks['onFinish'] = (values) => {
    axios.patch(baseUrl + `/api/planners/rate/${PlannerId}`, {
      ...values,
      UserId: user.id,
    })
  }

  const writeComment: Callbacks['onFinish'] = (values) => {
    axios.post(baseUrl + '/api/planners/reply', {
      ...values,
      PlannerId: PlannerId,
      UserId: user.id
    }).then( () => {
      axios.get(baseUrl + `/api/planners/${PlannerId}`).then( result => {
        const { Replies } = result.data
        if( Array.isArray(Replies) ) {
          setReply(Replies.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1)))
        }
        form.setFieldsValue({
          content: ''
        })
      })
    })
  }

  const handleEdit = (id: number, content: string) => {
    axios.patch(baseUrl + `/api/planners/reply/${id}`, {content: content}).then( () => {
      axios.get(baseUrl + `/api/planners/${PlannerId}`).then( result => {
        const { Replies } = result.data
        if( Array.isArray(Replies) ) {
          setReply(Replies.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1)))
        }
      })
    })
  }
  
  const handleRemove = (id: number) => {
    axios.delete(baseUrl + `/api/planners/reply/${id}`).then( () => {
      axios.get(baseUrl + `/api/planners/${PlannerId}`).then( result => {
        const { Replies } = result.data
        if( Array.isArray(Replies.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))) ) {
          setReply(Replies)
        }
      })
    })
  }

  return (
    <div className='comment-list-wrapper'>
      { isLogin ?
        <div className='comment-write'>
          <Form
            onFinish={handleRate}
            initialValues={{
              rate: rates.findIndex(rate => rate.id === user.id) !== -1 ? rates.find(rate => rate.id === user.id)?.rate : 0
            }}
            style={{ marginTop: '3rem', marginBottom: '1rem'}}
          >
            <Row>
              <Col xs={24} sm={3}>
                <Form.Item className='function-wrapper'>
                  <Button className='favorite-button' style={favoriteCSS} onClick={handleFavorite}>
                    {
                      favorited ? 
                      <HeartFilled />
                      :
                      <HeartOutlined />
                    }
                    찜하기
                  </Button>
                </Form.Item>
              </Col>
              <Col xs={18} sm={4}>
                <Form.Item
                  label='평점'
                  name='rate'
                  className='function-wrapper'
                >
                  <Rate allowHalf/>
                </Form.Item>
              </Col>
              <Col xs={6} sm={2}>
                <Form.Item className='function-wrapper'>
                  <Button htmlType='submit' type='primary'>확인</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Form
            form={form}
            onFinish={writeComment}
          >
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
        renderItem={item => (<List.Item><CommentItem item={item} handleEdit={handleEdit} handleRemove={handleRemove}/></List.Item>)}
      />
    </div>
  )
}

export default CommentList