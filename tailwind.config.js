/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                glass: "rgba(255,255,255,0.15)",
                glassDark: "rgba(20,20,20,0.55)",
            },
            boxShadow: {
                glass: "0 20px 40px rgba(0,0,0,0.4)",
            },
            borderRadius: {
                xl: "18px",
            },
        },
    },
    plugins: [],
};
