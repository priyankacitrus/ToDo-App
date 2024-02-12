import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { InputAdornment, makeStyles, TextField } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: '../bg.jpg',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));
function Welcome(props) {
  const classes = useStyles();
  const [text, setText] = useState('');
  const handleCopyClick = () => {
    // Copy the text to the clipboard
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard');
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <TextField
        id="input-with-icon-textfield"
        label="TextField"
        value={text}
        onChange={(e) => setText(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ContentCopy onClick={handleCopyClick} />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </div>
  );
}

export default Welcome;
