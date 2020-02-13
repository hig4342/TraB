import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Planner, Favorite, Board } from 'type'
import MyFavoritePlanner from '@components/MyFavoritePlanner'
import NoticeSwiper from '@components/NoticeSwiper'
import Banner from '@components/Banner'
import SearchBox from '@components/SearchBox'
import useUser from '@hooks/useUser'
import '@assets/Mypage.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  advertisements: Board[]
}
const MyFavorite: NextPage<Props> = ({advertisements})=> {

  const { user, isLogin } = useUser()
  const [planners, setPlanners] = React.useState<Planner[]>([])
  const [searchText, setSearchText] = React.useState('')
  
  React.useEffect(() => {
    if(isLogin) {
      handlePlanners()
    }
  }, [user])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

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
      <SearchBox searchText={searchText} handleSearch={handleSearch} placeholder='지역을 검색하세요!'/>
    { isLogin ?
      <div className='mypage' style={{width: '100%', marginTop: '2rem'}}>
        <MyFavoritePlanner planners={planners} handlePlanners={handlePlanners} searchText={searchText}/>
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