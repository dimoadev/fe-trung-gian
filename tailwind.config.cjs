/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx}"],
	mode: "jit",
	theme: {
		extend: {
			colors: {
				primary: "#0f0908",
				secondary: "#aaa6c3",
				tertiary: "#363636",
				orange: "#DAC5A7",
				"black-100": "#100d25",
				"black-200": "#090325",
				"white-100": "#f3f3f3",
			},
			boxShadow: {
				card: "0px 35px 120px -15px #211e35",
			},
			screens: {
				xs: "450px",
			},
			backgroundImage: {
				"hero-pattern": "url('/src/assets/herobg.jpg')",
			},
			fontFamily: {
				dancingscript: ["Dancing Script", "cursive"],
			},
		},
	},
	plugins: [],
};
