import * as React from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import '@assets/UploadWrapper.less'

type Props = {
  index: number;
  handleImage: (e: string, index: number) => void;
  defaultUrl?: string;
  disabled?: boolean;
}

const UploadImage: React.SFC<Props> = ({index, handleImage, defaultUrl='', disabled=false}) => {
  const [loading, setLoading] = React.useState(false)
  const [fileUrl, setFileUrl] = React.useState(defaultUrl)

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setLoading(true)
    if (info.file.response) {
      setFileUrl(info.file.response)
      handleImage(info.file.response, index)
      setLoading(false)
    }
    console.log(loading)
  }

  return (
    <Upload
      disabled={disabled}
      name='image'
      className='upload-wrapper'
      action='/api/file/upload'
      onChange={handleChange}
      showUploadList={false}
    >
      {
        fileUrl !== '' ?
          (<div className='image-wrapper'><img src={fileUrl} /></div>)
          :
          (<div className='text-wrapper'><PlusOutlined /><div className="ant-upload-text">Upload</div></div>)
      }
    </Upload>
  )
}

export default UploadImage