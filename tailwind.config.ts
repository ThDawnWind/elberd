import type { Config } from "tailwindcss";
import animate from 'tailwindcss-animate'

const config: Config = {
    darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			berd: {
  				primary: 'var(--berd-primary)'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		 fontFamily: {
			sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
			mono: ['var(--font-geist-mono)', 'monospace'],
        },
		 screens: {
			xs: {'min': '320px', 'max': '767px'},
			sm: {'min': '768px', 'max': '1023px'},
			lg: {'min': '1024px'},
      },
	    keyframes: {
			pop: {
				"0%": { transform: "scale(0.6)", opacity: "0" },
				"60%": { transform: "scale(1.15)", opacity: "1" },
				"100%": { transform: "scale(1)" },
			},
		},
		animation: {
			pop: "pop 0.25s ease-out",
		},
    },
  },
  plugins: [
	animate
  ]
};
export default config;
