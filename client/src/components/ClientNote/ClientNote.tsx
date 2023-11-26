import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';

type PropsType = {
    message: string;
    workerid: number;
}

export const ClientNote: FC<PropsType> = ({ message, workerid }) => {

    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/profile/${workerid}`)
    }

    return (
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <Button onClick={onClick}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100 }} />
            </Button>
            <Box>
                <Paper elevation={6}
                    sx={{ maxWidth: 700, padding: 3 }}>
                    <Typography fontSize={20}
                        sx={{ overflowWrap: 'break-word' }}>
                        {message}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    )
}
