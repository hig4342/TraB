import * as React from 'react'
import { Comment, List, Avatar, Rate, Button } from 'antd'
import { Reply } from 'type'
import Link from 'next/link'
//import axios from 'axios'
import TextArea from 'antd/lib/input/TextArea'
import '@assets/CommentList.less'
import { Form } from 'antd'

//const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  comments: Reply[];
}

const CommentList: React.SFC<Props> = ({comments})=> {

  // const writeComment = (baseUrl + '/api/planners/reply') => {
  //   axios.post('')
  // }

  return (
    <div className='comment-list-wrapper'>
      <div className='comment-write'>
        <Form>
          <Form.Item>
            <Rate allowHalf/>
          </Form.Item>
          <Form.Item>
            <TextArea rows={4} placeholder='댓글'/>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='button-color'>작성</Button>
          </Form.Item>
        </Form>
      </div>
      <List
        itemLayout="horizontal"
        className='comment-list'
        header={`${comments.length}개의 답글`}
        dataSource={comments}
        renderItem={item => (
          <List.Item>
            <Comment
              datetime={<Rate allowHalf disabled defaultValue={item.rate}/>}
              avatar={<Avatar src={item.User.profile_image ? item.User.profile_image : '/defaultprofile.png'}/>}
              author={<Link href={`/designer/${item.User.id}`}><a>{item.User.nickname} {item.User.email}</a></Link>}
              content={<span>{item.content}</span>}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default CommentList