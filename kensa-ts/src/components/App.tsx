import React, { createContext, useState } from 'react';
import MainContainer from './MainContainer';
import { Box } from '@chakra-ui/react';
import Header from './Header';

export const ThemeContext = createContext(null);

function App() {
  // Save theme to localStorage to preserve previously chosen theme
  const prevTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState<string>(prevTheme ? prevTheme : 'light');

  const toggleTheme = () => {
    setTheme((prevState) => prevState === 'light' ? 'dark' : 'light');
  };

  localStorage.setItem('theme', theme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Box bgColor='rgb(249, 250, 251)' id={theme}>
        <Header />
        {/* Main Routes Container */}
        <MainContainer />
      </Box>
    </ThemeContext.Provider>
  );
}
export default App;