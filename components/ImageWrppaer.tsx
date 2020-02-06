import * as React from 'react'
import loadImage from 'blueimp-load-image'

type Props = {
  src?: string
  alt?: string
  style?: React.CSSProperties
}

/*
  const transformFile = (file: RcFile) => {
    loadImage(file, (img, data) => {
      console.log(img)
      console.log(data)
      if(data && data.exif) console.log(data.exif[0x0112])
    }, {
      orientation: true 
    })
    return file
    // return new Promise<File>((_resolve, _reject) => {

    //   loadImage(file, (img) => {
    //     console.log(img)
    //   }, {
    //     orientation: true
    //   })
    // })
  }
  */
const ImageWrapper: React.SFC<Props> = ({src, alt, style}) => {

  const [imagestyle, setStyle] = React.useState(style)

  React.useEffect(() => {
    if (src) {
      loadImage(src, (img, data) => {
        console.log(img)
        console.log(data)
      }, {
      orientation: true 
    })
    }
    var newstyle = imagestyle
    //newstyle?.transform = 'translatex(400px) rotate(90deg)'
    setStyle(newstyle)
  }, [])
  return (
    <div>
      <img
        src={src}
        alt={alt}
        style={{width: 300, height: 400, transformOrigin: 'top left', transform: 'translatex(400px) rotate(90deg)'}}
      />
    </div>
  )
}

export default ImageWrapper