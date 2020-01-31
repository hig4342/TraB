import * as React from 'react'

import '@assets/Banner.less'
const Banner: React.SFC = () => {
  return (
    <div className='banner-wrapper'>
      <div className='banner-image'><img src='/domestic_banner.jpg'/></div>
      <div className='banner-text'><span>어디로 떠나시나요?</span></div>
    </div>
  )
}

export default Banner