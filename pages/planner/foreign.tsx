import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Board, Planner, Country, Theme } from 'type'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import FilterBox from '@components/FilterBox'
import PlannerList from '@components/PlannerList'
import '@assets/Planner.less'
import Banner from '@components/Banner'

const NoticeSwiper = dynamic(
  () => import('@components/NoticeSwiper'),
  { ssr: false }
)

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  advertisements: Board[];
  planners: Planner[];
  countries: Country[];
  themes: Theme[];
}

const Foreign_Planner: NextPage<Props> = ({ advertisements, planners, countries, themes })=> {

  const [country, setCountry] = React.useState(0)
  const [city, setCity] = React.useState<CheckboxValueType[]>([])
  const [theme, setTheme] = React.useState<CheckboxValueType[]>([])

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
      <Banner region='foreign' />
      <NoticeSwiper items={advertisements} inline/>
      <div className='new-planner'>
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
    </div>
  )
}

Foreign_Planner.getInitialProps = async () => {
  const advertisements = await axios.get(baseUrl + '/api/boards/advertisements')
  const planner = await axios.get(baseUrl + '/api/planners/foreign')
  const country = await axios.get(baseUrl + '/api/countries')
  const city = await axios.get(baseUrl + '/api/cities')
  const theme = await axios.get(baseUrl + '/api/themes')
  return {
    advertisements: advertisements.data,
    planners: planner.data,
    countries: country.data,
    cities: city.data,
    themes: theme.data,
  }
}

export default Foreign_Planner