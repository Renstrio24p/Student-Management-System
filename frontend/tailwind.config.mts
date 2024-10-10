/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        ustBg: 'url(/backgrounds/ust_bg_new.webp)',
      },
      height: {
        'full-screen': '100vh',
      },
      // Add custom width utility
      width: {
        'recaptcha': '100%',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px'
    }
  },
  plugins: [
    (function ({ addUtilities }) {
      const newUtilities = {
        '.btn': {
          'padding': '0.5rem 1rem',
          'border-radius': '0.5rem',
        }
      }
      addUtilities(newUtilities)
    })
  ],
}
