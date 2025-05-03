import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import theme from '../../theme';
import { useNavigate } from 'react-router-dom';
import { Room } from '../../types/room';

const styles = {
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        color: 'black',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowX: 'hidden',
    },
    container: {
        display: 'flex',
        marginLeft: '100px',
        marginRight: '100px',
        width: '100%',
        flexDirection: 'column',
    },
    members: {
        borderRadius: '8px',
        width: '100%',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: '20px',
        gap: '20px',
    },
    input: {
        display: 'flex',
        width: '300px',
        height: '56px',
        borderRadius: '8px',
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


const RoomView = (RoomCode) => {
    const navigate = useNavigate();
    const [room, setRoom] = React.useState({
        members: [
            { name: 'Alice' },
            { name: 'Bob' },
            { name: 'Alice' },
            { name: 'Bob' },
            { name: 'Alice' },
            { name: 'Bob' },
        ],
    });

    return ( 
        <Box style={styles.root}>
            <Box style={styles.container}>
                <Typography variant="h2" color="white">Waiting for the crew</Typography>
                <Box style={styles.members}>
                    {room.members.map((member, index) => (
                        <Box
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                width: '50%',
                            }}
                        >
                            <Typography variant="h6" color="black">
                                {member.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Box style={styles.textInput}>
                    <Button
                        variant="contained"
                        style={styles.buttonJoin}
                        onClick={() => {
                        }}
                    >
                        Join
                    </Button>
                </Box>
            </Box>
        </Box> 
    );
};

export default RoomView;