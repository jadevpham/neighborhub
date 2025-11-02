export default {
    theme: {
      extend: {
        colors: {
          brand: {
            DEFAULT: '#7c3aed',
            light: '#a78bfa',
            dark: '#5b21b6',
          },
          accent: '#f472b6',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          heading: ['Poppins', 'sans-serif'],
        },
        screens: {
          xs: '480px',
          '3xl': '1600px',
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: "0", transform: "translateY(-5px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
        },
        animation: {
          fadeIn: "fadeIn 0.15s ease-out",
        },
      },
    },
    plugins: [
      
    ],
  }
  