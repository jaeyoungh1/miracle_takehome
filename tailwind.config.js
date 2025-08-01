/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["font-small", "font-medium", "font-large"],
  theme: {
    extend: {
      colors: {
        primary: "#7B61FF",
        banner: "#281a46ff", 
        neutral: "#666666", 
        datasetA: '#7B61FF',
    datasetB: '#3EC6B6',
      },
    },
  },
  plugins: [],
};
