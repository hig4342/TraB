import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import jwtDecode from 'jwt-decode'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import ShowandPlan from '@components/ShowandPlan'
import CurrentSituation from '@components/CurrentSituation'  
import NewPlannerList from '@components/NewPlannerList'
import { Board, Planner } from 'type'
import useUser from '@hooks/useUser'
import usePopup from '@hooks/usePopup'
import { User } from '@reducers/userReducer'

const NoticeSwiper = dynamic(
  () => import('@components/NoticeSwiper'),
  { ssr: false }
)

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  notices: Board[]
  advertisements: Board[]
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

const IndexPage: NextPage<Props> = ({notices, advertisements, planners, users, newPlanners}) => {

  const {onLogin} = useUser();
  const { onVisible, handleContents } = usePopup();

  React.useEffect(() => {
    console.log(advertisements)
    const { auth } = Router.query;
    if ( auth === 'success' ) {
      handleContents('success')
      onVisible()
    }
    if ( auth === 'signup' ) {
      handleContents('signup')
      onVisible()
    }
    if ( auth === 'register' ) {
      handleContents('register')
      onVisible()
    }
    axios.get(baseUrl + '/api/auth/update').then( result => {
      const usertoken = result.data
      sessionStorage.setItem('usertoken', usertoken)
      const user: User = jwtDecode(usertoken)
      onLogin(user)
    })
  }, [])

  return (
    <div className='index-page'>
      <NoticeSwiper items={notices}/>
      <ShowandPlan />
      <CurrentSituation planners={planners} designers={users}/>
      <NewPlannerList domestic={newPlanners.domestic} foreign={newPlanners.foreign} advertisements={advertisements} />
    </div>
  )
}

IndexPage.getInitialProps = async () => {
  const notices = await axios.get(baseUrl + '/api/boards/notices')
  const advertisements = await axios.get(baseUrl + '/api/boards/advertisements')
  const planners = await axios.get(baseUrl + '/api/planners/count')
  const users = await axios.get(baseUrl + '/api/users/designer/count')
  const newPlanners = await axios.get(baseUrl + '/api/planners/new')

  return {
    notices: notices.data,
    advertisements: advertisements.data,
    planners: planners.data,
    users: users.data,
    newPlanners: newPlanners.data,
  }
}

export default IndexPage