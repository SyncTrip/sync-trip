import React from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import theme from '../../theme';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const styles = {
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        color: 'black',
        alignItems: 'center',
        overflowX: 'hidden',
    },
    header: {
        display: 'flex',
        paddingRight: '18%',
        paddingLeft: '18%',
        flexDirection: 'column',
        width: '100%',
        height: '435px',
        backgroundColor: theme.palette.primary.dark,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    textbox:{
        width: '300px', 
        height: '40px',
        borderRadius: '8px', 
        padding: '8px', 
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: '85%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '64px',
        boxSizing: 'border-box',
    },
    buttonCreate: {
        display: 'flex',
        height: '64px',
        minWidth: '300px',
        fontSize: '20px',
        borderRadius: '16px',
        color: 'white',
        backgroundColor: theme.palette.primary.light,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
}


const CreateView = () => {
    const navigate = useNavigate();
    const [code, setCode] = React.useState('');

    return ( 
        <Box style ={styles.root}>
            <Box style={styles.header}>
                <Typography variant="h2" color="white">Write the Name of the Team</Typography>
            </Box>
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
            </Box>

            <Box style = {styles.buttons}>
                <Button style={styles.buttonCreate} onClick={() => navigate('/lobby/room')}>Create</Button>
            </Box>
        </Box> 
    );
};

export default CreateView;