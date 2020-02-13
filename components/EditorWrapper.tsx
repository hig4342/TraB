import * as React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { EventHandler } from '@tinymce/tinymce-react/lib/cjs/main/ts/Events';
import '@assets/EditorWrapper.less'

//const baseUrl = process.env.NODE_ENV === 'production' ? 'https://trab.co.kr' : ''

type Props = {
  hyperlink?: boolean;
  handleContents: (text: string) => void;
  defaultContent?: string;
}

const EditorWrapper: React.SFC<Props> = ({ hyperlink=false, handleContents, defaultContent='' }) => {

  const [content, setContent] = React.useState(defaultContent)

  const handleEditorChange: EventHandler<any> = (content: string, _editor) => {
    if(!hyperlink) {
      content = content.replace(/<(a|\/a)([^>]*)>/gi, '')
    }
    setContent(content)
    handleContents(content)
  }

  return (
    <Editor
      apiKey="4kbo2x8k4ytvqatkvvre1wtug7xnmzpuqz6c5i475w3jb815"
      value={content}
      onEditorChange={handleEditorChange}
      init={{
        selector: 'textarea',
        menubar: false,
        min_height: 500,
        plugins: [
          'advlist lists autoresize paste', 
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
        toolbar3: 'explain',
        setup: function (editor) {
          editor.ui.registry.addButton('explain', {
            text: '<div class="explain-wrapper"><span>사진을 업로드 하려면 <img src="/image.svg"/> 버튼을 누르신 후 <strong>"업로드"</strong> 클릭 > 이미지 삽입 후 <strong>"넓이를 600"</strong> 이하로 맞춰주세요.</span></div>',
            onAction: function (_) {}
          });
        },
        mobile: {
          toolbar1: 'styleselect|\
          bold italic underline strikethrough superscript subscript forecolor backcolor removeformat|\
          table insertfile template anchor charmap emoticons|\
          alignleft aligncenter alignright alignjustify bullist numlist outdent indent|\
          undo redo |\
          preview',
          toolbar2: 'image media',
          min_height: 300,
        },
        toolbar_sticky: true,
        body_class: 'editor-body',
        content_css: '/tinymce/css/layout.css',
        statusbar: false,
        toolbar_drawer: false,
        language: 'ko_KR',
        language_url: '/tinymce/langs/ko_KR.js',
        //images_upload_url: baseUrl+'/api/file/upload',
        paste_data_images: true,
        imagetools_toolbar: "imageoptions",
        images_upload_handler: (blobInfo, success, failure) => {
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open('POST', '/api/file/upload');
      
          xhr.onload = function() {
            if (xhr.status != 200) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }
      
            success(xhr.responseText);
          };
      
          var formData = new FormData();
          formData.append('image', blobInfo.blob(), blobInfo.filename());
      
          xhr.send(formData);
        }
      }}
    />
  )
}

export default EditorWrapper