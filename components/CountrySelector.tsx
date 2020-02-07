import * as React from 'react'
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import '@assets/CountrySelector.less'

type Props = {
  value: string
  onChange: (e: RadioChangeEvent) => void;
}

const CountrySelector: React.SFC<Props> = ({ value, onChange })=> {
  return (
    <div className='country-selector'>
      <Radio.Group buttonStyle='solid' value={value} onChange={onChange} size='large'>
        <Radio.Button value='all'>모든 여행지</Radio.Button>
        <Radio.Button value='domestic'>국내 여행지</Radio.Button>
        <Radio.Button value='foreign'>해외 여행지</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default CountrySelector