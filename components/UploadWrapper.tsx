import * as React from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile, RcFile } from 'antd/lib/upload/interface'
import '@assets/UploadWrapper.less'
import loadImage from 'blueimp-load-image';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  defaultUrl?: string;
  handleThumnail: (fileList: UploadFile<any>[]) => void;
}

const UploadImage: React.SFC<Props> = ({ defaultUrl, handleThumnail }) => {
 
  const [loading, setLoading] = React.useState(false)
  const [fileList, setFileList] = React.useState<UploadFile<any>[]>([{
    uid: '-1',
    size: 0,
    name: defaultUrl ? defaultUrl.split('/')[defaultUrl.split('/').length-1] : '',
    status: 'done',
    url: defaultUrl,
    type: defaultUrl ? `image/${defaultUrl.split('.')[defaultUrl.split('.').length-1]}` : ''
  }])
  const [imageClass, setImageClass] = React.useState('preview-image')

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setLoading(true)
    let infoFileList = info.fileList;
    infoFileList = infoFileList.slice(-1);

    infoFileList = infoFileList.map(file => {
      if(file.response){
        file.url = file.response
        setLoading(false)
        message.success('사진 업로드 완료');
      }

      return file
    })
    setFileList(infoFileList)
    handleThumnail(infoFileList)
  }

  const beforeUpload = (file: RcFile) => {
    loadImage(file, (_img, data) => {
      console.log(data)
      if(data && data.exif) {
        const orientation = data.exif[0x0112]
        switch (orientation) {
          case 1:
            break;
          default:
            setImageClass('preview-image rotate-90')
        }
        console.log(orientation)
      }
    }, {
      orientation: true
    })

    return true
  }

  return (
      <Upload.Dragger
        name='image'
        accept='image/*'
        fileList={fileList}
        multiple={false}
        className='upload-wrapper'
        action={baseUrl+'/api/file/upload'}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        showUploadList={false}
      >
        {
          loading ?
            <div>
              <p className="ant-upload-drag-icon">
                <LoadingOutlined />
              </p>
            </div>
          : fileList[0].url === '' ?
            <div>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">사진을 업로드 해주세요.</p>
              <p className="ant-upload-hint">
                클릭이나 드래그로 업로드 할 수 있습니다.
              </p>
            </div>
            :
            <div className='rotation-wrapper-outer'>
              <div className='rotation-wrapper-inner'>
                <img src={fileList[0].url || '/placeholder-image.jpg'} alt='image' className={imageClass} />
              </div>
            </div>
        }
      </Upload.Dragger>
  )
}

export default UploadImage