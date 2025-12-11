/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#FF0000',
                    dark: '#09090b',
                    surface: '#18181b', // Added for cards/sidebar
                    secondary: '#B0ADA6',
                    muted: '#898A9F',
                    accent: '#FD7F7F',
                }
            }
        },
    },
    plugins: [],
}
