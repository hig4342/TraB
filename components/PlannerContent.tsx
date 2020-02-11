import * as React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Descriptions } from 'antd'
import { Planner, Theme } from 'type'
import '@assets/PlannerContent.less'
import Link from 'next/link'

type Props = {
  planner: Planner;
  themes: Theme[];
}

const PlannerContent: React.SFC<Props> = ({planner, themes}) => {

  return (
    <div className='planner'>
      <Descriptions className='planner-information' column={24} bordered>
        <Descriptions.Item label='제목' span={24}>{planner.title}</Descriptions.Item>
        <Descriptions.Item label='나라' span={24}>{planner.Country.country_name}</Descriptions.Item>
        <Descriptions.Item label='도시' span={24}>{planner.City.city_name}</Descriptions.Item>
        <Descriptions.Item label='필터' span={24}>
          {
            planner.themes_id.length !== 0 ? 
            themes.filter(theme => planner.themes_id.includes(theme.id)).map(theme => <Link key={theme.id} href={`/planner/${planner.Country.id === 1 ? "domestic" : "foreign"}?theme_q=${theme.id}`}><a>#{theme.name}</a></Link>)
            : null
          }
        </Descriptions.Item>
      </Descriptions>
      <div className='planner-content'>{ ReactHtmlParser(planner.contents) }</div>
    </div>
  )
}

export default PlannerContent