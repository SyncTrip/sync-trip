import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import theme from '../../theme';
import JoinView from './Join';
import CreateView from './Create';
import RoomView from './Room';
import { useNavigate, useLocation } from 'react-router-dom';
 
const styles = {
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: theme.palette.primary.dark,
        color: 'black',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        display: 'flex',
        paddingLeft: '100px',
        flexDirection: 'row',
        width: '100%',
        height: '120px',
        backgroundColor: 'white',
        gap: '10px',
        boxSizing: 'border-box',
    },
    logo: {
        height: '60px',
        width: 'auto',
        objectFit: 'contain',
        maxWidth: '100%',
    },
    text: {
        fontSize: '20px',
        color: 'white',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '100%',
    },
    buttons: {
        display: 'flex',
        paddingRight: '18%',
        paddingLeft: '18%',
        flexDirection: 'row',
        width: '100%',
        height: '435px',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '64px',
        boxSizing: 'border-box',
    },
    buttonCreateTeam: {
        display: 'flex',
        height: '64px',
        minWidth: '300px',
        maxWidth: '100%',
        borderRadius: '50px',
        fontSize: '20px',
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
    },
};

const Lobby = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [roomType, setRoomType] = React.useState(location.state?.type || "");
    const [roomCode, setRoomCode] = React.useState('');

    useEffect(() => {
        if (roomCode) {
            setRoomType("Room");
        }
    }, [roomCode]);

    console.log('Room Type:', location.state?.type);
    return (
        <Box style={styles.root}>
            <Box style={styles.header}>
                <img src={require('../../assets/LOGO.png')} alt="Logo" style={styles.logo} />
                <Typography variant="h2" style={{ color: theme.palette.primary.main }}>
                    SyncTrip
                </Typography>
            </Box>
            {roomType === "Join" && <JoinView setRoomCode={setRoomCode} />}
            {roomType === "Create" && <CreateView setRoomCode={setRoomCode} />}
            {roomType === "Room" && <RoomView roomCode={roomCode} />}
        </Box>
    );
};

export default Lobby;