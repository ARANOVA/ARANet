const config = {
  plugins: {
    "@tailwindcss/postcss": {
      content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./packages/**/*.{js,ts,jsx,tsx}",
      ],
    }
  }
};

export default config;
