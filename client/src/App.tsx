import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { checkApiHealth } from './utils/checkApiHealth';
import CreateSession from './routes/CreateSession';
import { getUser } from './utils/getUser';
import ReplaySession from './routes/ReplaySession';
import { THEME } from './config';
import WatchSession from './routes/WatchSession';
import { wsClient } from './utils/wsClient';

const darkTheme = createTheme(THEME);

const App = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [wsConnId, setWsConnId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    checkApiHealth();

    getUser().then(setUserId);

    wsClient(setWsConnId, setIsPlaying);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        width='100vw'
        height='100vh'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        gap={1}
      >
        <Routes>
          <Route
            path='/'
            element={<CreateSession userId={userId} wsConnId={wsConnId} />}
          />
          <Route
            path='/create'
            element={<CreateSession userId={userId} wsConnId={wsConnId} />}
          />
          <Route
            path='/watch/:sessionId'
            element={
              <WatchSession
                userId={userId}
                wsConnId={wsConnId}
                isPlaying={isPlaying}
              />
            }
          />
          <Route
            path='/replay/:sessionId'
            element={<ReplaySession userId={userId} wsConnId={wsConnId} />}
          />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
