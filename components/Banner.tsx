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
        <div className='banner-text'><span>한국 어디까지 가봤니?</span></div>
      </div>
    ) : (
      <div className='banner-wrapper foreign'>
        <div className='banner-image'><img src='/domestic_banner.jpg'/></div>
        <div className='banner-text'><span>외쿡 Foreign País extranjero 外國<p style={{marginBottom: 0}}>어디까지 가봤니?</p></span></div>
      </div>
    )
  )
}

export default Banner