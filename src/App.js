import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import { HistoryProvider } from './context/historyContext.js';
import Session from './views/session';
import Lobby from './views/lobby';
import Story from './views/story';
import theme from './theme';
import './App.css';
import { db } from './domain/databaseInitialize.js';


function App() {
  console.log('Theme 1:', theme);
  return (
      <ThemeProvider theme={theme}>
        <UserProvider>
          <HistoryProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Navigate to="/session" />} />
                <Route path="/session" element={<Session />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/story" element={<Story />} />
              </Routes>
            </Router>
          </HistoryProvider>
        </UserProvider>
      </ThemeProvider>
  );
}

export default App;