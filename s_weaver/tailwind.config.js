const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    // Add more file types as needed
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
      // Extend other theme configurations as needed
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [
    // Example plugin to add a new utility
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
        },
      };
      addUtilities(newUtilities);
    }),
    // Add other plugins as needed
  ],
};
