import * as React from 'react'
import { Country, Theme } from 'type'
import { Checkbox, Radio, Row, Col } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import { CheckboxOptionType, CheckboxValueType } from 'antd/lib/checkbox/Group'
import '@assets/FilterBox.less'

type Props = {
  nation?: 'domestic' | 'foreign'
  items: Country[]
  themes: Theme[]
  country: number
  handleCountry: (e: RadioChangeEvent) => void
  city: CheckboxValueType[]
  handleCity: (checkedValues: CheckboxValueType[]) => void
  theme?: CheckboxValueType[]
  handleTheme?: (checkedValues: CheckboxValueType[]) => void
}

const FilterBox: React.SFC<Props> = ({ nation='domestic', items, themes, country, handleCountry, city, handleCity, theme, handleTheme }) => {

  if (nation == 'domestic') {
    country = 1
  } else {
    items = items.filter(item => item.id !== 1)
  }

  const optionsCountries: CheckboxOptionType[] = items.map(item => ({
    label: item.country_name,
    value: item.id,
  }))
  optionsCountries.unshift({
    label: '전체',
    value: 0
  })

  const selectcountry = country === 0 ? [] : items.filter(item => item.id === country)
  let optionsCities: CheckboxOptionType[];
  if (selectcountry[0]) {
    const citydata = selectcountry[0].Cities
    optionsCities = citydata.map(item => ({
      label: item.city_name,
      value: item.id
    }))
  } else optionsCities = []

  const optionsThemes: CheckboxOptionType[] = themes.map(item => ({
    label: item.name,
    value: item.id,
  }))

  return (
    <div className='filter-box-wrapper'>
      <div className='filter-box'>
        <div className='filter-item' style={{ display: nation === 'foreign' ? 'block' : 'none'}}>
          <Row>
            <Col xs={24}>
              <div className='filter-name'><span>-국가별 필터-</span></div>
            </Col>
            <Col xs={18}>
              <Radio.Group options={optionsCountries} value={country} onChange={handleCountry}/>
            </Col>
          </Row>
        </div>
        <div className='filter-item' style={{ display: country !== 0 ? 'block' : 'none'}}>
          <Row>
            <Col xs={24}>
              <div className='filter-name'><span>-지역별 필터-</span></div>
            </Col>
            <Col xs={18}>
              <Checkbox.Group options={optionsCities} value={city} onChange={handleCity}/>
            </Col>
          </Row>
        </div>
      </div>
      <div className='filter-item' style={{ display: theme ? 'block' : 'none'}}>
        <Row>
          <Col xs={24}>
            <div className='filter-name'><span>-테마 필터-</span></div>
          </Col>
          <Col xs={18}>
          <Checkbox.Group options={optionsThemes} value={theme} onChange={handleTheme}/>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FilterBox