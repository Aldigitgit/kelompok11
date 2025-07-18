/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#f5f6f2",
        primary: "#f8f6fb",
        secondary: "#452372",
        secondaryOne: "#ffbcb1",
        tertiary: "#272626",
        'custom-teal': '#0097A7', // Your main theme color
        'custom-blue': '#2196F3', // A shade of blue for the sign-in button
        // tertiary: "#404040",
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
    },
  },
  plugins: [],
}

