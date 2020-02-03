import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { Board, User, Country } from 'type'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
// import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import CountrySelector from '@components/CountrySelector'
import DesignerList from '@components/DesignerList'
// import FilterBox from '@components/FilterBox'
import NoticeSwiper from '@components/NoticeSwiper'
import '@assets/Designer.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  advertisements: Board[]
  countries: Country[]
  designers: User[]
}

const Designer: NextPage<Props> = ({ advertisements, designers, countries })=> {

  const [nation, setNation] = React.useState('all')
  // const [country, setCountry] = React.useState('')
  // const [city, setCity] = React.useState<Array<CheckboxValueType>>([])
  // const [theme, setTheme] = React.useState<Array<CheckboxValueType>>([])

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setNation(e.target.value)
  }

  console.log(countries)
  // const handleCountry = (e: RadioChangeEvent) => {
  //   console.log('radio checked', e.target.value);
  //   setCountry(e.target.value)
  // }

  // const handleCity = (checkedValues: Array<CheckboxValueType>) => {
  //   console.log('checkbox checked', checkedValues);
  //   setCity(checkedValues)
  // }

  // const handleTheme = (checkedValues: Array<CheckboxValueType>) => {
  //   console.log('checkbox checked', checkedValues);
  //   setTheme(checkedValues)
  // }

  return (
    <div className='designer-list' style={{width: '100%'}}>
      <NoticeSwiper items={advertisements} inline/>
      <div className='new-designer'>
        <h1 className='big-title'>트래비(TraB) 여행 설계자</h1>
        <CountrySelector value={nation} onChange={onChange}/>
        {/* <FilterBox
          foreign={nation === 'foreign'}
          country={country}
          handleCountry={handleCountry}
          city={city}
          handleCity={handleCity}
          theme={theme}
          handleTheme={handleTheme}
          countrylist={countrylist}
          citylist={citylist}
          themelist={themelist}
          mode='designer'/> */}
        <DesignerList designers={designers}/>
      </div>
      <div className='professional-designer'>
        <h1 className='small-title'>편한계획표 설계자 명단</h1>
        <DesignerList premium designers={designers}/>
      </div>
      {/* <div className='hot-designer'>
        <h1 className='small-title'>이번주 명예의 설계자</h1>
        <h4 className='sub-title'>금주에 가장 많은 활동을 한 여행 설계자들 입니다!</h4>
        <DesignerList designers={designers}/>
      </div> */}
    </div>
  )
}

Designer.getInitialProps = async () => {
  const advertisements = await axios.get(baseUrl + '/api/boards/advertisements')
  const countries = await axios.get(baseUrl + '/api/countries')
  const designer = await axios.get( baseUrl + '/api/users/designer')
  return {
    advertisements: advertisements.data,
    countries: countries.data,
    designers: designer.data
  }
}

export default Designer