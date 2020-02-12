import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Board } from 'type'
import ReactHtmlParser from 'react-html-parser'
import { Descriptions, Avatar } from 'antd'
import BoardCommentList from '@components/BoardCommentList'
import '@assets/BoardItem.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  post: Board
}

const Post: NextPage<Props> = ({post})=> {
  
  return (
    <div className='post' style={{width: '100%'}}>
      <Descriptions colon={false} column={1}>
        <Descriptions.Item label={post.board_state === 2 ? '공지사항)' : ''} className='title-wrapper'><span>{post.title}</span></Descriptions.Item>
        <Descriptions.Item className='user-wrapper'>
          <Avatar src={post.User.profile_image ? post.User.profile_image : '/defaultprofile.png'} /><span>{post.User.nickname}</span><span>{post.User.email}</span>
        </Descriptions.Item>
        {post.board_state === 1 ? <Descriptions.Item className='content-wrapper' span={2}><div><img src={post.main_image}/></div></Descriptions.Item> : null }
        <Descriptions.Item className='content-wrapper' span={2}><div className='post-content'>{ ReactHtmlParser(post.content)}</div></Descriptions.Item>
      </Descriptions>
      <BoardCommentList board_id={post.id} comments={post.BoardReplies.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))}/>
    </div>
  )
}

Post.getInitialProps = async (req) => {
  const id = req.query.id

  const post = await axios.get(baseUrl + `/api/boards/${id}`)
  return {
    post: post.data
  }
}

export default Post