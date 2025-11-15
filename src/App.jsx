import React, { useState, useEffect, useMemo } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { 
  Box, CircularProgress, CssBaseline, 
  ThemeProvider, createTheme 
} from '@mui/material'; 

// Naye components jo hum banaayenge
import HomePage from './components/HomePage'; 
import Dashboard from './components/Dashboard'; // <-- Naya Dashboard component

// Theme (Ise App.jsx mein hi rehne dein)
const createAppTheme = (fontFamily) => {
  return createTheme({
    typography: { fontFamily: fontFamily || '"Roboto", "Helvetica", "Arial", sans-serif' },
    palette: { primary: { main: '#6d28d9' } },
  });
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const theme = useMemo(() => createAppTheme('Roboto'), []); // Font fix kar diya

  // Login/Logout logic
  useEffect(() => {
    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false); 

    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
    });
    netlifyIdentity.on('logout', () => setUser(null));
    netlifyIdentity.on('signup', (user) => {
      setUser(user);
      netlifyIdentity.close();
    });
  }, []); 

  // --- UI (User Interface) ---
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      
      {/* Agar page abhi bhi check kar raha hai, toh loader dikhaao */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#242424' }}>
          <CircularProgress />
        </Box>
      )}

      {/* Agar user log in NAHI hai, toh HomePage component dikhaao */}
      {!loading && !user && (
        <HomePage />
      )}

      {/* Agar user log in HAI, toh Dashboard dikhaao */}
      {!loading && user && (
        <Dashboard user={user} />
      )}
    </ThemeProvider>
  );
}

export default App;