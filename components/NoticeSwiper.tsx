import * as React from 'react'
import Swiper from 'react-id-swiper';
import { SwiperOptions } from 'swiper'
import Link from 'next/link';

import 'swiper/css/swiper.css'

type Board = {
  id: number;
  board_state: number;
  banner_image: string;
}

type Props = {
  items: Board[]
  inline?: boolean
}

const NoticeSwiper: React.SFC<Props> = ({items, inline=false})=> {

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
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
  }

  return (
    <Swiper {...options} containerClass={"notice-swiper swiper-container" + (inline ? ' inline' : '')}>
      {
        items.map((item) => {
          if(item.board_state === 1){
            return (
              <div className='item-wrapper' key={item.id}><img src={item.banner_image} /></div>
            )
          } else {
            return (
              <div className='item-wrapper' key={item.id}><Link href={`/board/${item.id}`}><img src={item.banner_image} /></Link></div>
            )
          }
        })
      }
    </Swiper>
  )
}

export default NoticeSwiper