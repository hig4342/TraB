import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { Table, Button } from 'antd'
import { Planner } from 'type'
import { ColumnsType } from 'antd/lib/table/interface'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  planner_data: Planner[]
}

const AdminPlannerList: NextPage<Props> = ({planner_data})=> {
  
  const [plannerData, setPlannerData] = React.useState(planner_data)
  const [loading, setLoading] = React.useState(false)

  const refusePayment = (id: number) => {
    setLoading(true)
    axios.patch(baseUrl + `/api/admin/planners/${id}/payment`, {payment_state: 2}).then( () => {
      axios.get(baseUrl + '/api/admin/planners').then( result => {
        setPlannerData(result.data)
        setLoading(false)
      })
    })
  }
  
  const approvePayment = (id: number) => {
    axios.patch(baseUrl + `/api/admin/planners/${id}/payment`, {payment_state: 3}).then( () => {
      axios.get(baseUrl + '/api/admin/planners').then( result => {
        setPlannerData(result.data)
        setLoading(false)
      })
    })
  }

  const columns: ColumnsType<Planner> = [{
    title: '번호',
    dataIndex: 'id',
    key: 'id',
    align: 'center'
  }, {
    title: '이름',
    dataIndex: ['User', 'nickname'],
    key: 'author',
    align: 'center'
  }, {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    align: 'center'
  }, {
    title: '나라',
    dataIndex: ['Country', 'country_name'],
    key: 'country',
    align: 'center'
  }, {
    title: '도시',
    dataIndex: ['City', 'city_name'],
    key: 'city',
    align: 'center'
  }, {
    title: '승인상태',
    dataIndex: 'upload_state',
    key: 'upload_state',
    align: 'center',
    filters: [{
      text: '미승인',
      value: '1',
    }, {
      text: '거부',
      value: '2',
    }, {
      text: '승인',
      value: '3',
    }, {
      text: 'P',
      value: '4',
    }, {
      text: 'ITP',
      value: '5',
    }],
    onFilter: (value, record) => record.upload_state === Number(value),
    render: (upload_state: number) => (
      <span>{upload_state === 1 ? '미승인' : upload_state === 2 ? '거부' : upload_state === 3 ? '승인' : upload_state === 4 ? 'P' : 'ITP'}</span>
    )
  }, {
    title: '정산여부',
    dataIndex: 'payment_state',
    key: 'payment_state',
    align: 'center',
    filters: [{
      text: '미지불',
      value: '1',
    }, {
      text: '지불거부',
      value: '2',
    }, {
      text: '지불완료',
      value: '3',
    }],
    onFilter: (value, record) => record.payment_state === Number(value),
    render: (payment_state: number) => (
      <span>{payment_state === 1 ? '미지불' : payment_state === 2 ? '지불거부' : '지불완료'}</span>
    )
  }, {
    title: '정산하기',
    dataIndex: 'payment_state',
    key: 'payment',
    align: 'center',
    render: (_payment_state, record) => (
      record.upload_state > 2 ? 
        record.payment_state === 1 ?
        <span>
          <Button onClick={() => approvePayment(record.id)} type='primary'>지불</Button>
          <Button onClick={() => refusePayment(record.id)} type='primary' danger>거부</Button>
        </span>
        : <span>{record.payment_state === 2 ? '지불거부' : '지불완료'}</span>
      : null
      )
  }, {
    title: '자세히보기',
    dataIndex: 'id',
    key: 'details',
    align: 'center',
    render: (key: number) => (
      <Link href='/admin/planner/[id]' as={`/admin/planner/${key}`}><a>자세히보기</a></Link>
    )
  }]

  return (
    <div className='admin-planner' style={{ width: '100%'}}>
      <Table
        loading={loading}
        dataSource={plannerData}
        rowKey={record => record.id}
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

AdminPlannerList.getInitialProps = async () => {
  const planner_data = await axios.get(baseUrl+'/api/admin/planners')
  return {
    planner_data: planner_data.data
  }
}

export default AdminPlannerList