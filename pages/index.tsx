import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
//import NoticeSwiper from '@components/NoticeSwiper'
import ShowandPlan from '@components/ShowandPlan'
import CurrentSituation from '@components/CurrentSituation'  
import NewPlannerList from '@components/NewPlannerList'
import { Board, Planner } from 'type'

const NoticeSwiper = dynamic(
  () => import('@components/NoticeSwiper'),
  { ssr: false }
)

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  notices: Board[]
  planners: {
    domestic: number
    foreign: number
  }
  users: number;
  newPlanners: {
    domestic: Planner[]
    foreign: Planner[]
  };
}

const IndexPage: NextPage<Props> = ({notices, planners, users, newPlanners}) => {

  return (
    <div className='index-page'>
      <NoticeSwiper items={notices}/>
      <CurrentSituation planners={planners} designers={users}/>
      <ShowandPlan />
      <NewPlannerList domestic={newPlanners.domestic} foreign={newPlanners.foreign}/>
    </div>
  )
}

IndexPage.getInitialProps = async () => {
  const notices = await axios.get(baseUrl + '/api/boards/notices')
  const planners = await axios.get(baseUrl + '/api/planners/count')
  const users = await axios.get(baseUrl + '/api/users/designer/count')
  const newPlanners = await axios.get(baseUrl + '/api/planners/new')

  return {
    notices: notices.data,
    planners: planners.data,
    users: users.data,
    newPlanners: newPlanners.data,
  }
}

export default IndexPage