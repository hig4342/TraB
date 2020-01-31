import * as React from 'react'
import Swiper, { SwiperInstance } from 'react-id-swiper';
import { SwiperOptions } from 'swiper'
import Link from 'next/link';
import { Modal } from 'antd';
import { Board } from 'type';

import 'swiper/css/swiper.css'
import '@assets/NoticeSwiper.less'

type Props = {
  items: Board[]
  inline?: boolean
}

const NoticeSwiper: React.SFC<Props> = ({items, inline=false})=> {

  const [swiper, setSwiper] = React.useState<SwiperInstance>(null)
  const [visible, setVisible] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [image, setImage] = React.useState('')
  const [autoplay, setAutoplay] = React.useState(true)

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
  }

  const handleShow = (item: Board) => {
    setTitle(item.title)
    setImage(item.main_image)
  }

  const handleHide = () => {
    setVisible(false)
    setAutoplay(true)
  }

  const handleSwiper = (nowswiper: SwiperInstance) => {
    console.log(nowswiper)
    setSwiper(nowswiper)
  }

  return (
    <>
    <Swiper
      {...options}
      getSwiper={handleSwiper}
      autoplay={autoplay}
      containerClass={"notice-swiper swiper-container" + (inline ? ' inline' : '')}
      on={{
        slideChange: () => {
          console.log(swiper)
        }
        // click: () => {
        //   setVisible(true)
        //   setAutoplay(false)
        // }
      }}
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
                <img onClick={() => handleShow(item)} src={item.banner_image} />
              </div>
            )
          }
        })
      }
    </Swiper>
    <Modal
      title={title}
      centered
      visible={visible}
      width='1080'
      //onOk={onFinish}
      onCancel={handleHide}
    >
      <img style={{width: '100%'}} src={image}/>
    </Modal>
    </>
  )
}

export default NoticeSwiper