import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Board, Planner, Country, Theme } from 'type'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import NoticeSwiper from '@components/NoticeSwiper'
import FilterBox from '@components/FilterBox'
import PlannerList from '@components/PlannerList'
import '@assets/Planner.less'


const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  notices: Board[];
  planners: Planner[];
  hotplanners: Planner[];
  countries: Country[];
  themes: Theme[];
}

const Foreign_Planner: NextPage<Props> = ({ notices, planners, hotplanners, countries, themes })=> {

  const [country, setCountry] = React.useState(0)
  const [city, setCity] = React.useState<CheckboxValueType[]>([])
  const [theme, setTheme] = React.useState<CheckboxValueType[]>([])

  const [country2, setCountry2] = React.useState(0)
  const [city2, setCity2] = React.useState<Array<CheckboxValueType>>([])

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

  const handleCountry2 = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setCountry2(e.target.value)
    setCity2([])
  }

  const handleCity2 = (checkedValues: CheckboxValueType[]) => {
    console.log('checkbox checked', checkedValues);
    setCity2(checkedValues)
  }

  return (
    <div className='planner_list' style={{width: '100%'}}>
      <NoticeSwiper items={notices} />
      <div className='new-planner'>
        <h1 className='big-title'>해외 여행계획표 열람하기</h1>
        <FilterBox
          nation='foreign'
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
      <div className='hot-planner'>
        <h1 className='small-title'>이번주 Hot한 계획표!</h1>
        <h4 className='sub-title'>금주에 가장 많은 사랑을 받은 여행 계획표들 입니다!</h4>
        <FilterBox
          nation='foreign'
          items={countries}
          themes={themes}
          country={country2}
          handleCountry={handleCountry2}
          city={city2}
          handleCity={handleCity2}
        />
        <PlannerList items={hotplanners} country={country2} city={city2} themes={[]}/>
      </div>
    </div>
  )
}

Foreign_Planner.getInitialProps = async () => {
  const notices = await axios.get(baseUrl + '/api/boards/notices')
  const planner = await axios.get(baseUrl + '/api/planners/foreign')
  const hotplanner = await axios.get(baseUrl + '/api/planners/foreign')
  const country = await axios.get(baseUrl + '/api/countries')
  const city = await axios.get(baseUrl + '/api/cities')
  const theme = await axios.get(baseUrl + '/api/themes')
  return {
    notices: notices.data,
    planners: planner.data,
    hotplanners: hotplanner.data,
    countries: country.data,
    cities: city.data,
    themes: theme.data,
  }
}

export default Foreign_Planner