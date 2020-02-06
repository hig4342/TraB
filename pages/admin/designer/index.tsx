import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { Table, Button } from 'antd'
import { User } from 'type'
import { ColumnsType } from 'antd/lib/table/interface'

type Props = {
  designer: User[]
  designerCount: number
}

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

const AdminDesigners: NextPage<Props> = ({ designer, designerCount })=> {

  const [designerData, setDesignerData] = React.useState(designer)
  const [loading, setLoading] = React.useState(false)

  const refusal = (id: number) => {
    setLoading(true)
    axios.patch(baseUrl + `/api/admin/users/${id}/state`, {state_id: 2}).then( () => {
      axios.get(baseUrl + '/api/admin/users/designer').then( result => {
        setDesignerData(result.data)
        setLoading(false)
      })
    })
  }
  
  const accept = (id: number) => {
    setLoading(true)
    axios.patch(baseUrl + `/api/admin/users/${id}/state`, {state_id: 4}).then( () => {
      axios.get(baseUrl + '/api/admin/users/designer').then( result => {
        setDesignerData(result.data)
        setLoading(false)
      })
    })
  }

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
    key: 'manage',
    align: 'center',
    render: (state_id: number, record) => {
      if( state_id === 3 ){
        return (
          <span>
            <Button onClick={() => accept(record.id)} type='primary'>승인</Button>
            <Button onClick={() => refusal(record.id)} type='primary' danger>거부</Button>
          </span>
        )
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

  return (
    <div className='admin-designers' style={{ width: '100%' }}>
      <h1>설계자 인원 리스트 총 {designerCount}명</h1>
      <Table
        loading={loading}
        dataSource={designerData}
        columns={columns}
        rowKey={record => record.id}
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