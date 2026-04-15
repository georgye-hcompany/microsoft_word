/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{svelte,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'wd-blue':       '#2b579a',
        'wd-blue-dark':  '#1e3f6f',
        'wd-blue-light': '#c7d9f5',
        'wd-text':       '#242424',
        'wd-muted':      '#605e5c',
        'wd-border':     '#d0d0d0',
        'wd-hdr':        '#f3f2f1',
        'wd-sel':        '#e3ecf8',
      },
      fontSize: { '10': '10px', '11': '11px' }
    }
  },
  plugins: []
}
