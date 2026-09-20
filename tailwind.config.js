export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#050705',
          raised: '#0a0d0a',
          panel: '#0c100c',
        },
        line: {
          DEFAULT: '#1b211b',
          strong: '#2a332a',
        },
        signal: {
          DEFAULT: '#17c964',
          soft: '#0f8a45',
          dim: '#0b301c',
        },
        mute: {
          DEFAULT: '#8b968b',
          soft: '#6b756b',
        },
      },
      fontFamily: {
        sans: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        label: '0.18em',
      },
      maxWidth: {
        shell: '1240px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
