import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { checkApiHealth } from './utils/checkApiHealth';
import { checkWsConnection } from './utils/checkWsConnection';
import CreateSession from './routes/CreateSession';
import ReplaySession from './routes/ReplaySession';
import { THEME } from './config';
import WatchSession from './routes/WatchSession';
import { getUser } from './utils/getUser';

const darkTheme = createTheme(THEME);

const App = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    checkApiHealth();
    async function fetchUserId() {
      const userId = await getUser();
      setUserId(userId);
    }
    fetchUserId();
    checkWsConnection();
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
          <Route path='/' element={<CreateSession userId={userId} />} />
          <Route path='/create' element={<CreateSession userId={userId} />} />
          <Route path='/watch/:sessionId' element={<WatchSession />} />
          <Route path='/replay/:sessionId' element={<ReplaySession />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
