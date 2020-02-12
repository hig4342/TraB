import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Planner, Favorite } from 'type'
import MyFavoritePlanner from '@components/MyFavoritePlanner'
import useUser from '@hooks/useUser'
import '@assets/Mypage.less'

const MyFavorite: NextPage = ()=> {

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
    <h1 className='small-title'>찜한 계획표 목록</h1>
    { isLogin ?
      <div className='mypage' style={{width: '100%'}}>
        <MyFavoritePlanner planners={planners} handlePlanners={handlePlanners}/>
      </div>
      : null
    }
    </div>
  )
}

MyFavorite.getInitialProps = async () => {
  return {
    
  }
}

export default MyFavorite