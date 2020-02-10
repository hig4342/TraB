import * as React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Descriptions, Tag } from 'antd'
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
      <Descriptions className='planner-information' column={1}>
        <Descriptions.Item label='제목'>{planner.title}</Descriptions.Item>
        <Descriptions.Item label='나라'>{planner.Country.country_name}</Descriptions.Item>
        <Descriptions.Item label='도시'>{planner.City.city_name}</Descriptions.Item>
        <Descriptions.Item label='필터'>
          {
            planner.themes_id.length !== 0 ? 
            themes.filter(theme => planner.themes_id.includes(theme.id)).map(theme => <Tag key={theme.id}><Link href={`/planner/${planner.Country.id === 1 ? "domestic" : "foreign"}?theme_q=${theme.id}`}><a>#{theme.name}</a></Link></Tag>)
            : null
          }
        </Descriptions.Item>
      </Descriptions>
      <div className='planner-content'>{ ReactHtmlParser(planner.contents) }</div>
    </div>
  )
}

export default PlannerContent