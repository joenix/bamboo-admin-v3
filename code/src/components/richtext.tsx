import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";

function RichText({ source, onChange }) {
  // editor 实例
  const [editor, setEditor] = useState(null); // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState("<p>hello</p>");

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml("<p>hello world</p>");
    }, 1500);
  }, []);

  // 工具栏配置
  const toolbarConfig = {}; // JS 语法

  // 编辑器配置
  const editorConfig = {
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => {
            // 本地修改
            const newHtml = editor.getHtml();
            setHtml(newHtml);
            // 上送数据
            if (onChange) onChange(newHtml); // 触发 onChange，将数据传递到表单
          }}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
}

export default RichText;
