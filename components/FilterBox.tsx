import * as React from 'react'
import { Country, Theme } from 'type'
import { Checkbox, Radio, Row, Col, Modal, Button } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import { CheckboxOptionType, CheckboxValueType } from 'antd/lib/checkbox/Group'
import FilterButton from '@components/FilterButton';
import { SearchOutlined } from '@ant-design/icons';
import '@assets/FilterBox.less'

type Props = {
  nation?: 'domestic' | 'foreign'
  items: Country[]
  themes: Theme[]
  country: number
  handleCountry: (e: RadioChangeEvent) => void
  city: CheckboxValueType[]
  handleCity: (checkedValues: CheckboxValueType[]) => void
  theme: CheckboxValueType[]
  handleTheme: (checkedValues: CheckboxValueType[]) => void
  addCity: (value: number) => void
  deleteCity: (value: number) => void
  addTheme: (value: number) => void
  deleteTheme: (value: number) => void
}

const FilterBox: React.SFC<Props> = ({ nation='domestic', items, themes, country, handleCountry, city, handleCity, theme, handleTheme, addCity, deleteCity, addTheme, deleteTheme }) => {

  const [visible, setVisible] = React.useState(false)
  const [themeVisible, setThemeVisible] = React.useState(false)

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

  const onThemeShow = () => {
    setThemeVisible(true)
  }

  const onThemeHide = () => {
    setThemeVisible(false)
  }

  return (
    <div className='filter-box-wrapper'>
      <div className='mobile-search-box'>
        <Button onClick={onShow}>어디로 떠나고 싶으세요?</Button>
      </div>
      <Modal
        title='어디로 떠나고 싶으세요?'
        visible={visible}
        onOk={onHide}
        onCancel={onHide}
        footer={<div className='mobile-filter-footer'><Button type='primary' icon={<SearchOutlined />} block onClick={onHide}>검색</Button></div>}
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
              <div key={Number(city.value)} className='mobile-search'><FilterButton value={Number(city.value)} add={addCity} remove={deleteCity} text={String(city.label)}/></div>
            ))
          }
          </Col>
        </Row>
      </Modal>
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
      <div className='mobile-search-box'>
        <Button onClick={onThemeShow}>어떤 종류의 계획표가 좋으세요?</Button>
      </div>
      <Modal
        title='어떤 종류의 계획표가 좋으세요?'
        visible={themeVisible}
        onOk={onThemeHide}
        onCancel={onThemeHide}
        footer={<div className='mobile-filter-footer'><Button type='primary' icon={<SearchOutlined />} block onClick={onThemeHide}>검색</Button></div>}
      >
        <Row align='middle' justify='center' gutter={16}>
          <Col span={12} className='mobile-search-wrapper'>
          {
            optionsThemes.map(theme => (
              <div key={Number(theme.value)} className='mobile-search'><FilterButton value={Number(theme.value)} add={addTheme} remove={deleteTheme} text={String(theme.label)}/></div>
            ))
          }
          </Col>
        </Row>
      </Modal>
      <div className='theme-box filter-item'>
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