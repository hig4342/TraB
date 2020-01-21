import * as React from 'react'
import Swiper from 'react-id-swiper';
import { SwiperOptions } from 'swiper';
import { Card } from 'antd';

const { Meta } = Card
import 'swiper/css/swiper.css'
import '../assets/SellerSwiper.less'

type Seller = {
  id: number,
  nickname: string,
  profile_image: string,
  planable: Array<string>
}

type Props = {
  items: Array<Seller>
}

const SellerSwiper: React.SFC<Props> = ({items})=> {

  const options: SwiperOptions = {
    scrollbar: {
      el: '.swiper-scrollbar',
      hide: false
    },
    slidesPerView: 5,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    spaceBetween: 30,
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  }

  return (
    <Swiper {...options} containerClass="seller-swiper swiper-container">
      {
        items.map((item) => {
          return (
            <Card
              key={item.id}
              hoverable
              className="seller-card"
              cover={<img alt={`${item.nickname}-profile-img`} src={item.profile_image} />}
            >
              <Meta title={item.nickname} description={item.planable.toString()} />
            </Card>
          )
        })
      }
    </Swiper>
  )
}

export default SellerSwiper