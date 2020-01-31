import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Board, Planner, Country, Theme } from 'type'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
//import NoticeSwiper from '@components/NoticeSwiper'
import FilterBox from '@components/FilterBox'
import PlannerList from '@components/PlannerList'
import '@assets/Planner.less'
import HotPlannerList from '@components/HotPlannerList'
import Banner from '@components/Banner'

const NoticeSwiper = dynamic(
  () => import('@components/NoticeSwiper'),
  { ssr: false }
)

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  advertisements: Board[];
  planners: Planner[];
  hotplanners: Planner[];
  countries: Country[];
  themes: Theme[];
}

const Domestic_Planner: NextPage<Props> = ({ advertisements, planners, hotplanners, countries, themes })=> {

  const [country, setCountry] = React.useState(0)
  const [city, setCity] = React.useState<Array<CheckboxValueType>>([])
  const [theme, setTheme] = React.useState<Array<CheckboxValueType>>([])

  const handleCountry = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setCountry(e.target.value)
    setCity([])
  }

  const handleCity = (checkedValues: CheckboxValueType[]) => {
    console.log('checkbox checked', checkedValues);
    setCity(checkedValues)
  }

  const handleTheme = (checkedValues: CheckboxValueType[]) => {
    console.log('checkbox checked', checkedValues);
    setTheme(checkedValues)
  }

  return (
    <div className='planner_list' style={{width: '100%'}}>
      <Banner />
      <NoticeSwiper items={advertisements} inline/>
      <div className='hot-planner'>
        <h1 className='small-title'>이번주 Hot한 계획표!</h1>
        <h4 className='sub-title'>금주에 가장 많은 사랑을 받은 여행 계획표들 입니다!</h4>
        <HotPlannerList items={hotplanners} />
      </div>
      <div className='new-planner'>
        <h1 className='big-title'>국내 여행계획표 열람하기</h1>
        <FilterBox
          items={countries}
          themes={themes}
          country={country}
          handleCountry={handleCountry}
          city={city}
          handleCity={handleCity}
          theme={theme}
          handleTheme={handleTheme}
        />
        <PlannerList items={planners} country={country} city={city} themes={theme}/>
      </div>
    </div>
  )
}

Domestic_Planner.getInitialProps = async () => {
  const advertisements = await axios.get(baseUrl + '/api/boards/advertisements')
  const planner = await axios.get(baseUrl + '/api/planners/domestic')
  const hotplanner = await axios.get(baseUrl + '/api/planners/domestic')
  const country = await axios.get(baseUrl + '/api/countries')
  const city = await axios.get(baseUrl + '/api/cities')
  const theme = await axios.get(baseUrl + '/api/themes')
  return {
    advertisements: advertisements.data,
    planners: planner.data,
    hotplanners: hotplanner.data,
    countries: country.data,
    cities: city.data,
    themes: theme.data,
  }
}

export default Domestic_Planner