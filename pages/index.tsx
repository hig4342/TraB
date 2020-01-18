import * as React from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import Counter from '@components/Counter'
import useUser from '@hooks/useUser'

const IndexPage: NextPage = () => {
  const {user} = useUser()

  return (
    <div>
      <h1>메인화면</h1>
      <p>
        <Link href="/auth/signin">
          <a>로그인</a>
        </Link>
      </p>
      <p>{user.email}</p>
      <Counter />
    </div>
  )
}

export default IndexPage