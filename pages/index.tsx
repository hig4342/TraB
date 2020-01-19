import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import NoticeSwiper from '@components/NoticeSwiper'
import CurrentSituation from '@components/CurrentSituation'
import Descriptions from '@components/Descriptions'

type Board = {
  id: number;
  board_state: number;
  banner_image: string;
}

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
      <NoticeSwiper inline items={notices} />
      <Descriptions />
    </div>
  )
}

IndexPage.getInitialProps = async () => {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''
  const noticeResponse = await axios.get('https://api.unsplash.com/photos/random/?client_id=e3de30ec2ae17d45b25dfc2b9e10eae85591e332d281df76ca3d4119cb81c48e&count=10')
  const notices = noticeResponse.data.map((notice: any) => ({
    id: notice.id,
    board_state: 1,
    banner_image: notice.urls.raw+'&fit=crop&w=1080&h=270&q=80',
    created_at: notice.created_at,
    updated_at: notice.updated_at
  }))

  const planners = await axios.get(baseUrl + '/api/planners/count')
  return {
    notices: notices,
    planners: planners.data
  }
}

export default IndexPage