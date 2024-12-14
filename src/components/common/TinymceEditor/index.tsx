// eslint-disable-next-line import/named
import { Editor, IAllProps } from '@tinymce/tinymce-react';

export type TinymceEditorProps = IAllProps & {
  editorRef?: any;
};

const TinymceEditor = ({ editorRef, ...rest }: TinymceEditorProps) => {
  return (
    <Editor
      {...rest}
      onInit={(_, editor) => {
        if (editorRef) {
          editorRef.current = editor;
        }
      }}
      apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
      init={{
        plugins: [
          // Core editing features
          'anchor',
          'autolink',
          'charmap',
          'codesample',
          'emoticons',
          'image',
          'link',
          'lists',
          'media',
          'searchreplace',
          'table',
          'visualblocks',
          'wordcount',
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Dec 25, 2024:
          'checklist',
          'mediaembed',
          'casechange',
          'export',
          'formatpainter',
          'pageembed',
          'a11ychecker',
          // 'tinymcespellchecker',
          'permanentpen',
          'powerpaste',
          'advtable',
          'advcode',
          'editimage',
          'advtemplate',
          'mentions',
          'tinycomments',
          'tableofcontents',
          'footnotes',
          'mergetags',
          'autocorrect',
          'typography',
          'inlinecss',
          'markdown',
          // Early access to document converters
          'importword',
          'exportword',
          'exportpdf',
        ],
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
      }}
    />
  );
};

export default TinymceEditor;
