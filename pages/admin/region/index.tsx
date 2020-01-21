import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { Table, Input, Button, Row, Col } from 'antd'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import { SearchOutlined, UndoOutlined } from '@ant-design/icons'
import { Country, City, Planner } from 'type'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  countryData: Country[];
  cityData: City[];
}

const Region: NextPage<Props> = ({ countryData, cityData })=> {

  const [selectedCountryRowKeys, setSelectedCountryRowKeys] = React.useState<React.ReactText[]>([])
  const [selectedCityRowKeys, setSelectedCityRowKeys] = React.useState<React.ReactText[]>([])
  const [countries, setCountries] = React.useState(countryData)
  const [cities, setCities] = React.useState(cityData)
  const [loading, setLoading] = React.useState(false)
  
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

  const countryColumns: any = [{
    title: '번호',
    dataIndex: 'id',
    key: 'id',
    align: 'center'
  },{
    title: '나라',
    dataIndex: 'country_name',
    key: 'country_name',
    align: 'center',
    ...getColumnSearchProps('country_name'),
  }, {
    title: '도시 갯수',
    dataIndex: 'Cities',
    key: 'cities_count',
    align: 'center',
    render: (planners: City[]) => (planners.length)
  }]

  const cityColumns: any = [{
    title: '번호',
    dataIndex: 'id',
    key: 'id',
    align: 'center'
  },{
    title: '나라',
    dataIndex: ['Country', 'country_name'],
    key: 'country_name',
    align: 'center',
    ...getColumnSearchProps('country_name'),
  }, {
    title: '도시',
    dataIndex: 'city_name',
    key: 'city_name',
    align: 'center',
    ...getColumnSearchProps('city_name'),
  }, {
    title: '계획표 갯수',
    dataIndex: 'Planners',
    key: 'planner_count',
    align: 'center',
    render: (planners: Planner[]) => (planners.length)
  }, {
    title: '자세히보기',
    dataIndex: 'id',
    key: 'details',
    align: 'center',
    render: (id: number) => (
      <Link href='/admin/region/[id]' as={`/admin/region/${id}`}><a>자세히보기</a></Link>
    )
  }]

  const handleCountryRemove = () => {
    setLoading(true)
    const id = Number(selectedCountryRowKeys[0])
    axios.delete(`/api/admin/countries/${id}`).then( _result => {
      axios.get('/api/admin/countries').then( result => {
        setCountries(result.data)
        setLoading(false)
      })
    }).catch( err => {
      console.log(err)
    })
  }

  const handleCityRemove = () => {
    setLoading(true)
    const id = Number(selectedCityRowKeys[0])
    axios.delete(`/api/admin/cities/${id}`).then( _result => {
      axios.get('/api/admin/cities').then( result => {
        setCities(result.data)
        setLoading(false)
      })
    }).catch( err => {
      console.log(err)
    })
  }

  return (
    <div className='admin-region' style={{ width: '100%' }}>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Table
            loading={loading}
            rowSelection={{
              type: 'radio',
              selectedRowKeys: selectedCountryRowKeys,
              onChange: (selected) => setSelectedCountryRowKeys(selected)
            }}
            rowKey={record => record.id}
            dataSource={countries}
            columns={countryColumns}
            pagination={{
              pageSize: 10,
              style: {
                textAlign: 'center',
                float: 'none'
              }
            }}
            footer={() => (
              <div>
                <Button onClick={handleCountryRemove} type='danger'>삭제하기</Button>
              </div>
            )}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Table
            loading={loading}
            rowSelection={{
              type: 'radio',
              selectedRowKeys: selectedCityRowKeys,
              onChange: (selected) => setSelectedCityRowKeys(selected)
            }}
            rowKey={record => record.id}
            dataSource={cities}
            columns={cityColumns}
            pagination={{
              pageSize: 10,
              style: {
                textAlign: 'center',
                float: 'none'
              }
            }}
            footer={() => (
              <div>
                <Link href='/admin/region/create'><Button type='primary'>추가하기</Button></Link>
                <Button onClick={handleCityRemove} type='danger'>삭제하기</Button>
              </div>
            )}
          />
        </Col>
      </Row>
    </div>
  )
}

Region.getInitialProps = async () => {
  const countries = await axios.get(baseUrl+'/api/admin/countries')
  const cities = await axios.get(baseUrl+'/api/admin/cities')
  return {
    countryData: countries.data,
    cityData: cities.data
  }
}

export default Region