import * as React from 'react'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import axios from 'axios'
import useUser from '@hooks/useUser'
import { Favorite } from 'type'

type Props = {
  favorites: Favorite[]
  plannerId: number
}

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

const FavoriteButton: React.SFC<Props> = ({favorites, plannerId}) => {

  const { user } = useUser()
  const [filled, setFilled] = React.useState(false)
  const [favorited, setFavorited] = React.useState(favorites.findIndex(favorite => favorite.UserId === user.id && favorite.favorite) !== -1)
  const favoriteCSS: React.CSSProperties = {
    color: favorited ? 'rgba(256, 0, 0, 0.50)' : 'rgba(0, 0, 0, 0.70)'
  }
  const handleFill = () => {
    setFilled(true)
  }

  const handleEmpty = () => {
    setFilled(false)
  }

  const handleFavorite = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    if(favorited) {
      axios.patch(baseUrl + `/api/planners/favorite/${plannerId}`, {
        UserId: user.id,
        favorite: false
      }).then(() => setFavorited(false))
    } else {
      axios.patch(baseUrl + `/api/planners/favorite/${plannerId}`, {
        UserId: user.id,
        favorite: true
      }).then(() => setFavorited(true))
    }
  }

  return (
    <span className='favorite-button' onClick={handleFavorite} onMouseOver={handleFill} onMouseLeave={handleEmpty}>
      {
        filled || favorited ?
        <HeartFilled style={favoriteCSS}/>
        :
        <HeartOutlined style={favoriteCSS}/>
      }
    </span>
  )
}

export default FavoriteButton