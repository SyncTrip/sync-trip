import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import theme from '../../theme';
import { useNavigate } from 'react-router-dom';

const styles = {
    root: {
        padding: '300px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        color: 'black',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowX: 'hidden',
        boxSizing: 'border-box',
    },
    textInput: {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: '20px',
        gap: '20px',
        maxWidth: '100%',
    },
    input: {
        display: 'flex',
        width: '100%',
        minWidth: '300px',
        height: '56px',
        borderRadius: '8px',
        boxSizing: 'border-box',
    },
    buttonJoin: {
        display: 'flex',
        height: '56px',
        width: '56px',
        borderRadius: '8px',
        fontSize: '14px',
        color: 'white',
        backgroundColor: theme.palette.primary.light,
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
    },
};


const JoinView = ({ setRoomCode }) => {
    const navigate = useNavigate();
    const [code, setCode] = React.useState('');

    const handleInputCode = (code) => {
        //check if code is valid
        setRoomCode(code);
    };

    return ( 
        <Box style={styles.root}>
            <Typography variant="h2" color="white">Enter the code</Typography>
            <Box style={styles.textInput}>
                <TextField
                    variant="outlined"
                    placeholder="Enter code here"
                    InputProps={{
                        style: { color: 'white' },
                    }}
                    sx={{
                        ...styles.input,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                    onChange={(e) => setCode(e.target.value)}
                />
                <Button
                    variant="contained"
                    style={styles.buttonJoin}
                    onClick={() => {
                        if (code) {
                            handleInputCode(code)
                        }
                    }}
                >
                    Join
                </Button>
            </Box>
        </Box> 
    );
};

export default JoinView;