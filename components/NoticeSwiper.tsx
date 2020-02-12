import * as React from 'react'
import Swiper from 'react-id-swiper';
import { SwiperOptions } from 'swiper'
import Link from 'next/link';
import { Board } from 'type';

import 'swiper/css/swiper.css'
import '@assets/NoticeSwiper.less'

type Props = {
  items: Board[]
  inline?: boolean
  rounded?: boolean
}

const NoticeSwiper: React.SFC<Props> = ({items, inline=false, rounded=false})=> {


  const options: SwiperOptions = { 
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      dynamicBullets: true,
      clickable: true,
      renderBullet: (_index, className) => {
        return `<span class="${className}"></span>`;
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
    autoplay: true,
  }

  return (
    <Swiper
      {...options}
      containerClass={"notice-swiper swiper-container" + (inline ? ' inline' : '') + (rounded ? ' rounded' : '')}
    >
      {
        items.map((item, index) => {
          if(item.board_state === 1){
            return (
              <div className='item-wrapper' key={index}>
                <Link href={`/board/${item.id}`}><img src={item.banner_image} /></Link>
              </div>
            )
          } else {
            return (
              <div className='item-wrapper' key={index}>
                <a target='_blank' href={item.ad_link}><img src={item.banner_image} /></a>
              </div>
            )
          }
        })
      }
    </Swiper>
  )
}

export default NoticeSwiper