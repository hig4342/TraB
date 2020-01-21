import * as React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Descriptions } from 'antd'
import { Planner, Theme } from 'type'
import '@assets/PlannerContent.less'

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
    <Descriptions.Item label='필터'>{ planner.themes_id.length !== 0 ? planner.themes_id.map(theme => <span style={{ margin: 5 }}key={theme}>{themes[theme].name}</span>) : null}</Descriptions.Item>
      </Descriptions>
      {
        planner.contents_image.map((content_image, index) => (
          <div className='planner-content-wrapper' key={index}>
            <div className='planner-image'><img src={content_image} /></div>
            <div className='planner-content'>{ ReactHtmlParser(planner.contents_text[index])}</div>
          </div>
        ))
      }
    </div>
  )
}

export default PlannerContent