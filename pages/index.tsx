import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import NoticeSwiper from '@components/NoticeSwiper'
import ShowandPlan from '@components/ShowandPlan'
import CurrentSituation from '@components/CurrentSituation'
import Services from '@components/Services'
import Descriptions from '@components/Descriptions'
import { Board } from 'type'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  notices: Board[]
  planners: {
    domestic: number
    foreign: number
  }
}

const IndexPage: NextPage<Props> = ({notices, planners}) => {

  return (
    <div className='index-page'>
      <NoticeSwiper items={notices}/>
      <CurrentSituation planners={planners} designers={3}/>
      <ShowandPlan />
      <Services />
      <NoticeSwiper inline items={notices} />
      <Descriptions />
    </div>
  )
}

IndexPage.getInitialProps = async () => {
  const notices = await axios.get(baseUrl + '/api/boards/notices')
  const planners = await axios.get(baseUrl + '/api/planners/count')
  return {
    notices: notices.data,
    planners: planners.data
  }
}

export default IndexPage