// theme.js
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    light: {
      100: '#f7fafc',
      200: '#edf2f7',
      300: '#e2e8f0',
      400: '#cbd5e0',
      500: '#a0aec0',
      600: '#718096',
      700: '#4a5568',
      800: '#2d3748',
      900: '#1a202c',
    },
    dark: {
      100: '#1a202c',
      200: '#2d3748',
      300: '#4a5568',
      400: '#718096',
      500: '#a0aec0',
      600: '#cbd5e0',
      700: '#e2e8f0',
      800: '#edf2f7',
      900: '#f7fafc',
    },
  },
})

export default theme