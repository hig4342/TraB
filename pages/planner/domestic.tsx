import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Board, Planner, Country, Theme } from 'type'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import FilterBox from '@components/FilterBox'
import PlannerList from '@components/PlannerList'
import Banner from '@components/Banner'
import '@assets/Planner.less'

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
  theme_q?: string | string[];
}

const Domestic_Planner: NextPage<Props> = ({ advertisements, planners, countries, themes, theme_q })=> {

  const [country, setCountry] = React.useState(0)
  const [city, setCity] = React.useState<Array<CheckboxValueType>>([])
  const [theme, setTheme] = React.useState<Array<CheckboxValueType>>(theme_q ? Array.isArray(theme_q) ? theme_q.map(item => Number(item)) : [Number(theme_q)] : [])

  const handleCountry = (e: RadioChangeEvent) => {
    setCountry(e.target.value)
    setCity([])
  }

  const handleCity = (checkedValues: CheckboxValueType[]) => {
    setCity(checkedValues)
  }

  const handleTheme = (checkedValues: CheckboxValueType[]) => {
    setTheme(checkedValues)
  }

  const addCity = (value: number) => {
    let checkedCity = city.concat(value);
    setCity(checkedCity)
  }

  const deleteCity = (value: number) => {
    let checkedCity = city.filter(item => item !== value);
    setCity(checkedCity)
  }

  const addTheme = (value: number) => {
    let checkedTheme = theme.concat(value);
    setTheme(checkedTheme)
  }

  const deleteTheme = (value: number) => {
    let checkedTheme = theme.filter(item => item !== value);
    setTheme(checkedTheme)
  }

  return (
    <div className='planner_list' style={{width: '100%'}}>
      <Banner type='domestic'/>
      <NoticeSwiper items={advertisements} inline rounded/>
      <div className='new-planner'>
        <FilterBox
          items={countries}
          themes={themes.sort((a, b) => (a.name === 'P(편)한 계획표' || a.name === 'ITP 여행계획표' ? 1 : b.name === 'P(편)한 계획표' || b.name === 'ITP 여행계획표' ? -1 : 0))}
          country={country}
          handleCountry={handleCountry}
          city={city}
          handleCity={handleCity}
          theme={theme}
          handleTheme={handleTheme}
          addCity={addCity}
          deleteCity={deleteCity}
          addTheme={addTheme}
          deleteTheme={deleteTheme}
        />
        <PlannerList items={planners} country={country} city={city} themes={theme}/>
      </div>
    </div>
  )
}

Domestic_Planner.getInitialProps = async (ctx) => {
  const advertisements = await axios.get(baseUrl + '/api/boards/advertisements?region=2')
  const planner = await axios.get(baseUrl + '/api/planners/domestic')
  const country = await axios.get(baseUrl + '/api/countries')
  const city = await axios.get(baseUrl + '/api/cities')
  const theme = await axios.get(baseUrl + '/api/themes')
  const { theme_q } = ctx.query
  return {
    advertisements: advertisements.data,
    planners: planner.data,
    countries: country.data,
    cities: city.data,
    themes: theme.data,
    theme_q: theme_q
  }
}

export default Domestic_Planner