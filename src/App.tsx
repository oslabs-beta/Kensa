import React, { createContext, useState } from 'react';
import MainContainer from './components/MainContainer';
import { Box } from '@chakra-ui/react';

export const ThemeContext = createContext(null);

function App() {
  // Get previous chosen theme in localStorage and store in state
  const prevTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState<string>(prevTheme ? prevTheme : 'light');

  const toggleTheme = () => {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  };

  // Save theme to localStorage to preserve previously chosen theme
  localStorage.setItem('theme', theme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Box bgColor="rgb(249, 250, 251)" id={theme}>
        {/* Main Routes Container */}
        <MainContainer />
      </Box>
    </ThemeContext.Provider>
  );
}
export default App;
