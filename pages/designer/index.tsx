import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Board, User } from 'type'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import CountrySelector from '@components/CountrySelector'
import DesignerList from '@components/DesignerList'
import Banner from '@components/Banner'
import SearchBox from '@components/SearchBox'
import '@assets/Designer.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

const NoticeSwiper = dynamic(
  () => import('@components/NoticeSwiper'),
  { ssr: false }
)

type Props = {
  advertisements: Board[]
  designers: User[]
}

const Designer: NextPage<Props> = ({ advertisements, designers })=> {

  const [region, setRegion] = React.useState<'all' | 'domestic' | 'foreign'>('all')
  const [searchName, setSearchName] = React.useState('')
  // const [country, setCountry] = React.useState(0)
  // const [city, setCity] = React.useState<Array<CheckboxValueType>>([])

  const onChange = (e: RadioChangeEvent) => {
    setRegion(e.target.value)
  }

  // console.log(countries)

  // const handleCountry = (e: RadioChangeEvent) => {
  //   console.log('radio checked', e.target.value);
  //   setCountry(e.target.value)
  // }

  // const handleCity = (checkedValues: Array<CheckboxValueType>) => {
  //   console.log('checkbox checked', checkedValues);
  //   setCity(checkedValues)
  // }
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
  }

  return (
    <div className='designer-list' style={{width: '100%'}}>
      <Banner type='designer'/>
      <NoticeSwiper items={advertisements} inline rounded/>
      <div className='new-designer'>
        <SearchBox searchText={searchName} handleSearch={handleSearch} placeholder='닉네임을 검색하세요!'/>
        <CountrySelector value={region} onChange={onChange}/>
        <DesignerList designers={designers} searchName={searchName} region={region}/>
      </div>
      <div className='professional-designer'>
        <h1 className='small-title'>편한계획표 설계자 명단</h1>
        <DesignerList premium designers={designers}/>
      </div>
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