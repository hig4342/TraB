import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Table } from 'antd'
import { Board } from 'type'
import { ColumnsType } from 'antd/lib/table/interface'
import Link from 'next/link'
import moment from 'moment'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  advertises: Board[]
}

const Advertise: NextPage<Props> = ({advertises})=> {

  React.useEffect(() => {
    console.log(advertises)
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
    title: '마감일',
    dataIndex: 'ad_deadline',
    key: 'ad_deadline',
    width: 120,
    align: 'center',
    render: (date: Date) => (moment(date).format('YYYY-MM-DD') + (' (' + moment.duration(moment(date).diff(moment())).asDays().toFixed(0) + '일)'))
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
    <h1 className='big-title'>광고</h1>
      <Table
        columns={columns}
        dataSource={advertises}
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
      />
    </div>
  )
}

Advertise.getInitialProps = async () => {
  const advertises = await axios.get(baseUrl+'/api/admin/boards/advertises')
  return {
    advertises: advertises.data
  }
}

export default Advertise