import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { Table, Button, Input } from 'antd'
import { User } from 'type'
import { ColumnsType, FilterDropdownProps } from 'antd/lib/table/interface'
import { SearchOutlined, UndoOutlined } from '@ant-design/icons'

const getColumnSearchProps = (dataIndex: string) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}: FilterDropdownProps) => (
    <div style={{ padding: 8 }}>
      <Input 
        placeholder={`${dataIndex} 검색`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={confirm}
        style={{ width: 208, marginBottom: 8, display: 'block' }}
      />
      <Button
        type='primary'
        onClick={confirm}
        icon={<SearchOutlined />}
        style={{ width: 100, marginRight: 8 }}
      >
        검색
      </Button>
      <Button
        type='danger'
        onClick={clearFilters}
        icon={<UndoOutlined />}
        style={{ width: 100 }}
      >
        초기화
      </Button>
    </div>
  ),
  filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value: any, record: any) => (
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase())
  )
})

const columns: ColumnsType<User> = [{
  title: '번호',
  dataIndex: 'id',
  key: 'id',
  align: 'center'
}, {
  title: '　이름',
  dataIndex: 'name',
  key: 'name',
  align: 'center',
  ...getColumnSearchProps('name'),
}, {
  title: '　닉네임',
  dataIndex: 'nickname',
  key: 'nickname',
  align: 'center',
  ...getColumnSearchProps('nickname'),
}, {
  title: '권한',
  dataIndex: 'state_id',
  key: 'state_id',
  align: 'center',
  filters: [{
    text: '미인증',
    value: '1',
  }, {
    text: '이메일인증',
    value: '2',
  }, {
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
    <span>{state_id === 1 ? '미인증' : state_id === 2 ? '이메일인증' : state_id === 3 ? '승인요청' : state_id === 4 ? '승인완료' : state_id === 5 ? 'ITP' : '관리자'}</span>
  )
}, {
  title: '자세히보기',
  dataIndex: 'id',
  key: 'details',
  align: 'center',
  render: (id: number) => (
    <Link href='/admin/designer/[id]' as={`/admin/designer/${id}`}><a>자세히보기</a></Link>
  )
}]

type Props = {
  user: User[]
  userCount: number
}

const AdminUsers: NextPage<Props> = ({ user, userCount })=> {
  return (
    <div className='admin-designer' style={{ width: '100%' }}>
      <h1>유저 리스트 총 {userCount}명</h1>
      <Table
        dataSource={user}
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

AdminUsers.getInitialProps = async () => {
  const user = await axios.get('/api/admin/users/')
  const userCount = await axios.get('/api/admin/users/count')
  return {
    user: user.data,
    userCount: userCount.data
  }
}

export default AdminUsers