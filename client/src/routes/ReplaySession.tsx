import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { useParams } from "react-router-dom";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

const ReplaySession: React.FC = () => {
  const { sessionId } = useParams();
  const [url, setUrl] = useState<string | null>(null);

  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    // load video by session ID -- right now we just hardcode a constant video but you should be able to load the video associated with the session
    setUrl("https://www.youtube.com/watch?v=NX1eKLReSpY");

    // if session ID doesn't exist, you'll probably want to redirect back to the home / create session page
  }, [sessionId]);

  if (!!url) {
    return (
      <>
        <Box
          width="100%"
          maxWidth={1000}
          display="flex"
          gap={1}
          marginTop={1}
          alignItems="center"
        >
          <TextField
            label="Youtube URL"
            variant="outlined"
            value={url}
            inputProps={{
              readOnly: true,
              disabled: true,
            }}
            fullWidth
          />
          <Tooltip
            title={linkCopied ? "Link copied" : "Copy replay link to share"}
          >
            <Button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
              }}
              disabled={linkCopied}
              variant="contained"
              sx={{ whiteSpace: "nowrap", minWidth: "max-content" }}
            >
              <LinkIcon />
            </Button>
          </Tooltip>
        </Box>
        <VideoPlayer url={url} hideControls />
      </>
    );
  }

  return null;
};

export default ReplaySession;
