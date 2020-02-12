import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Planner, Favorite, Board } from 'type'
import MyFavoritePlanner from '@components/MyFavoritePlanner'
import NoticeSwiper from '@components/NoticeSwiper'
import Banner from '@components/Banner'
import useUser from '@hooks/useUser'
import '@assets/Mypage.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  advertisements: Board[]
}
const MyFavorite: NextPage<Props> = ({advertisements})=> {

  const { user, isLogin } = useUser()
  const [planners, setPlanners] = React.useState<Planner[]>([])

  React.useEffect(() => {
    if(isLogin) {
      handlePlanners()
    }
  }, [user])

  const handlePlanners = () => {
    axios.get(`/api/users/${user.id}/favorite`).then( result => {
      const favorites: Favorite[] = result.data
      setPlanners(favorites.map(favorite => (favorite.Planner)))
    })
  }

  return (
    <div className='mypage-wrapper' style={{width: '100%'}}>
      <Banner type='favorite'/>
      <NoticeSwiper items={advertisements} inline rounded/>
    { isLogin ?
      <div className='mypage' style={{width: '100%', marginTop: '2rem'}}>
        <MyFavoritePlanner planners={planners} handlePlanners={handlePlanners}/>
      </div>
      : null
    }
    </div>
  )
}

MyFavorite.getInitialProps = async () => {
  const advertisements = await axios.get(baseUrl + '/api/boards/advertisements')

  return {
    advertisements: advertisements.data,
  }
}

export default MyFavorite