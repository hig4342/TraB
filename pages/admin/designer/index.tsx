import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { Table, Button } from 'antd'
import { User } from 'type'
import { ColumnsType } from 'antd/lib/table/interface'

const columns: ColumnsType<User> = [{
  title: '번호',
  dataIndex: 'id',
  key: 'id',
  align: 'center'
}, {
  title: '이름',
  dataIndex: 'name',
  key: 'name',
  align: 'center'
}, {
  title: '은행 / 계좌번호',
  key: 'account_num',
  align: 'center',
  render: (_text: any, record) => (
    <div>{record.account_bank} / {record.account_num}</div>
  )
}, {
  title: '승인여부',
  dataIndex: 'state_id',
  key: 'state_id',
  align: 'center',
  filters: [{
    text: '승인요청',
    value: '3',
  }, {
    text: '승인완료',
    value: '4',
  }, {
    text: 'ITP',
    value: '5',
  }, {
    text: '관리자',
    value: '9999',
  }],
  onFilter: (value, record) => record.state_id === Number(value),
  render: (state_id: number) => (
    <span>{state_id === 3 ? '승인요청' : state_id === 4 ? '승인완료' : state_id === 5 ? 'ITP' : '관리자'}</span>
  )
}, {
  title: '승인하기',
  dataIndex: 'state_id',
  key: 'allow',
  align: 'center',
  render: (state_id: number) => {
    if( state_id === 3 ){
      return (<span><Button type='primary'>승인</Button><Button type='primary' danger>거부</Button></span>)
    } else if ( state_id === 4 ){
      return (<span>승인거부</span>)
    } else {
      return (<span>승인완료</span>)
    }
  }
}, {
  title: '자세히보기',
  dataIndex: 'id',
  key: 'details',
  render: (id: number) => (
    <Link href='/admin/designer/[id]' as={`/admin/designer/${id}`}><a>자세히보기</a></Link>
  )
}]

type Props = {
  designer: User[]
  designerCount: number
}

const AdminDesigners: NextPage<Props> = ({ designer, designerCount })=> {

  return (
    <div className='admin-designers' style={{ width: '100%' }}>
      <h1>설계자 인원 리스트 총 {designerCount}명</h1>
      <Table
        dataSource={designer}
        columns={columns}
        pagination={{
          pageSize: 10,
          style: {
            textAlign: 'center',
            float: 'none'
          }
        }}
      />
    </div>
  )
}

AdminDesigners.getInitialProps = async () => {
  const designer = await axios.get('/api/admin/users/designer')
  const designerCount = await axios.get('/api/admin/users/designer/count')
  return {
    designer: designer.data,
    designerCount: designerCount.data
  }
}

export default AdminDesigners