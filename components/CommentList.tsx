import * as React from 'react'
import { Comment, List, Avatar, Rate, Button } from 'antd'
import { Reply } from 'type'
import Link from 'next/link'
import TextArea from 'antd/lib/input/TextArea'
import '@assets/CommentList.less'

type Props = {
  comments: Reply[];
}

const CommentList: React.SFC<Props> = ({comments})=> {

  return (
    <div className='comment-list-wrapper'>
      <div className='comment-write'>
        <Rate allowHalf/>
        <TextArea rows={4} defaultValue={'댓글쓰는창'}/>
        <Button className='button-color'>작성</Button>
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