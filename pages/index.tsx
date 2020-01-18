import * as React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { NextPage } from 'next'
import Counter from '@components/Counter'
import NoticeSwiper from '@components/NoticeSwiper'

type Board = {
  id: number;
  board_state: number;
  banner_image: string;
}

type Props = {
  notices: Board[]
  inline?: boolean
}

const IndexPage: NextPage<Props> = ({notices}) => {

  return (
    <div>
      <NoticeSwiper items={notices}/>
      <h1>메인화면</h1>
      <p>
        <Link href="/auth/signin">
          <a>로그인</a>
        </Link>
      </p>
      <Counter />
    </div>
  )
}

IndexPage.getInitialProps = async () => {
  const noticeResponse = await axios.get('https://api.unsplash.com/photos/?client_id=e3de30ec2ae17d45b25dfc2b9e10eae85591e332d281df76ca3d4119cb81c48e')
  const notices = noticeResponse.data.map((notice: any) => ({
    id: notice.id,
    board_state: 1,
    banner_image: notice.urls.raw+'&fit=crop&w=1080&h=270&q=80',
    created_at: notice.created_at,
    updated_at: notice.updated_at
  }))
  return {
    notices: notices
  }
}

export default IndexPage