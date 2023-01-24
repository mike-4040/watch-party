import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

import { getSession } from '../utils/getSession';
import type { PropsUser } from '../types';
import VideoPlayer from '../components/VideoPlayer';

const WatchSession: React.FC<PropsUser> = props => {
  const { sessionId } = useParams();
  const { userId } = props;

  const navigate = useNavigate();
  const [url, setUrl] = useState<string | null>(null);

  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    getSession(userId, sessionId as string).then(session => {
      const url = session?.url;

      if (url) {
        setUrl(url);
      } else {
        navigate('/create');
      }
    });
  }, [navigate, sessionId, userId]);

  if (!!url) {
    return (
      <>
        <Box
          width='100%'
          maxWidth={1000}
          display='flex'
          gap={1}
          marginTop={1}
          alignItems='center'
        >
          <TextField
            label='Youtube URL'
            variant='outlined'
            value={url}
            inputProps={{
              readOnly: true,
              disabled: true,
            }}
            fullWidth
          />
          <Tooltip title={linkCopied ? 'Link copied' : 'Copy link to share'}>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
              }}
              disabled={linkCopied}
              variant='contained'
              sx={{ whiteSpace: 'nowrap', minWidth: 'max-content' }}
            >
              <LinkIcon />
            </Button>
          </Tooltip>
          <Tooltip title='Replay this watch party'>
            <Button
              onClick={() => {
                window.open(`/replay/${sessionId}`, '_blank');
              }}
              variant='contained'
              sx={{ whiteSpace: 'nowrap', minWidth: 'max-content' }}
            >
              <VideoLibraryIcon />
            </Button>
          </Tooltip>
          <Tooltip title='Create new watch party'>
            <Button
              onClick={() => {
                navigate('/create');
              }}
              variant='contained'
              sx={{ whiteSpace: 'nowrap', minWidth: 'max-content' }}
            >
              <AddCircleOutlineIcon />
            </Button>
          </Tooltip>
        </Box>
        <VideoPlayer url={url} />;
      </>
    );
  }

  return null;
};

export default WatchSession;
