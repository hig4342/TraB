import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Table, Button, Checkbox } from 'antd'
import { Board } from 'type'
import { ColumnsType } from 'antd/lib/table/interface'
import Link from 'next/link'
import moment from 'moment'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  notices: Board[]
}

const Notice: NextPage<Props> = ({notices})=> {

  React.useEffect(() => {
    console.log(notices)
  }, [])

  const columns: ColumnsType<Board> = [{
    title: '글번호',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    align: 'center'
  }, {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    align: 'center'
  }, {
    title: '등록일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,
    align: 'center',
    render: (date: Date) => (moment(date).format('YYYY-MM-DD'))
  }, {
    title: '공개 여부',
    dataIndex: 'visible',
    key: 'visible',
    width: 100,
    align: 'center',
    render: (visible: boolean) => (<Checkbox defaultChecked={visible} disabled/>)
  }, {
    title: '조회수',
    dataIndex: 'hit',
    key: 'hit',
    width: 100,
    align: 'center'
  }, {
    title: '자세히보기',
    dataIndex: 'id',
    key: 'details',
    align: 'center',
    width: 120,
    render: (id: number) => (
      <Link href='/admin/board/[id]' as={`/admin/board/${id}`}><a>자세히보기</a></Link>
    )
  }]

  return (
    <div className='admin-notice' style={{ width: '100%' }}>
      <h1 className='big-title'>공지사항</h1>
      <Table
        columns={columns}
        dataSource={notices}
        rowKey={(record) => (record.id)}
        bordered
        pagination={{
          pageSize: 10,
          style: {
            textAlign: 'center',
            float: 'none'
          }
        }}
        rowClassName='board-table-row'
        footer={() => (
          <div>
            <Link href='/admin/board/write'><Button size='large'>글쓰기</Button></Link>
          </div>
        )}
      />
    </div>
  )
}

Notice.getInitialProps = async () => {
  const notices = await axios.get(baseUrl+'/api/admin/boards/notices')
  return {
    notices: notices.data
  }
}

export default Notice