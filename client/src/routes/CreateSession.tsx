import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { post } from '../services/http';

const CreateSession: React.FC<{ userId: number | null }> = props => {
  const { userId } = props;
  const navigate = useNavigate();
  const [newUrl, setNewUrl] = useState('');

  if (!userId) {
    return null;
  }

  const createSession = async () => {
    setNewUrl('');
    // TODO: validate URL
    // TODO: create sessionId on server
    const sessionId = uuidv4();
    try {
      await post(userId, '/sessions', {
        sessionId,
        url: newUrl,
      });

      navigate(`/watch/${sessionId}`);
    } catch (err) {
      console.error('createSession', err);
    }
  };

  return (
    <Box width='100%' maxWidth={600} display='flex' gap={1} marginTop={1}>
      <TextField
        label='Youtube URL'
        variant='outlined'
        value={newUrl}
        onChange={e => setNewUrl(e.target.value)}
        fullWidth
      />
      <Button
        disabled={!newUrl}
        onClick={createSession}
        size='small'
        variant='contained'
      >
        Create a session
      </Button>
    </Box>
  );
};

export default CreateSession;
