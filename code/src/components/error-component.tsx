import { useNavigate } from "react-router-dom";

export default function ErrorComponent() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-xl">页面未找到</p>
      <button
        className="mt-8 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => navigate("/dashboard")}
      >
        返回首页
      </button>
    </div>
  );
}
