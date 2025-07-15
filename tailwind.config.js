/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Charcoal Color Palette
        charcoal: {
          50: "hsl(var(--charcoal-50))",
          100: "hsl(var(--charcoal-100))",
          200: "hsl(var(--charcoal-200))",
          300: "hsl(var(--charcoal-300))",
          400: "hsl(var(--charcoal-400))",
          500: "hsl(var(--charcoal-500))",
          600: "hsl(var(--charcoal-600))",
          700: "hsl(var(--charcoal-700))",
          800: "hsl(var(--charcoal-800))",
          900: "hsl(var(--charcoal-900))",
          950: "hsl(var(--charcoal-950))",
        },
        // Accent Colors
        "accent-blue": "hsl(var(--accent-blue))",
        "accent-green": "hsl(var(--accent-green))",
        "accent-orange": "hsl(var(--accent-orange))",
        "accent-red": "hsl(var(--accent-red))",
        "accent-purple": "hsl(var(--accent-purple))",
        // Semantic Colors
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        error: "hsl(var(--error))",
        info: "hsl(var(--info))",
        // Theme Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      // Typography Scale
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "1.4" }],
        sm: ["var(--text-sm)", { lineHeight: "1.5" }],
        base: ["var(--text-base)", { lineHeight: "1.6" }],
        lg: ["var(--text-lg)", { lineHeight: "1.6" }],
        xl: ["var(--text-xl)", { lineHeight: "1.5" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "1.4" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "1.3" }],
        "4xl": ["var(--text-4xl)", { lineHeight: "1.2" }],
      },
      // Spacing Scale
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        12: "var(--space-12)",
        16: "var(--space-16)",
      },
      // Border Radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Font Families
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      // Container Max Width
      maxWidth: {
        container: "var(--container-max-width)",
      },
      // Animation Durations
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },
      // Animation Timing Functions
      transitionTimingFunction: {
        "ease-out": "var(--ease-out)",
        "ease-in": "var(--ease-in)",
        "ease-spring": "var(--ease-spring)",
        "ease-bounce": "var(--ease-bounce)",
      },
      // Box Shadows
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
      },
      // Enhanced Keyframes
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-left": {
          "0%": { transform: "translateX(10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      // Enhanced Animations
      animation: {
        "fade-in": "fade-in var(--duration-normal) var(--ease-out) forwards",
        "fade-out": "fade-out var(--duration-normal) var(--ease-out) forwards",
        "slide-up": "slide-up var(--duration-normal) var(--ease-out) forwards",
        "slide-down": "slide-down var(--duration-normal) var(--ease-out) forwards",
        "slide-left": "slide-left var(--duration-normal) var(--ease-out) forwards",
        "slide-right": "slide-right var(--duration-normal) var(--ease-out) forwards",
        "scale-in": "scale-in var(--duration-normal) var(--ease-spring) forwards",
        "scale-out": "scale-out var(--duration-normal) var(--ease-spring) forwards",
        "bounce-in": "bounce-in var(--duration-slow) var(--ease-bounce) forwards",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
