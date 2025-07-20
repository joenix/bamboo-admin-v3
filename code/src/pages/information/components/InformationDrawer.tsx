import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Drawer, Form, Input, Button, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '@/api';
import { apiConfig } from '@/api/config';
import CoverSelect from '@/components/CoverSelect';

interface InformationDrawerProps {
  filterType: number;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  informationItem?: any;
  type?: 'create' | 'edit';
}

const InformationDrawer: React.FC<InformationDrawerProps> = ({ filterType, visible, onClose, onSuccess, informationItem, type = 'create' }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [showCoverSelect, setShowCoverSelect] = useState(false);
  // Quill 编辑器配置
  // const modules = {
  //   toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false] }], ['bold', 'italic', 'underline', 'strike'], [{ color: [] }, { background: [] }], [{ list: 'ordered' }, { list: 'bullet' }], [{ align: [] }], ['link', 'image'], ['clean']],
  // };

  // ReactQuill 引用，用来操作编辑器
  const quillRef = useRef<ReactQuill>(null);

  // 图片上传处理
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 300 秒

      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('files', file);

      fetch(`${apiConfig.File.upload}`, {
        method: 'POST',
        headers: {
          Token: JSON.parse(localStorage.getItem('user') || '{}').token,
        },
        body: formData,
        signal: controller.signal,
      })
        .then(async res => {
          clearTimeout(timeoutId);
          if (!res.ok) throw new Error('网络错误');
          const data = await res.json();

          const imageUrl = data.msg[0].path;

          console.log('图片上传成功:', imageUrl);

          const editor = quillRef.current?.editor;
          if (!editor) {
            console.warn('editor 未获取到');
            message.error('Editor 加载异常');
            return;
          }

          const range = editor.getSelection(true);
          if (!range) {
            console.warn('range 未获取到');
            message.warning('请点击编辑器中光标位置后再上传图片');
            return;
          }

          editor.insertEmbed(range.index, 'image', imageUrl);
          editor.setSelection(range.index + 1, 0);
        })
        .catch(err => {
          clearTimeout(timeoutId);

          console.error('图片上传失败', err);
          message.error('图片上传失败，请重试');
        });
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [[{ header: [1, 2, 3, 4, 5, 6, false] }], ['bold', 'italic', 'underline', 'strike'], [{ color: [] }, { background: [] }], [{ list: 'ordered' }, { list: 'bullet' }], [{ align: [] }], ['link', 'image'], ['clean']],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  useEffect(() => {
    if (informationItem && type === 'edit') {
      // 编辑模式，获取咨询信息
      form.setFieldsValue({
        name: informationItem.name,
        img: informationItem.img,
        content: informationItem.content,
      });
      setEditorContent(informationItem.content);
    } else {
      // 新增模式，清空表单
      form.resetFields();
      setEditorContent('');
    }
  }, [informationItem, type, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const submitData = {
        ...values,
        content: editorContent,
        type: filterType.toString(),
      };

      const apiCall =
        type === 'edit'
          ? api.post(apiConfig.Information.update, {
              ...submitData,
              id: informationItem.id,
            })
          : api.post(apiConfig.Information.create, submitData);

      const res = await apiCall;
      if (res.data.status === 200) {
        message.success(`${type === 'edit' ? '编辑' : '新增'}成功`);
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('表单提交失败:', error);
      // message.error(`${type === 'edit' ? '编辑' : '新增'}失败`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={type === 'edit' ? '编辑咨询' : '新增咨询'}
      open={visible}
      onClose={onClose}
      width={720}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={handleSubmit} type="primary" loading={loading}>
            确定
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="咨询标题" rules={[{ required: true, message: '请输入咨询标题' }]}>
          <Input placeholder="请输入咨询标题" />
        </Form.Item>
        <Form.Item name="img" label="封面" required rules={[{ required: true, message: '请选择封面' }]}>
          <CoverSelect
            open={showCoverSelect}
            onClose={() => {
              setShowCoverSelect(false);
            }}
            onSelect={(val: string) => {
              setShowCoverSelect(false);
              form.setFieldValue('img', val);
            }}
          />
          <div className="flex flex-row items-center gap-2">
            {form.getFieldValue('img') && (
              <div className="">
                <img src={form.getFieldValue('img')} alt="封面" className="w-[80px] h-[80px] rounded-lg" />
              </div>
            )}
            <Button onClick={() => setShowCoverSelect(true)}>选择封面</Button>
          </div>
        </Form.Item>
        <Form.Item name="content" label="咨询内容" required rules={[{ required: true, message: '请输入咨询内容' }]} validateTrigger={['onChange', 'onBlur']}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={editorContent}
            onChange={content => {
              setEditorContent(content);
              form.setFieldValue('content', content);
            }}
            modules={modules}
            style={{ height: '500px', marginBottom: '10px' }}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default InformationDrawer;
