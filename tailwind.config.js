/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["'Post No Bills Jaffna Medium'", "sans-serif"],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #535353, #000000)',
      },
      boxShadow: {
        'custom-all-sides': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 -4px 6px -1px rgba(0, 0, 0, 0.05), 4px 0 6px -1px rgba(0, 0, 0, 0.05), -4px 0 6px -1px rgba(0, 0, 0, 0.05)',
      },
      backgroundColor:{
        'review': "#4AB85B"
      },
      colors: {
        'scrollbar-thumb': 'var(--scrollbar-thumb-color)',
        'purple-custom': '#8000FF',
      },

    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none', 
          'scrollbar-width': 'none', 
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          'display': 'none', 
        },
      });
    },
  ],
}

