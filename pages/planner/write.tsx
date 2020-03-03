import * as React from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Router from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Callbacks } from 'rc-field-form/lib/interface';
import { Form, Input, Button, Checkbox, message, Steps } from 'antd'
import UploadWrapper from '@components/UploadWrapper'
import useUser from '@hooks/useUser'
import { UploadFile } from 'antd/lib/upload/interface'
import { Theme } from 'type'
import '@assets/PlannerWrite.less'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

const EditorWrapper = dynamic(
  () => import('@components/EditorWrapper'),
  { ssr: false }
)

type Props = {
  themes: Theme[];
}

const PlannerWrite: NextPage<Props> = ({themes})=> {
  const [form] = Form.useForm()
  const {user, isLogin} = useUser()
  const [loading, setLoading] = React.useState(false)
  const [current, setCurrent] = React.useState(0)
  const [disabled, setDisabled] = React.useState(true)

  React.useEffect(() => {
    if(!isLogin) {
      Router.prefetch('/')
    }
  }, [user])
  
  const onFinish: Callbacks['onFinish'] = (values) => {
    setLoading(true)
    const country_name = values.country === '대한민국' ? '한국' : values.country
    const formdata = {
      title: values.title,
      UserId: user.id,
      country_name: country_name,
      city_name: values.city,
      thumbnail: values.thumbnail,
      contents: values.contents,
      themes_id: values.themes_id,
    }
    axios.post(baseUrl + '/api/planners', formdata).then( () => {
      setLoading(false)
      Router.push({
        pathname: '/',
        query: { process: 'complete' }
      })
    }).catch( err => {
      console.log(err)
    })
  };

  const handleThumnail = (fileList: UploadFile<any>[]) => {
    form.setFieldsValue({
      thumbnail: fileList[0].url
    })
  }

  const handleContents = (text: string) => {
    form.setFieldsValue({
      contents: text
    })
  }

  const onFinishFailed: Callbacks['onFinishFailed'] = (errorInfo) => {
    errorInfo.errorFields.forEach(error => {
      message.error(error.errors)
    })
  }

  const next = () => {
    const num = current + 1
    if( current === 1 ) setDisabled(false)
    setCurrent(num)
  }
  
  const handleStep = (current: number) => {
    setCurrent(current)
  }

  return (
    <div className='planner-write' style={{width: '100%'}}>
      <div className='planner-write-steps'>
        <Steps type='navigation' current={current} onChange={handleStep}>
          <Steps.Step title='유의사항'/>
          <Steps.Step title='계획표 작성법'/>
          <Steps.Step title='계획표 작성하기' disabled={disabled}/>
        </Steps>
      </div>
      {
        current === 0 ? (
          <div className='planner-notice'>
            <div>
              <h2>유의사항 1</h2>
              <p>밑의 계획표 양식은 1일치를 위한 것입니다.</p>
              <p>즉, 2일치 작성을 원하시면 두번 작성하셔서 등록해 주셔야 하는 부분을 유의하시길 바랍니다.</p>
            </div>
            <div>
              <h2>유의사항 2</h2>
              <p>여행지에 관련된 내용만을 계획표로 인정하여 정산합니다.</p>
              <p>즉, 여행지와 관련 없는 내용, 비행기를 탔다, 내렸다, 숙소에 도착했다 등의 내용은 계획표로 인정하지 않습니다.</p>
            </div>
            <div>
              <h2>유의사항 3</h2>
              <p>
                계획표에 사용하시는 사진은 가급적 본인이 직접 찍은 사진, 혹은 상업적으로 이용이 가능한 사진에 한하여 사용 부탁드립니다.
                후에 사진 저작권으로 문제가 발생할 시 트래비(TraB)의 책임은 전혀 없음을 알려드리며,
                모든 문제는 계획표 제작자가 책임 지셔야 하는 점을 알립니다.
              </p>
            </div>
          </div>
        ) :
        current === 1 ? (
          <div className='planner-notice'>
            <div>
              <h2>계획표 승인을 위한 꿀팁!</h2>
              <p>저희는 계획표를 크게 일반계획표와 프리미엄, 이렇게 두가지로 구분하여 서비스를 제공하고 있습니다.</p>
            </div>
            <div>
              <h2>일반계획표의 경우,</h2>
              <p>1) (1일치를 기준으로 관광 가능한) 2개 이상의 명소, 그에 대한 사진들, 본인이 느꼈던 코멘트,
     본인이 그 날 먹었던 음식 정보 (맛집, 메뉴 등 사진을 첨부하여 느낀바를 적어주시면 됩니다.)</p>
              <p>2) 만약 한군데에 대한 계획표를 작성한다면 세세하게 기록해줘야합니다.
     본인이 경험하고 다녔던 순서대로 사진에 맞춰 코멘트 작성해주시면 됩니다.</p>
            </div>
            <div>
              <h2>프리미엄의 경우,</h2>
              <p>1) (1일치를 기준으로 관광 가능한) 최소 3개의 명소, 개당 명소마다 본인이 경험했던 구체적인 정보를 기입해주세요.</p>
              <p>2) 만약 한군데에 대한 계획표를 작성한다면 어떤 방식으로 즐겼고, 해당 명소를 탐방하는 좋은 팁은 무엇인지가 명확해야합니다.
     (사진은 물론 다양해야하며 각 사진별로 코멘트가 필요합니다.)</p>
              <p>3) 해당 명소를 탐방하면서 본인이 먹었던 음식 소개 또한 필수 입니다.
     (사진이 없다면 글이라도, 다른 사이트의 사진을 사용한다면 출처 표기는 필수입니다!)</p>
              <p>4) 프리미엄 한정으로 경로 소개도 필수입니다.
     (예를들어 해당 여행지를 어떻게 갔으며, 어떤 운송수단이 좋은지 등, 본인의 의견을 적어주시면 됩니다.)</p>
              <p>5) 가장 중요한 부분인데, 정말 본인의 여행 정보를 공유한다는 생각으로 정성껏 작성해주시면 됩니다.</p>
            </div>
            <div>
              <p>** 참고로 프리미엄은 2주에 5개씩 선정되며, 매 월 15일과 마지막 날에 정산됩니다!</p>
              <p>그래도 모르겠다! 하시는 분은 언제든 저희 플러스 친구 (트래비) 또는 트래비 게시판을 통해 문의해주시면 친절하게 답변해드리겠습니다!</p>
            </div>
          </div>
        ) : (
          <Form
            name='planner_write_form'
            form={form}
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              themes_id: []
            }}
          >
            <Form.Item
              label='제목'
              name='title'
              rules={[{ required: true, message: '제목을 입력하세요!' },]}
              wrapperCol={{xs: 24, sm: 12}}
            >
              <Input placeholder='제목을 입력하세요'/>
            </Form.Item>
            <Form.Item
              label='나라'
              name='country'
              rules={[{ required: true, message: '나라를 입력하세요!' },]}
              wrapperCol={{xs: 24, sm: 12}}
            >
              <Input placeholder='나라를 입력하세요'/>
            </Form.Item>
            <Form.Item
              label='도시'
              name='city'
              rules={[{ required: true, message: '도시를 입력하세요!' },]}
              wrapperCol={{xs: 24, sm: 12}}
            >
              <Input placeholder='도시를 입력하세요'/>
            </Form.Item>
            <Form.Item
              label='테마'
              name='themes_id'
              required={false}
              wrapperCol={{span: 24}}
            >
              <Checkbox.Group
                options={themes.filter(theme => (theme.name !== 'Premium 계획표' && theme.name !== 'ITP 여행계획표')).map(theme => ({ label: theme.name, value: theme.id }))}
              />
            </Form.Item>
            <Form.Item
              label='대표 사진'
              name='thumbnail'
              className='thumbnail-wrapper'
              rules={[{ required: true, message: '썸네일에 들어갈 사진을 업로드해주세요.' },]}
              wrapperCol={{xs: 21, sm: 6}}
            >
              <UploadWrapper handleThumnail={handleThumnail}/>
            </Form.Item>
            <Form.Item
              name='contents'
              required={false}
              rules={[{ required: true, message: '계획표를 써주세요' },]}
              wrapperCol={{span: 24}}
            >
              <EditorWrapper handleContents={handleContents}/>
            </Form.Item>
            <Form.Item>
              <div className='button-wrapper'>
                <Button loading={loading} className='ok-button' htmlType='submit'>작성하기</Button>
                <Link href='/'><Button className='cancel-button'>작성취소</Button></Link>
              </div>
            </Form.Item>
          </Form>
        )
      }
      <div>
        {current !== 2 && (
          <Button type="primary" onClick={next}>위의 내용에 수락합니다.</Button>
        )}
      </div>
    </div>
  )
}

PlannerWrite.getInitialProps = async () => {
  const themes = await axios.get(baseUrl+'/api/themes')

  return {
    themes: themes.data
  }
}

export default PlannerWrite