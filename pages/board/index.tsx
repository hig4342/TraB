import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { List, Row, Col, Tooltip, Button } from 'antd'
import { Board } from 'type'
import moment from 'moment'
import PopupWrapper from '@components/PopupWrapper'
import useUser from '@hooks/useUser'
import '@assets/Board.less'
moment.locale('ko-kr')

const NoticeSwiper = dynamic(
  () => import('@components/NoticeSwiper'),
  { ssr: false }
)

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  advertisements: Array<Board>
  posts: {
    notices: Board[]
    posts: Board[]
  }
}

const BoardPage: NextPage<Props> = ({ advertisements, posts })=> {

  const { user, isLogin } = useUser()
  const [data, setData] = React.useState(posts.notices.concat(posts.posts))
  const [loading, setLoading] = React.useState(false)

  const handleEdit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
  }

  const handleDelete = (event: React.MouseEvent<HTMLElement, MouseEvent>, id: number) => {
    event.stopPropagation()
    axios.delete(baseUrl + `/api/boards/${id}`).then(() => {
      axios.get(baseUrl + '/api/boards/posts').then( result => {
        const changedData: { notices: Board[]; posts: Board[] } = result.data
        setData(changedData.notices.concat(changedData.posts))
        setLoading(false)
      })
    })
  }

  return (
    <div className='board' style={{ width: '100%' }}>
      <NoticeSwiper items={advertisements} inline />
      <h1 className='big-title'>트래비(TraB) 게시판</h1>
      <h4 className='sub-title'>트래비(TraB) 팀에게 건의하실 사항이나, 공유하고 싶은 정보들을 자유롭게 게시 해 주시길 바랍니다!!</h4>
      <List
        loading={loading}
        dataSource={data}
        bordered
        footer={<div><PopupWrapper signin email callback='/board/write'><Button size='large'>글쓰기</Button></PopupWrapper></div>}
        renderItem={item => (
          <Link href='/board/[id]' as={`/board/${item.id}`}>
            <List.Item className='board-item-wrapper'>
              <Row align='middle' className='board-item'>
                <Col xs={4} sm={2}>
                  <div className='board-item-id'>
                    <span>{item.board_state === 3 ? item.id : '공지사항'}</span>
                  </div>
                </Col>
                <Col xs={12} sm={19}>
                  <div className='board-item-title'>
                    <span>{item.title}</span>
                  </div>
                  <div className='board-item-description'>
                    <span>{item.board_state === 3 ? item.User.nickname : '관리자'}</span>
                    <Tooltip title={moment(item.createdAt).format('YYYY-MM-DD HH:mm')}>
                      <span>{moment(item.createdAt).fromNow()}</span>
                    </Tooltip>
                  </div>
                </Col>
                <Col xs={8} sm={3}>
                  <div className='board-item-edit'>
                    {
                      ((isLogin && user.id === item.UserId ) || user.state_id === 9999 ) && item.board_state !== 1 ?
                      <>
                        <Link href='/board/[id]/edit' as={`/board/${item.id}/edit`}><Button onClick={handleEdit}>수정</Button></Link>
                        <Button onClick={(e) => handleDelete(e, item.id)} danger>삭제</Button>
                      </>
                      : null
                    }
                  </div>
                </Col>
              </Row>
            </List.Item>
          </Link>
        )}
      />
    </div>
  )
}

BoardPage.getInitialProps = async () => {
  const advertisements = await axios.get(baseUrl + '/api/boards/advertisements')
  const post = await axios.get(baseUrl + '/api/boards/posts')
  return {
    advertisements: advertisements.data,
    posts: post.data,
  }
}

export default BoardPage