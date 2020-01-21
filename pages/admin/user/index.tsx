import * as React from 'react'
import _axios from 'axios'
import { NextPage } from 'next'

const User: NextPage = ()=> {
  return (
    <div className='example'>
      예제
    </div>
  )
}

User.getInitialProps = async () => {
  return {
    
  }
}

export default User