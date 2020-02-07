import * as React from 'react'
import { Country, Theme } from 'type'
import { Checkbox, Radio, Row, Col, Modal, Button } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import { CheckboxOptionType, CheckboxValueType } from 'antd/lib/checkbox/Group'
import '@assets/FilterBox.less'
import FilterButton from '@components/FilterButton';

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
  addCity: (value: number) => void
  deleteCity: (value: number) => void
}

const FilterBox: React.SFC<Props> = ({ nation='domestic', items, themes, country, handleCountry, city, handleCity, theme, handleTheme, addCity, deleteCity }) => {

  const [visible, setVisible] = React.useState(false)

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

  const onShow = () => {
    setVisible(true)
  }

  const onHide = () => {
    setVisible(false)
  }

  return (
    <div className='filter-box-wrapper'>
      <div className='mobile-search-box'>
        <Button onClick={onShow}>어디로 떠나고 싶으세요?</Button>
        <Modal
          title='어디로 떠나고 싶으세요?'
          visible={visible}
          onOk={onHide}
          onCancel={onHide}
        >
          <Row align='middle' justify='center' gutter={16}>
            <Col span={12} className='mobile-search-wrapper' style={{ display: nation === 'foreign' ? 'block' : 'none'}}>
            <Radio.Group value={country} onChange={handleCountry} buttonStyle='solid'>
            {
              optionsCountries.map(country => (
                <div key={Number(country.value)} className='mobile-search'><Radio.Button value={country.value}>{country.label}</Radio.Button></div>
              ))
            }
            </Radio.Group>
            </Col>
            <Col span={12} className='mobile-search-wrapper'>
            {
              optionsCities.map(city => (
                <div key={Number(city.value)} className='mobile-search'><FilterButton value={Number(city.value)} addCity={addCity} deleteCity={deleteCity} text={String(city.label)}/></div>
              ))
            }
            </Col>
          </Row>
        </Modal>
      </div>
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