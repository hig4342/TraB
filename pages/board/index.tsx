import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { Table, Button } from 'antd'
import { Board, User } from 'type'
import moment from 'moment'
import '@assets/Board.less'
import PopupWrapper from '@components/PopupWrapper'
import { ColumnsType } from 'antd/lib/table'

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

  const data = posts.notices.concat(posts.posts)
  const Columns: ColumnsType<Board>= [{
    title: '글번호',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    render: (id, record) => (record.board_state === 3 ? id : '공지사항')
  }, {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  }, {
    title: '작성자',
    dataIndex: 'User',
    key: 'UserId',
    align: 'center',
    render: (User: User, record) => (record.board_state === 3 ? User.nickname : '관리자')
  }, {
    title: '등록일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render: (value: Date) => (moment(value).format('YYYY-MM-DD'))
  }]

  return (
    <div className='board' style={{ width: '100%' }}>
      <NoticeSwiper items={advertisements} inline />
      <h1 className='big-title'>트래비(TraB) 게시판</h1>
      <h4 className='sub-title'>트래비(TraB) 팀에게 건의하실 사항이나, 공유하고 싶은 정보들을 자유롭게 게시 해 주시길 바랍니다!!</h4>
      <Table
        dataSource={data}
        columns={Columns}
        bordered
        pagination={{
          pageSize: 10,
          style: {
            textAlign: 'center',
            float: 'none'
          }
        }}
        footer={() => (
          <div>
            <PopupWrapper signin email callback='/board/write'><Button size='large'>글쓰기</Button></PopupWrapper>
          </div>
        )}
        rowKey={record => record.id}
        rowClassName='board-table-row'
        onRow={(record, _index) => {
          return {
            onClick: () => Router.push('/board/[id]',`/board/${record.id}`)
          }
        }}
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