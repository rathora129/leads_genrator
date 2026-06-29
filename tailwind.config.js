/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        bg: { DEFAULT: '#08070D', deep: '#050409', soft: '#0E0D17', elev: '#13121E' },
        ink: { 0: '#FFFFFF', 1: '#F4F4F7', 2: '#BCBBC9', 3: '#7F7E91', 4: '#52516A', 5: '#2A2937' },
        line: { DEFAULT: 'rgba(255,255,255,0.07)', strong: 'rgba(255,255,255,0.12)' },
        brand: { 50: '#F2EFFF', 100: '#E1DAFF', 200: '#C2B4FF', 300: '#A48EFF', 400: '#8868FF', 500: '#6E45FE', 600: '#5A30E8', 700: '#4621BA', 800: '#321889', 900: '#1F0F5A' },
        accent: { cyan: '#22D3EE', teal: '#2DD4BF', emerald: '#34D399', amber: '#FBBF24', rose: '#FB7185', pink: '#F472B6', sky: '#38BDF8', violet: '#A78BFA' },
        status: { new: '#38BDF8', called: '#A78BFA', later: '#FBBF24', interested: '#34D399', meeting: '#22D3EE', proposal: '#F472B6', negotiation: '#FB923C', client: '#10B981', closed: '#64748B' },
        chart: { 1: '#6E45FE', 2: '#22D3EE', 3: '#34D399', 4: '#FBBF24', 5: '#FB7185' },
        background: '#08070D',
        foreground: '#F4F4F7',
        card: { DEFAULT: '#0E0D17', foreground: '#F4F4F7' },
        popover: { DEFAULT: '#0E0D17', foreground: '#F4F4F7' },
        primary: { DEFAULT: '#6E45FE', foreground: '#FFFFFF' },
        secondary: { DEFAULT: '#13121E', foreground: '#F4F4F7' },
        muted: { DEFAULT: '#13121E', foreground: '#7F7E91' },
        destructive: { DEFAULT: '#FB7185', foreground: '#FFFFFF' },
        border: 'rgba(255,255,255,0.07)',
        input: 'rgba(255,255,255,0.07)',
        ring: '#6E45FE',
      },
      borderRadius: { lg: '14px', md: '10px', sm: '6px', xl: '20px', '2xl': '24px' },
      boxShadow: {
        glow: '0 0 0 1px rgba(110,69,254,0.4), 0 8px 32px -8px rgba(110,69,254,0.5)',
        soft: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 8px 24px -8px rgba(0,0,0,0.6)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 1px 2px 0 rgba(0,0,0,0.5)',
        pop: '0 24px 60px -12px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(110,69,254,0.25), transparent 70%)',
        'aurora': 'linear-gradient(135deg, #6E45FE 0%, #22D3EE 50%, #34D399 100%)',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: 0, transform: 'translateY(4px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: { 'fade-in': 'fade-in .4s ease-out both', shimmer: 'shimmer 2.4s linear infinite' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
