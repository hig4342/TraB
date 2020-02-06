import * as React from 'react'
import axios from 'axios'
import { User } from 'type'
import { NextPage } from 'next'
import DesignerDescription from '@components/DesignerDescription'


const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  designer: User
}

const DesignerPage: NextPage<Props> = ({designer})=> {

  React.useEffect(() => {
    console.log(designer)
  }, [])

  return (
    <div className='designer-page'>
      <DesignerDescription designer={designer} />
    </div>
  )
}

DesignerPage.getInitialProps = async (req) => {
  const id = req.query.id

  const designer = await axios.get(baseUrl + `/api/users/${id}`)
  return {
    designer: designer.data
  }
}

export default DesignerPage