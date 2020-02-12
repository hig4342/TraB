import * as React from 'react'

import '@assets/Banner.less'

type Props = {
  type: 'domestic' | 'foreign' | 'favorite';
}
const Banner: React.SFC<Props> = ({ type }) => {
  return (
    type === 'domestic' ? (
      <div className='banner-wrapper domestic'>
        <div className='banner-image'><img src='/domestic_banner.jpg'/></div>
        <div className='banner-text'><span>국내 여행계획표</span></div>
      </div>
    )
    : type === 'foreign' ? (
      <div className='banner-wrapper foreign'>
        <div className='banner-image'><img src='/foreign_banner.jpg'/></div>
        <div className='banner-text'><span>해외 여행계획표</span></div>
      </div>
    ) : (
      <div className='banner-wrapper favorite'>
        <div className='banner-image'><img src='/domestic_banner.jpg'/></div>
        <div className='banner-text'><span>내가 찜한 계획표</span></div>
      </div>
    )
  )
}

export default Banner