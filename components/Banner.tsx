import * as React from 'react'

import '@assets/Banner.less'
const Banner: React.SFC = () => {
  return (
    <div className='banner-wrapper'>
      <div className='banner-image'><img src='/domestic_banner.jpg'/></div>
      <div className='banner-text'><span>외쿡 Foreign País extranjero 外國<p style={{marginBottom: 0}}>어디가 좋을까?</p></span></div>
    </div>
  )
}

export default Banner