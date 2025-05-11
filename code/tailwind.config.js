/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        preflight: false, // 禁用 Tailwind 的基础样式，避免与 Ant Design 冲突
    },
} 