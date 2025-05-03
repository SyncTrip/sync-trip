import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '../../theme';

const styles = {
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: 'white',
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
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    logo: {
        height: 'auto',
        width: '300px',
        objectFit: 'contain',
        zIndex: 1,
    },
    watermark: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    height: '100vh',
    width: '100vw',
    transform: 'translate(-50%, -50%)',
    opacity: 0.3,
    pointerEvents: 'none',
    borderRadius: '16px',
    backgroundSize: 'cover',
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
    buttonJoin: {
        display: 'flex',
        height: '64px',
        minWidth: '300px',
        borderRadius: '30px',
        fontSize: '20px',
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonCreate: {
        display: 'flex',
        height: '64px',
        minWidth: '300px',
        fontSize: '20px',
        borderRadius: '30px',
        color: 'white',
        backgroundColor: theme.palette.primary.dark,
        alignItems: 'center',
        justifyContent: 'center',
    },

};

const Session = () => {
    const navigate = useNavigate();

    return (
        <Box style={styles.root}>
            <img src={require('../../assets/download.webp')} alt="background" style={styles.watermark} />
            <Box style={styles.header}>
                <img src={require('../../assets/LOGO.png')} alt="Logo" style={styles.logo} />
                <Typography variant="h1" style={{ color: theme.palette.primary.main }}>
                    SyncTrip
                </Typography>
                <Typography variant="h3" style={{ color: theme.palette.primary.main }}>
                    by SkyScanner
                </Typography>
            </Box>
            <Box style={styles.buttons}>
                <Button onClick={() => navigate('/lobby', { state: { type: 'Join' } })} style={styles.buttonJoin}>
                    Join Room
                </Button>
                <Button onClick={() => navigate('/lobby', { state: { type: 'Create' } })} style={styles.buttonCreate}>
                    Create Room
                </Button>
            </Box>
        </Box>
    );
};

export default Session;

