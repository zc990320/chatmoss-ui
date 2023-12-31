/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			animation: {
				blink: 'blink 1.2s infinite steps(1, start)',
			},
			keyframes: {
				blink: {
					'0%, 100%': {
						'background-color': 'currentColor',
					},
					'50%': {
						'background-color': 'transparent',
					},
				},
			},
		},
	},
	plugins: [{
		handler({
			addBase,
		}) {
			addBase({
				':root': {
					'--moss-tip-bg-color': '#fff',
					'--moss-header-color': '#FFFFFF',
					'--moss-bg-color': '#6B83FF',
					'--moss-bg-btn-color': '#45485C88',
					'--moss-bg-btn-send-color': '#38394B',
					'--moss-bg-ask-color': '#D5E2FA',
					'--moss-bg-reply-color': '#FFFFFF',
					'--moss-bg-content-color': '#F7F8FC',
					'--moss-bg-text-color': '#6B83FF22',
					'--moss-text-purple-color': '#A677E7',
					'--moss-text-blue-color': '#6B83FF',
					'--moss-text-green-color': '#52CABC',
					'--moss-text-red-color': '#FE5D64',
					'--moss-text-reply-color': '#45485C',
					'--moss-text-ask-color': '#000000',
					'--moss-text-time-color': '#9EA2B5',
					'--moss-border-color': '#E6E6E6',
					'--moss-text': '#45485C',
          "--van-tabbar-background": "#F6F7FA",
          "--van-tabbar-item-active-background": "#F6F7FA"
					// "--n-border": '1px solid red'
				},
				'.dark': {
          "--van-tabbar-background": "#161616",
          "--van-tabbar-item-active-background": "#161616",
					'--moss-bg-ask-color': '#1D3161',
          '--moss-text-ask-color': '#FFFFFF',
					"--van-background-2": '#161616',
					'--moss-tip-bg-color': '#43434399',
					'--moss-header-color': '#242424',
					// '--moss-bg-color': '#313338',
					'--moss-bg-content-color': '#1f1f1f',
					'--moss-bg-reply-color': '#FFFFFF10',
					'--moss-text': '#9EA2B5',

				},
			})
		},
	}],
}
