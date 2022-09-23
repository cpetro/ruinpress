module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '48em',
      md: '62em',
      lg: '75em',
      xl: '90em',
    },
    colors: {
      'white': 'var(--color-white)',
      'black': 'var(--color-black)',
      'accent': 'var(--color-accent)',
    },

    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
      serif: ['Times', 'serif'],
    },
    extend: {
      fontSize: {
        body: 'var(--font-size-body)',
        small: 'var(--font-size-small)',
        large: 'var(--font-size-large)',
      },
    },
  },
  plugins: [],
}
