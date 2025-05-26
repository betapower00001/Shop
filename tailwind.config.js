/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ✅ เพิ่ม dark mode แบบ class-based
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',     // ✅ สีหลัก (เช่นปุ่ม, header)
        secondary: '#64748b',   // ✅ สีรอง
        accent: '#b90002',      // ✅ สีเน้น เช่น ปุ่ม call-to-action
        background: '#0e151e',  // ✅ สีพื้นหลัง
        foreground: '#1f2937',  // ✅ สีตัวอักษร
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideDown: 'slideDown 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
