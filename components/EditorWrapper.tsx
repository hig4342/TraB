import * as React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { EventHandler } from '@tinymce/tinymce-react/lib/cjs/main/ts/Events';

type Props = {
  handleContent: Function
  hyperlink?: boolean
  defaultContent?: string
  height?: number
  index: number
}

const EditorWrapper: React.SFC<Props> = ({ handleContent, height=500, hyperlink=false, defaultContent='<p>내용을 입력하세요.</p>', index}) => {

  const [content, setContent] = React.useState(defaultContent)

  const handleEditorChange: EventHandler<any> = (content: string, _editor) => {
    if(!hyperlink) {
      content = content.replace(/<(a|\/a)([^>]*)>/gi, '')
    }
    setContent(content)
    handleContent(content, index)
  }

  return (
    <Editor
      apiKey="4kbo2x8k4ytvqatkvvre1wtug7xnmzpuqz6c5i475w3jb815"
      id='editor'
      value={content}
      onEditorChange={handleEditorChange}
      init={{
        height: height,
        menubar: false,
        plugins: [
          'advlist lists', 
          'charmap emoticons',
          'searchreplace preview paste table',
          'image imagetools media' + (hyperlink ? ' link autolink' : ''),
        ],
        toolbar1: '\
          fontselect fontsizeselect formatselect|\
          bold italic underline strikethrough superscript subscript forecolor backcolor removeformat|',
        toolbar2: (hyperlink ? 'link ' : '') +
          'table insertfile image media template anchor charmap emoticons|\
          alignleft aligncenter alignright alignjustify bullist numlist outdent indent|\
          undo redo |\
          preview',
        mobile: {
          toolbar: 'styleselect|\
          bold italic underline strikethrough superscript subscript forecolor backcolor removeformat|\
          table insertfile image media template anchor charmap emoticons|\
          alignleft aligncenter alignright alignjustify bullist numlist outdent indent|\
          undo redo |\
          preview',
          toolbar1: false,
          toolbar2: false,
        },
        statusbar: false,
        toolbar_drawer: false,
        language: 'ko_KR',
        language_url: '/tinymce/langs/ko_KR.js',
      }}
    />
  )
}

export default EditorWrapper