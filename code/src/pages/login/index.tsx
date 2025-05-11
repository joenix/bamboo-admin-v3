import { Button, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '@/api';
import { apiConfig } from '@/api/config';
import logo from '@/assets/img/logo.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: { username: string; password: string }) => {
    if (username !== 'admin' && password !== 'lhdd.club') {
      return message.error('请使用管理员账户登录');
    }

    try {
      const response = await api.post(apiConfig.User.login, {
        username: values.username,
        password: values.password,
      });
      if (response.data.status === 200) {
        message.success('登录成功');
        // 存储token
        localStorage.setItem(
          'user',
          JSON.stringify({
            token: response.data.msg,
            username: values.username,
          }),
        );
        // 跳转到首页
        navigate('/dashboard');
      } else {
        message.error(response.data.error || '登录失败');
      }
    } catch {
      message.error('登录失败，请检查网络连接');
    }
  };

  return (
    <div className="w-full h-screen relative bg-[url('@/assets/img/bg2.jpg')] bg-no-repeat bg-cover">
      {/* logo */}
      <div className="flex items-center absolute top-10 left-[60px]">
        <img src={logo} className="w-[100px] mr-[10px]" alt="logo" />
        <div className="text-[26px] font-semibold text-black">六合竹简</div>
        <span className="text-[26px] font-semibold text-black mx-[10px]">|</span>
        <div className="text-[26px] font-semibold text-black">统一技术治理平台</div>
      </div>

      {/* slogan */}
      <div className="absolute flex flex-col items-center top-[180px] left-[180px] w-[580px] text-black">
        <div className="text-[60px] font-bold italic mb-5 tracking-[6px] w-full flex items-center justify-around">
          <span>同心协力</span>
          <span>共创未来</span>
        </div>
        <div className="text-lg mb-[6px] tracking-[6px]">让天下没有难教的孩子</div>
        <div className="text-lg mb-[6px] tracking-[6px]">让天下没有难读的书</div>
      </div>

      {/* 表单 */}
      <div className="absolute top-[137px] right-[94px] w-[420px] p-[50px_35px_20px_35px] rounded-[10px] bg-[rgba(45,59,104,0.6)]">
        <Form
          initialValues={{
            username: '13817152426',
            password: '123456',
          }}
          form={form}
          name="login"
          onFinish={onFinish}
        >
          <Form.Item className="mb-6" name="username">
            <Input prefix={<UserOutlined className="text-[#eee]" />} placeholder="用户名" size="large" className="bg-[rgba(0,0,0,0.1)] border-[rgba(255,255,255,0.1)] [&>input]:text-white [&>input]:bg-transparent [&>input::placeholder]:text-[#eee]" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]} className="mb-6">
            <Input.Password prefix={<LockOutlined className="text-[#eee]" />} placeholder="密码" size="large" className="bg-[rgba(0,0,0,0.1)] border-[rgba(255,255,255,0.1)] [&>input]:text-white [&>input]:bg-transparent [&>input::placeholder]:text-[#eee] [&_.ant-input-password-icon]:text-[#eee]" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center text-white text-xs mt-5">宁波融道文化传播有限公司</div>
      </div>
    </div>
  );
};

export default Login;
