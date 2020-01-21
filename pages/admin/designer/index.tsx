import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { Table, Button } from 'antd'

const columns: any = [{
  title: '번호',
  dataIndex: 'key',
  key: 'key',
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
  render: (_text: any, record: { account_bank: string; account_num: string }) => (
    <div>{record.account_bank} / {record.account_num}</div>
  )
}, {
  title: '승인여부',
  dataIndex: 'state_id',
  key: 'state_id',
  align: 'center',
  filters: [{
    text: '미승인',
    value: 3,
  }, {
    text: '승인거부',
    value: 4,
  }, {
    text: '승인완료',
    value: 5,
  }],
  onFilter: (value: number, record: {state_id: number}) => record.state_id === value,
  render: (state_id: number) => (
    <span>{state_id === 3 ? '미승인' : state_id === 4 ? '승인거부' : '승인완료'}</span>
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
  dataIndex: 'key',
  key: 'details',
  render: (key: number) => (
    <Link href='/admin/designer/[id]' as={`/admin/designer/${key}`}><a>자세히보기</a></Link>
  )
}]

type Props = {
  designer_data: any
}

const Designer: NextPage<Props> = ({ designer_data })=> {
  return (
    <div className='admin-designer' style={{ width: '100%' }}>
      <h1>설계자 인원 리스트</h1>
      <Table
        dataSource={designer_data}
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

Designer.getInitialProps = async () => {
  const designer_data = await axios.get('admin/users/designer')
  return {
    designer_data: designer_data.data
  }
}

export default Designer