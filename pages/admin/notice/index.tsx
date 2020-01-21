import * as React from 'react'
import _axios from 'axios'
import { NextPage } from 'next'
import { Table } from 'antd'

const dataSource = [
  {
    key: 1,
    title: '예제1',
    author: 'Mike',
    age: 32,
    date: '2014-12-24 23:12:00',
    hit: 5
  },
  {
    key: 2,
    title: '예제2',
    author: 'John',
    age: 42,
    date: '2014-12-24 23:12:00',
    hit: 10
  },
];

const Notice: NextPage = ()=> {
  return (
    <div className='admin-notice' style={{ width: '100%' }}>
      <Table
        dataSource={dataSource}
        bordered
        pagination={{
          pageSize: 10,
          style: {
            textAlign: 'center',
            float: 'none'
          }
        }}
        rowClassName='board-table-row'
      >
        <Table.Column title='글 번호' dataIndex='key' key='key' width={100}/>
        <Table.Column title='제목' dataIndex='title' key='title'/>
        <Table.Column title='작성자' dataIndex='author' key='author' width={150}/>
        <Table.Column title='등록일' dataIndex='date' key='date' width={200}/>
        <Table.Column title='조회수' dataIndex='hit' key='hit' width={100}/>
        <Table.Column title='자세히보기' dataIndex='key' key='key' width={150}/>
      </Table>
    </div>
  )
}

Notice.getInitialProps = async () => {
  return {
    
  }
}

export default Notice