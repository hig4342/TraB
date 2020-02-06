import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Planner, Theme } from 'type'
import DesignerDescription from '@components/DesignerDescription'
import AdminPlannerContent from '@components/AdminPlannerContent'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  planner: Planner;
  themes: Theme[];
}

const AdminPlanner: NextPage<Props> = ({planner, themes})=> {

  return (
    <div className='planner' style={{width: '100%'}}>
      <DesignerDescription designer={planner.User} plannerId={planner.id}/>
      <AdminPlannerContent planner={planner} themes={themes}/>
    </div>
  )
}

AdminPlanner.getInitialProps = async (req) => {
  const id = req.query.id

  const planner = await axios.get(baseUrl+`/api/admin/planners/${id}`)
  const theme = await axios.get(baseUrl+'/api/themes')
  return {
    planner: planner.data,
    themes: theme.data
  }
}

export default AdminPlanner