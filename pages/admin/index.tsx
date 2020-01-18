import * as React from 'react'
import _axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { Button, Row, Col } from 'antd'

const Admin: NextPage = ()=> {
  return (
    <div className='admin' style={{ width: '100%', textAlign: 'center' }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Link href='/admin/designer'><Button>설계자 관리</Button></Link>
        </Col>
        <Col span={8}>
          <Link href='/admin/user'><Button>유저 목록</Button></Link>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Link href='/admin/planner'><Button>계획표 관리</Button></Link>
        </Col>
        <Col span={8}>
          <Link href='/admin/region'><Button>지역 관리</Button></Link>
        </Col>
        <Col span={8}>
          <Link href='/admin/theme'><Button>테마 관리</Button></Link>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Link href='/admin/notice'><Button>공지 사항</Button></Link>
        </Col>
        <Col span={8}>
          <Link href='/admin/advertise'><Button>광고</Button></Link>
        </Col>
      </Row>
    </div>
  )
}

Admin.getInitialProps = async () => {
  return {
    
  }
}

export default Admin