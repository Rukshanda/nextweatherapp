import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'custom-light': 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        'custom-dark': 'rgba(255, 255, 255, 0.1) 0px 54px 55px, rgba(255, 255, 255, 0.08) 0px -12px 30px, rgba(255, 255, 255, 0.08) 0px 4px 6px, rgba(255, 255, 255, 0.12) 0px 12px 13px, rgba(255, 255, 255, 0.05) 0px -3px 5px',
        'customx-light': 'rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.2) 0px 2px 16px 0px',
        'customx-dark': 'rgba(255, 255, 255, 0.15) 0px 2px 4px 0px, rgba(255, 255, 255, 0.35) 0px 2px 16px 0px',
      },
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
      },
      animation: {
        'rotate': 'rotate 2s linear infinite',
        'dash': 'dash 1.5s ease-in-out infinite',
        'color': 'color 6s ease-in-out infinite',
      },
      keyframes: {
        rotate: {
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        dash: {
          '0%': {
            strokeDasharray: '1, 200',
            strokeDashoffset: '0',
          },
          '50%': {
            strokeDasharray: '89, 200',
            strokeDashoffset: '-35px',
          },
          '100%': {
            strokeDasharray: '89, 200',
            strokeDashoffset: '-124px',
          },
        },
        color: {
          '0%, 100%': {
            stroke: '#d9534f',
          },
          '40%': {
            stroke: '#5bc0de',
          },
          '66%': {
            stroke: '#5cb85c',
          },
          '80%, 90%': {
            stroke: '#f0ad4e',
          },
        },
      },
    
      screens: {
       'mds': '850px',
       'xsm' : '450px'
      },
    },
  },
  plugins: [],
};

export default config;
