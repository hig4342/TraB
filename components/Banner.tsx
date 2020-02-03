import * as React from 'react'

import '@assets/Banner.less'

type Props = {
  region: 'domestic' | 'foreign';
}
const Banner: React.SFC<Props> = ({ region }) => {
  return (
    region === 'domestic' ? (
      <div className='banner-wrapper domestic'>
        <div className='banner-image'><img src='/domestic_banner.jpg'/></div>
        <div className='banner-text'><span>국내 여행계획표</span></div>
      </div>
    ) : (
      <div className='banner-wrapper foreign'>
        <div className='banner-image'><img src='/foreign_banner.jpg'/></div>
        <div className='banner-text'><span>해외 여행계획표</span></div>
      </div>
    )
  )
}

export default Banner