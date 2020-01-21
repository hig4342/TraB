import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Table, Button, Modal, Input } from 'antd'
import { Theme } from 'type'
import { ColumnsType } from 'antd/lib/table/interface'
import Link from 'next/link'

type Props = {
  themes: Theme[]
}

const Themes: NextPage<Props> = ({themes})=> {

  const [loading, setLoading] = React.useState(false)
  const [themedata, setThemedata] = React.useState(themes)
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.ReactText[]>([])
  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [name, setName] = React.useState('')

  const columns: ColumnsType<Theme> = [{
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
    title: '수정하기',
    dataIndex: 'id',
    key: 'details',
    align: 'center',
    render: (id: number) => (
      <Link href='/admin/theme/[id]' as={`/admin/theme/${id}`}><a>자세히보기</a></Link>
    )
  }]

  const showModal = () => {
    setVisible(true)
  };

  const handleRemove = () => {
    setLoading(true)
    const id = Number(selectedRowKeys[0])
    axios.delete(`/api/admin/themes/${id}`).then( _result => {
      axios.get('/api/admin/themes').then( result => {
        setThemedata(result.data)
        setLoading(false)
      })
    }).catch( err => {
      console.log(err)
    })
  }

  const handleOk = () => {
    setConfirmLoading(true)
    axios.post('/api/admin/themes', {name: name}).then( _result1 => {
      axios.get('/api/admin/themes').then( result => {
        setThemedata(result.data)
        setVisible(false)
        setConfirmLoading(true)
      })
    }).catch( err => {
      console.log(err)
      setVisible(false)
      setConfirmLoading(true)
    })
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false)
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <div className='themes'>
      <Table
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedRowKeys,
          onChange: (selected) => setSelectedRowKeys(selected)
        }}
        loading={loading}
        rowKey={record => record.id}
        columns={columns}
        dataSource={themedata}
        pagination={{
          pageSize: 10,
          style: {
            textAlign: 'center',
            float: 'none'
          }
        }}
        footer={() => (
          <div>
            <Button onClick={showModal} type='primary'>생성하기</Button>
            <Button onClick={handleRemove} type='danger'>삭제하기</Button>
            <Modal
              title="Title"
              visible={visible}
              confirmLoading={confirmLoading}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input onChange={handleName} value={name} placeholder='테마명'/>
            </Modal>
          </div>
        )}
      />
    </div>
  )
}

Themes.getInitialProps = async () => {
  const themes = await axios.get('/api/admin/themes')
  return {
    themes: themes.data
  }
}

export default Themes