/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#5FD1D4',
        secondry: '#82D2D5',
        btnbg: '#1C3342',
        btntxtcol: '#DAE4E8',
        bgwhite: '#FFFFFF',
        txtcol: {
          DEFAULT: '#1C3342',
          900: '#264559',
        }
      }
    },
  },
  plugins: [],
}

